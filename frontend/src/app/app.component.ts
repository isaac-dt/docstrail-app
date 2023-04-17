import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { initializeJGraphEventsSubscriptions } from './store/app.actions/app.actions';
import { COMPOSE_PATH, selectDtUser } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('jGraphCanvas') jGraphCanvasEl!: ElementRef;
  @ViewChild('dtOutlet') dtOutletEl!: ElementRef;
  @ViewChild('proposalTitle') proposalTitle!: ElementRef;

  readonly dtUser$ = this.store.select(selectDtUser);
  readonly isJGraphComposePathActive$ = new ReplaySubject<boolean>();

  constructor(private readonly store: Store, private readonly router: Router) {
    this.checkIsMobile();
    this.trackPathChange();
  }

  ngAfterViewInit() {
    this.dtUser$.pipe(first((user) => !!user)).subscribe(() => {
      this.setJGraphRelatedStyles();
      this.store.dispatch(initializeJGraphEventsSubscriptions());
      this.appendToJGraphTopBar(this.proposalTitle);
    });
  }

  /** The JGraph canvas does Not have a routing path. The graph is initialized in index.html,
   * and waits (via setInterval with a safety timeout) until app.ts has created the ".jgraph-canvas" tag.
   * The graph is then added to that tag as a child node. This creates the need to mannually detect whether
   * the app in on the jGraph path or not - and overlay the graph (via z-index) with the regular ng app
   * components when regular paths are active.
   * */
  private trackPathChange() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event) => {
        const path = (event as any).urlAfterRedirects;
        if (path.split('?')[0] === COMPOSE_PATH) {
          this.isJGraphComposePathActive$.next(true);
        } else {
          this.isJGraphComposePathActive$.next(false);
        }
      });
  }

  /** This makes the ".jgraph-canvas" tag visible after the graph has been added to it as a child node.
   * The intructions to add the graph as a child node of the ".jgraph-canvas" tag are in index.html.
   */
  private setJGraphRelatedStyles() {
    this.afterJGraphViewInit(() => {
      this.dtOutletEl.nativeElement.style.display = 'block';
    });
  }

  /** Pins the top bar (which is an ng component) to the graph's header after the graph is ready.   */
  private appendToJGraphTopBar(newElRef: ElementRef) {
    this.afterJGraphViewInit(() => {
      const jGraphChildrenEls = this.jGraphCanvasEl.nativeElement.children;
      const jGraphTitle: any = Array.from(jGraphChildrenEls)[0];
      jGraphTitle.append(newElRef.nativeElement);
      newElRef.nativeElement.style.display = 'block';
    });
  }

  /** Helper function to detect that the graph was added to the ".jgraph-canvas" tag */
  private afterJGraphViewInit(callback: Function) {
    const interval = setInterval(() => {
      const jGraphChildrenEls = this.jGraphCanvasEl.nativeElement.children;
      if (jGraphChildrenEls.length) {
        clearInterval(interval);
        callback();
      }
    }, 100);
    setTimeout(() => {
      // Safety turn-off switch.
      clearInterval(interval);
    }, 4000);
  }

  checkIsMobile() {
    const isMobile: boolean = (window as any).mobileCheck();
    if (isMobile) {
      this.router.navigateByUrl('/mobile');
    }
  }
}
