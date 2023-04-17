import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WriteTemplateRequest } from 'src/app/generated/types/operation/template/template.api.pb';
import { WriteTriggerRequest } from 'src/app/generated/types/operation/trigger/trigger.api.pb';
import {
  ScheduledEvent,
  SpecialEvent,
} from 'src/app/generated/types/operation/trigger/trigger.pb';
import { cloneDeep } from 'lodash';

type EditSection = 'trigger' | 'package' | 'targets';

@Component({
  selector: 'app-build-template',
  templateUrl: './build-template.component.html',
  styleUrls: ['./build-template.component.scss'],
})
export class BuildTemplateComponent {
  private editSection?: EditSection = 'trigger';

  readonly trigger: Partial<WriteTriggerRequest> = {};

  protected pendingTriggerForm = new FormGroup({
    scheduledDay: new FormControl(1),
    scheduledMonth: new FormControl('Jan'),
    eventType: new FormControl<SpecialEvent | 'scheduledEvent' | undefined>(
      undefined
    ),
  });
  private savedTriggerForm = cloneDeep(this.pendingTriggerForm);

  readonly SpecialEvent = SpecialEvent;

  constructor(readonly router: Router) {}

  saveTrigger() {
    let triggerReq: Partial<WriteTriggerRequest> = {};
    if (this.pendingTriggerForm.get('eventType')?.value === 'scheduledEvent') {
      const month = moment()
        .month(this.pendingTriggerForm.get('scheduledMonth')?.value!)
        .format('M');
      const scheduledEvent = ScheduledEvent.fromPartial({
        day: +(this.pendingTriggerForm.get('scheduledDay')?.value || 1),
        month: +(month || 1),
      });
      triggerReq = WriteTriggerRequest.fromPartial({
        expectedDeliveryDate: { $case: 'scheduledEvent', scheduledEvent },
      });
    } else {
      triggerReq = WriteTriggerRequest.fromPartial({
        expectedDeliveryDate: {
          $case: 'specialEvent',
          specialEvent: this.pendingTriggerForm.get('eventType')
            ?.value as SpecialEvent,
        },
      });
    }
    this.savedTriggerForm = cloneDeep(this.pendingTriggerForm);
    this.trigger.expectedDeliveryDate = triggerReq.expectedDeliveryDate;
  }

  getMonthsInYear() {
    return moment.monthsShort();
  }

  getDaysInTriggerMonth() {
    const randomNonLeapYear = '2020';
    const month = this.pendingTriggerForm.get('scheduledMonth')?.value;
    if (!month) {
      return [];
    }
    return [
      ...new Array(
        moment(`${randomNonLeapYear}-${month}`, 'YYYY-MMM').daysInMonth()
      ).keys(),
    ].map((v) => v + 1);
  }

  clearTriggerSection() {
    this.pendingTriggerForm = cloneDeep(this.savedTriggerForm);
  }

  submitTemplateForm() {}

  navToTemplateList() {
    this.router.navigate(['template', 'list']);
  }
  navToCreateTemplate() {
    this.router.navigate(['template', 'create']);
  }

  setEditSection(editSection: EditSection) {
    this.editSection = editSection;
  }
  isEditSection(editSection: EditSection) {
    return this.editSection === editSection;
  }
  closeEditSection() {
    this.editSection = undefined;
  }
}
