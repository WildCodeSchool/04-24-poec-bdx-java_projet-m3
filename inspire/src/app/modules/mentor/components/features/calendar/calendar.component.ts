import {
  AfterViewChecked,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CalendarOptions,
  EventClickArg,
  EventDropArg,
  EventInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin from '@fullcalendar/interaction';
import { ReservationService } from '../../../../../shared/services/reservation.service';
import { MentorService } from '../../../../../shared/services/mentor.service';
import { Subscription } from 'rxjs';
import { Mentor } from '../../../../../shared/models/user';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit, AfterViewChecked {
  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;

  today!: string;
  visible = false;
  mentorId!: number;
  mentorSubscription!: Subscription;
  @Input()
  formattedSlotInfo!: any;
  events: EventInput[] = [];

  constructor(
    private reservationService: ReservationService,
    private mentorService: MentorService
  ) {}

  selectAllow = (selectionInfo: any) => {
    if (selectionInfo.start > new Date()) {
      return true;
    }
    return false;
  };

  onDateSelect = (selectionInfo: any) => {
    this.formattedSlotInfo = {
      dateTime: selectionInfo.startStr,
      visio: true,
      mentorId: this.mentorId,
    };

    this.visible = true;
  };

  validateSlot() {
    this.reservationService
      .addSlotToMentor(this.formattedSlotInfo)
      .subscribe(() => {
        this.visible = false;
        this.loadSlots(); // Recharge les créneaux après la validation
      });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    events: [
      {
        id: 'a',
        title: 'Mentorat Lucas',
        start: '2024-05-21T10:30:00+02:00',
        end: '2024-05-21T11:30:00+02:00',
        color: 'grey',
      },
      {
        id: 'b',
        title: 'Résautage avec Cassiopée',
        start: '2024-05-20T15:30:00+02:00',
        end: '2024-05-20T16:30:00+02:00',
        color: 'grey',
      },
      {
        id: 'c',
        title: 'Résautage avec Aurore',
        start: '2024-05-23T12:30:00+02:00',
        end: '2024-05-23T13:30:00+02:00',
        color: 'grey',
      },
      {
        id: 'd',
        title: 'Mentorat Mahdi',
        start: '2024-05-24T15:30:00+02:00',
        end: '2024-05-24T16:30:00+02:00',
        color: '#F8146B',
      },
    ],
    locale: frLocale,
    headerToolbar: {
      right: 'today prev,next',
      left: 'dayGridMonth timeGridWeek timeGridDay',
    },
    views: {
      dayGridMonth: {
        titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
      },
      timeGridFiveDays: {
        type: 'timeGrid',
        duration: { days: 4 },
      },

      validRange: {
        start: '2024-05-24',
      },
    },
    buttonText: {
      today: "Aujourd'hui",
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      list: 'list',
      allDayText: 'tous',
    },
    weekends: false,
    slotDuration: '00:15:00',
    slotMinTime: '10:00',
    slotMaxTime: '18:00',

    navLinks: true,
    eventStartEditable: true,

    weekNumbers: true,
    selectMirror: true,
    unselectAuto: false,
    selectOverlap: false,
    editable: true,
    // https://fullcalendar.io/docs/select-callback
    selectable: true,
    eventDurationEditable: false,

    select: this.onDateSelect, // méthode déclenchée chaque fois qu'un créneau est sélectionné dans le calendrier
    selectAllow: this.selectAllow,

    // permet de définir si un créneau est sélectionnable ou non
  };

  loadSlots(): void {
    const mentorId = this.mentorId;
    this.reservationService.getSlotsForMentor(mentorId).subscribe((slots) => {
      this.events = this.formatSlotsToEvents(slots);
    });
  }
  formatSlotsToEvents(slots: any[]): EventInput[] {
    return slots.map((slot) => ({
      title: 'Créneau',
      start: slot.dateTime,
      end: slot.dateTime,
      color: 'blue',
    }));
  }

  ngOnInit(): void {
    this.calendarOptions.locale = frLocale;
    this.calendarOptions.allDayText = 'Heures';

    this.mentorSubscription = this.mentorService.activeMentorProfil$.subscribe(
      (mentor: Mentor) => {
        if (mentor && mentor.id) {
          this.mentorId = mentor.id;
        }
      }
    );
    this.loadSlots();
  }

  ngOnDestroy(): void {
    if (this.mentorSubscription) {
      this.mentorSubscription.unsubscribe();
    }
  }
  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.today = this.calendarComponent.getApi().view.title;
    }, 0);
  }
}
