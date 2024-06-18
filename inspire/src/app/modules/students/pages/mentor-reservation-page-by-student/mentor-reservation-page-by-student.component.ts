import {
  AfterViewChecked,
  Component,
  DestroyRef,
  Inject,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin from '@fullcalendar/interaction';
import { Observable, Subscription, map, switchMap, tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReservationService } from '../../../../shared/services/reservation.service';
import { MentorDTO } from '../../../../shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { Reservation, SlotDTO } from '../../../../shared/models/reservation';
import { StudentService } from '../../../../shared/services/student.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-mentor-reservation-by-student',
  templateUrl: './mentor-reservation-page-by-student.component.html',
  styleUrl: './mentor-reservation-page-by-student.component.scss',
})
export class MentorReservationPageByStudentComponent implements OnInit {
  today!: string;
  visible = false;
  mentorId!: number;
  events: EventInput[] = [];
  displayModal: boolean = false;
  profil!: Observable<MentorDTO>;
  eventDetails!: Reservation;
  studentService = inject(StudentService);
  destroyRef = inject(DestroyRef);

  constructor(
    private reservationService: ReservationService,
    private activatedRouter: ActivatedRoute
  ) {}

  selectAllow = () => {
    return false;
  };

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    events: [],
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

    weekends: true,
    slotDuration: '00:15:00',
    slotMinTime: '07:00',
    slotMaxTime: '23:00',
    allDaySlot: false,

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
    eventContent: this.renderEventContent.bind(this),

    selectAllow: this.selectAllow,
    eventClick: this.handleEventClick.bind(this),
  };

  renderEventContent(arg: any) {
    console.log('args', arg);

    let html = `<div class="custom-event">
                  <b>${arg.event.title}</b>
                  <div>${
                    arg.event.extendedProps['isBooked']
                      ? 'Booked'
                      : 'not booked'
                  }</div>
                </div>`;
    let arrayOfDomNodes = [];
    let div = document.createElement('div');
    div.innerHTML = html;
    arrayOfDomNodes.push(div.firstChild);
    return { domNodes: arrayOfDomNodes };
  }

  handleEventClick(eventClickArg: EventClickArg) {
    console.log(eventClickArg.event.extendedProps);
    this.eventDetails = {
      slotId: eventClickArg.event.extendedProps['slotId'],
      studentId: this.studentService.activeStudentProfil$.value.id,
      subject: 'testing',
    };
    this.visible = true;
  }

  loadSlots(): void {
    const mentorId = this.mentorId;
    this.reservationService
      .getSlotsforStudentByMentorId(mentorId)
      .subscribe((slots) => {
        this.events = this.formatSlotsToEvents(slots).filter(
          (ele) => !ele['booked']
        );
        console.log('free slots', this.events);

        console.log('slots', slots);
      });
  }
  formatSlotsToEvents(slots: SlotDTO[]): EventInput[] {
    return slots.map((slot) => ({
      id: '' + slot.id,
      title: slot.visio ? 'Visio' : 'Présentiel>',
      start: slot.dateBegin,
      end: slot.dateEnd,
      color: slot.visio ? '#FCBE77' : '#F8156B',
      className: slot.booked ? 'booked' : 'not-booked',
      extendedProps: {
        slotId: slot.id,
        mentorId: slot.mentorId,
        reservationId: slot.reservationId,
        isBooked: slot.booked,
      },
    }));
  }

  bookSlot() {
    this.reservationService
      .bookSlot(
        this.eventDetails.slotId,
        this.eventDetails.studentId,
        this.eventDetails.subject
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        switchMap(() => {
          const mentorId = this.mentorId;
          return this.reservationService.getSlotsforStudentByMentorId(mentorId);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((slots) => {
        this.events = this.formatSlotsToEvents(slots).filter(
          (ele) => !ele['booked']
        );
        console.log('free slots', this.events);

        console.log('slots', slots);
      });
    this.visible = false;
  }

  ngOnInit(): void {
    this.calendarOptions.locale = frLocale;
    this.calendarOptions.allDayText = 'Heures';
    this.profil = this.activatedRouter.data.pipe(
      map((data) => data['profil']),
      tap((res) => {
        this.mentorId = res.id;
        this.loadSlots();
      })
    );
  }
}

/*
 _______                           .__                                         .__   .__   __     __   .__              __________ .__   __           .__     
 \      \  _____     ______  ______|__|  _____    ____       _____   ___.__.   |  |  |__|_/  |_ _/  |_ |  |    ____     \______   \|__|_/  |_   ____  |  |__  
 /   |   \ \__  \   /  ___/ /  ___/|  | /     \ _/ __ \     /     \ <   |  |   |  |  |  |\   __\\   __\|  |  _/ __ \     |    |  _/|  |\   __\_/ ___\ |  |  \ 
/    |    \ / __ \_ \___ \  \___ \ |  ||  Y Y  \\  ___/    |  Y Y  \ \___  |   |  |__|  | |  |   |  |  |  |__\  ___/     |    |   \|  | |  |  \  \___ |   Y  \
\____|__  /(____  //____  >/____  >|__||__|_|  / \___  >   |__|_|  / / ____|   |____/|__| |__|   |__|  |____/ \___  >    |______  /|__| |__|   \___  >|___|  /
        \/      \/      \/      \/           \/      \/          \/  \/                                           \/            \/                 \/      \/ 
*/
