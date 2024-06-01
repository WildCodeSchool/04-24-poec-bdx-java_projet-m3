import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin from '@fullcalendar/interaction';
import { Observable, Subscription, map, tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReservationService } from '../../../../shared/services/reservation.service';
import { MentorService } from '../../../../shared/services/mentor.service';
import { MentorDTO } from '../../../../shared/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mentor-reservation-by-student',
  templateUrl: './mentor-reservation-page-by-student.component.html',
  styleUrl: './mentor-reservation-page-by-student.component.scss',
})
export class MentorReservationPageByStudentComponent
  implements OnInit, AfterViewChecked
{
  today!: string;
  visible = false;
  mentorId!: number;
  userId!: number;
  mentorSubscription!: Subscription;
  @Input() formattedSlotInfo!: any;
  events: EventInput[] = [];
  displayModal: boolean = false;
  eventDetails: any = {};
  mode: string = '';
  profil!: Observable<MentorDTO>;

  constructor(
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute
  ) {}

  formulaire: FormGroup = this.fb.group({
    mode: ['presentiel'],
  });

  updateMode() {
    this.formattedSlotInfo.visio = this.formulaire.value.mode === 'visio';
  }

  selectAllow = (selectionInfo: any) => {
    // if (selectionInfo.start > new Date()) {
    //   return true;
    // }
    return false;
  };

  onDateSelect = (selectionInfo: any) => {
    if (this.formulaire.valid) {
      const diffMilliseconds = selectionInfo.end - selectionInfo.start;
      const hours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
      const minutes = Math.floor(
        (diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );

      const formattedDuration = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

      this.formattedSlotInfo = {
        formattedDuration,
        start: selectionInfo.start,
        end: selectionInfo.end,
        dateTime: selectionInfo.startStr,
        dateEnd: selectionInfo.endStr,
        visio: this.formulaire.value.mode === 'visio',
        mentorId: this.mentorId,
      };

      this.visible = true;
    } else {
      console.error("Veuillez d'abord soumettre le formulaire.");
    }
  };

  validateSlot() {
    this.reservationService
      .addSlotToMentor(this.formattedSlotInfo)
      .subscribe(() => {
        this.visible = false;
        this.loadSlots();
      });
  }

  deleteSlot() {
    if (this.eventDetails.id) {
      this.reservationService.deleteSlot(this.eventDetails.id).subscribe(() => {
        this.loadSlots();
        this.displayModal = false;
      });
    } else {
      console.error('Pas de slot à supprimer');
    }
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
    unselectAuto: true,
    selectOverlap: false,
    editable: false,
    // https://fullcalendar.io/docs/select-callback
    selectable: true,
    eventDurationEditable: false,
    defaultTimedEventDuration: '01:00:00',
    nowIndicator: true,

    droppable: false,

    select: this.onDateSelect,
    selectAllow: this.selectAllow,
    eventClick: this.handleEventClick.bind(this),
  };

  handleEventClick(eventClickArg: EventClickArg) {
    this.eventDetails = {
      id: eventClickArg.event.id,
      title: eventClickArg.event.title,
      start: eventClickArg.event.start,
      end: eventClickArg.event.end,
      allDay: eventClickArg.event.allDay,
    };
    this.displayModal = true;
    eventClickArg.jsEvent.preventDefault();
  }

  loadSlots(): void {
    const mentorId = this.mentorId;
    this.reservationService.getSlotsForMentor(mentorId).subscribe((slots) => {
      this.events = this.formatSlotsToEvents(slots);
    });
  }
  formatSlotsToEvents(slots: any[]): EventInput[] {
    return slots.map((slot) => ({
      id: slot.id,
      title: slot.visio ? 'Visio' : 'Présentiel',
      start: slot.dateTime,
      end: slot.dateEnd,
      color: slot.visio ? '#FCBE77' : '#F8156B',
    }));
  }

  ngOnInit(): void {
    this.calendarOptions.locale = frLocale;
    this.calendarOptions.allDayText = 'Heures';
    this.profil = this.activatedRouter.data.pipe(
      map((data) => data['profil']),
      tap((res) => {
        this.mentorId = res.userId;

        this.loadSlots();
      })
    );
  }

  ngOnDestroy(): void {}
  ngAfterViewChecked(): void {}
}

/*
 _______                           .__                                         .__   .__   __     __   .__              __________ .__   __           .__     
 \      \  _____     ______  ______|__|  _____    ____       _____   ___.__.   |  |  |__|_/  |_ _/  |_ |  |    ____     \______   \|__|_/  |_   ____  |  |__  
 /   |   \ \__  \   /  ___/ /  ___/|  | /     \ _/ __ \     /     \ <   |  |   |  |  |  |\   __\\   __\|  |  _/ __ \     |    |  _/|  |\   __\_/ ___\ |  |  \ 
/    |    \ / __ \_ \___ \  \___ \ |  ||  Y Y  \\  ___/    |  Y Y  \ \___  |   |  |__|  | |  |   |  |  |  |__\  ___/     |    |   \|  | |  |  \  \___ |   Y  \
\____|__  /(____  //____  >/____  >|__||__|_|  / \___  >   |__|_|  / / ____|   |____/|__| |__|   |__|  |____/ \___  >    |______  /|__| |__|   \___  >|___|  /
        \/      \/      \/      \/           \/      \/          \/  \/                                           \/            \/                 \/      \/ 
*/
