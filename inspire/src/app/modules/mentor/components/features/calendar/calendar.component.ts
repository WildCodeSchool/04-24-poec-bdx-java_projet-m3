import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  today!: string;

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    locale: 'fr',
    headerToolbar: {
      right: 'prev, next, today',
      left: 'dayGridMonth timeGridWeek timeGridDay',
    },
  };

  ngAfterViewInit(): void {
    this.today = this.calendarComponent.getApi().view.title;
  }
}
