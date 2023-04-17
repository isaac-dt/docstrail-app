import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-dot',
  templateUrl: './notification-dot.component.html',
  styleUrls: ['./notification-dot.component.scss'],
})
export class NotificationDotComponent {
  @Input('red') isColorRed?: boolean = false;
  @Input('still') isStill?: boolean = false;
}
