import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
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
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  today!: string;
  visible = false;
  info = null;
  selectedEvent: any = null;
  selectedSlot: any;
  mentorId!: number;
  mentorSubscription!: Subscription;

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
    const formattedSlotInfo = {
      dateTime: selectionInfo.startStr, // Utiliser startStr pour obtenir une chaîne de date
      visio: true, // Remplacez par le statut visio réel
      mentorId: this.mentorId, // Utiliser l'ID du mentor dynamique
    };

    console.log('Formatted Slot Info:', formattedSlotInfo);

    this.reservationService.addSlotToMentor(formattedSlotInfo).subscribe(
      (res) => console.log('Slot added successfully:', res),
      (err) => console.error('Error adding slot:', err)
    );
  };

  handleDateClick(arg: any) {
    // Capture the selected date
    this.selectedSlot = {
      dateTime: arg.dateStr, // Utiliser arg.dateStr pour obtenir une chaîne de date
      visio: true, // Remplacez par le statut visio réel
      mentorId: this.mentorId, // Utiliser l'ID du mentor dynamique
    };
    console.log('Selected Slot:', this.selectedSlot);
  }

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    events: [
      {
        id: 'a',
        title: 'Mon évènement déjà prévu',
        start: '2024-05-22T06:30:00+02:00',
        end: '2024-05-22T08:30:00+02:00',
        color: 'pink',
      },
      {
        id: 'b',
        title: 'Mon nouvel évènement',
        start: '2024-05-23T07:30:00+02:00',
        end: '2024-05-23T08:30:00+02:00',
        color: 'pink',
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
    slotMinTime: '06:00',
    slotMaxTime: '19:00',

    navLinks: true,
    eventStartEditable: true,

    weekNumbers: true,
    selectMirror: true,
    unselectAuto: false,
    selectOverlap: false,
    editable: true,
    // https://fullcalendar.io/docs/select-callback
    selectable: true,

    select: this.onDateSelect, // méthode déclenchée chaque fois qu'un créneau est sélectionné dans le calendrier
    selectAllow: this.selectAllow, // permet de définir si un créneau est sélectionnable ou non
  };

  ngOnInit(): void {
    this.calendarOptions.locale = frLocale;
    this.calendarOptions.allDayText = 'Heures';

    // S'abonner au BehaviorSubject pour obtenir l'ID du mentor
    this.mentorSubscription = this.mentorService.activeMentorProfil$.subscribe(
      (mentor: Mentor) => {
        if (mentor && mentor.id) {
          this.mentorId = mentor.id;
        }
      }
    );
  }

  ngOnDestroy(): void {
    // Désabonnez-vous pour éviter les fuites de mémoire
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
