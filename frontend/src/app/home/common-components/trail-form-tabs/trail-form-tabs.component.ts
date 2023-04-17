import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { TrailNavigationController } from '../../../_deprecated-resources/compose/compose-trail-bugfix/compose-trail-nav';
import { TrailFormTab } from '../../../_deprecated-resources/compose/compose-trail-bugfix/compose-trail-struct';

interface TabInfo {
  element: any;
  tab: TrailFormTab;
  label: string;
}

@Component({
  selector: 'app-trail-form-tabs',
  templateUrl: './trail-form-tabs.component.html',
  styleUrls: ['./trail-form-tabs.component.scss'],
})
export class TrailFormTabsComponent implements OnDestroy {
  @Input('trailNavController') trailNavController!: TrailNavigationController;
  @ViewChild('tabContent') tabContent!: ElementRef;

  readonly Tab = TrailFormTab;

  tabsInfos: TabInfo[] = [];

  readonly destroyed = new ReplaySubject<void>();

  ngAfterViewInit() {
    this.tabsInfos = Array.from(this.tabContent.nativeElement.children).map(
      (e: any) => ({
        element: e,
        tab: +e.getAttribute('tab'),
        label: e.getAttribute('label'),
      })
    );
    this.trailNavController.onTabChange
      .pipe(takeUntil(this.destroyed))
      .subscribe((newTab) => {
        for (const tabInfo of this.tabsInfos) {
          if (tabInfo.tab !== newTab) {
            tabInfo.element.style.display = 'none';
          } else {
            tabInfo.element.style.display = 'block';
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.complete();
  }
}
