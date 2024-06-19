import {
  AfterViewChecked,
  Component,
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
import { ReservationService } from '../../../../../shared/services/reservation.service';
import { MentorService } from '../../../../../shared/services/mentor.service';
import { Subscription } from 'rxjs';
import { MentorDTO } from '../../../../../shared/models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateTimeService } from '../../../../../shared/services/dateTime.service';
import { MessageService } from 'primeng/api';

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
  userId!: number;
  mentorSubscription!: Subscription;
  @Input() formattedSlotInfo!: any;
  events: EventInput[] = [];
  displayModal: boolean = false;
  eventDetails: any = {};
  eventDetailsEdit: any = {};

  mode: string = '';
  isModfify: boolean = false;
  datetime24h: Date[] | undefined;
  time: Date[] | undefined;
  selectedTime: string = '';
  selectedDate: string = '';
  selectedEndTime: string = '';

  constructor(
    private reservationService: ReservationService,
    private mentorService: MentorService,
    private fb: FormBuilder,
    private dateTimeService: DateTimeService,
    private messageService: MessageService
  ) {}

  formulaire: FormGroup = this.fb.group({
    mode: ['presentiel'],
  });

  updateMode() {
    this.formattedSlotInfo.visio = this.formulaire.value.mode === 'visio';
  }

  selectAllow = (selectionInfo: any) => {
    if (selectionInfo.start > new Date()) {
      return true;
    }
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

      const startLocalDateTime =
        this.dateTimeService.convertToLocalDateTimeString(selectionInfo.start);
      const endLocalDateTime =
        this.dateTimeService.convertToLocalDateTimeString(selectionInfo.end);

      this.formattedSlotInfo = {
        formattedDuration,
        dateBegin: startLocalDateTime,
        dateEnd: endLocalDateTime,
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
        this.messageService.add({
          severity: 'success',
          summary: 'Super ! ',
          detail: 'Votre créneau a bien été ajoutée',
        });
        this.loadSlots();
      });
  }

  deleteSlot() {
    if (this.eventDetails.id) {
      this.reservationService.deleteSlot(this.eventDetails.id).subscribe(() => {
        this.displayModal = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Super ! ',
          detail: 'Votre créneau a bien été supprimé',
        });
        this.loadSlots();
      });
    } else {
      console.error('Pas de slot à supprimer');
    }
  }

  editSlot() {
    this.eventDetailsEdit = {
      id: this.eventDetails.id,
      start: this.eventDetails.start,
      end: this.eventDetails.end,
      visio: this.eventDetails.visio,
    };
    this.isModfify = true;
  }

  editForm: FormGroup = this.fb.group({
    id: [''],
    dateStart: [''],
    dateEnd: [''],
    visio: ['Présentiel'],
  });

  validateAndLog(field: string) {
    const date: Date = this.editForm.get(field)?.value;
    if (date) {
      const formattedDate = this.formatDate(date);
      console.log(`Date and time selected for ${field}: ${formattedDate}`);
    } else {
      console.log(`No date selected for ${field}`);
    }
  }

  onSubmit() {
    if (!this.eventDetails.id) {
      console.error("ID de l'événement non défini.");
      return;
    }

    const id = Number(this.eventDetails.id);
    const dateBegin = this.dateTimeService.convertToLocalDateTimeString(
      this.eventDetails.start
    );
    const dateEnd = this.dateTimeService.convertToLocalDateTimeString(
      this.eventDetails.end
    );

    const visio = this.editForm.value.visio === 'visio';
    const mentorId = this.mentorId;

    const slotInfo = {
      id,
      dateBegin,
      dateEnd,
      visio,
      mentorId,
    };

    this.reservationService.updateSlot(id, slotInfo).subscribe(
      () => {
        this.displayModal = false;
        this.loadSlots();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du slot:', error);
      }
    );
  }

  onSubmitDrop() {
    if (!this.eventDetailsEdit.id) {
      console.error("ID de l'événement non défini.");
      return;
    }

    const id = Number(this.eventDetailsEdit.id);
    const dateBegin = this.dateTimeService.convertToLocalDateTimeString(
      this.eventDetailsEdit.start
    );
    const dateEnd = this.dateTimeService.convertToLocalDateTimeString(
      this.eventDetailsEdit.end
    );

    const visio = this.editForm.value.visio === 'visio';
    const mentorId = this.mentorId;

    const slotInfo = {
      id,
      dateBegin,
      dateEnd,
      visio,
      mentorId,
    };

    this.reservationService.updateSlot(id, slotInfo).subscribe(
      () => {
        this.displayModal = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Super ! ',
          detail: 'Votre créneau a bien été mis à jour',
        });
        this.isModfify = false;
        this.loadSlots();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du slot:', error);
      }
    );
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  handleEventDrop(eventDropArg: any) {
    this.eventDetails = {
      id: eventDropArg.oldEvent.id,
      start: eventDropArg.oldEvent.start,
      end: eventDropArg.oldEvent.end,
      visio: eventDropArg.oldEvent.extendedProps.visio,
    };

    this.displayModal = true;
    this.isModfify = true;

    this.eventDetailsEdit = {
      id: eventDropArg.oldEvent.id,
      start: eventDropArg.event.start,
      end: eventDropArg.event.end,
      visio: eventDropArg.oldEvent.extendedProps.visio,
    };

    this.displayModal = true;
    this.isModfify = true;
  }

  closeModal() {
    this.displayModal = false;
    this.isModfify = false;
    this.loadSlots();
  }

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],

    locale: frLocale,
    headerToolbar: {
      right: 'today prev,next',
      left: 'title dayGridMonth timeGridWeek timeGridDay',
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
    eventOverlap: false,
    eventDrop: this.handleEventDrop.bind(this),
    weekNumbers: true,
    selectMirror: true,
    unselectAuto: true,
    selectOverlap: false,
    editable: true,
    // https://fullcalendar.io/docs/select-callback
    selectable: true,
    eventDurationEditable: true,
    defaultTimedEventDuration: '01:00:00',
    nowIndicator: true,

    droppable: false,
    eventContent: this.renderEventContent.bind(this),
    select: this.onDateSelect,
    selectAllow: this.selectAllow,
    eventClick: this.handleEventClick.bind(this),
  };

  renderEventContent(arg: any) {
    console.log('args', arg);
    let html = `<div class="custom-event">
                  <b>${arg.event.title}</b>
                  <div>${
                    arg.event.extendedProps['isBooked']
                      ? `<div class="slot-content"><img src=${arg.event.extendedProps.imgUrl} width="24" height="auto"/><span>${arg.event.extendedProps.firstname}</span></div>`
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
    this.eventDetails = {
      id: eventClickArg.event.id,
      title: eventClickArg.event.title,
      start: eventClickArg.event.start,
      end: eventClickArg.event.end,
      visio: eventClickArg.event.extendedProps['visio'],
    };

    this.editForm.setValue({
      id: '',
      dateStart: '',
      dateEnd: '',
      visio: eventClickArg.event.extendedProps['visio']
        ? 'visio'
        : 'presentiel',
    });

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
      start: slot.dateBegin,
      end: slot.dateEnd,
      color: slot.visio ? '#FCBE77' : '#F8156B',
      extendedProps: {
        visio: slot.visio,
        isBooked: slot.booked,
        imgUrl: slot.imgUrl,
        firstname: slot.firstname,
      },
    }));
  }

  ngOnInit(): void {
    this.calendarOptions.locale = frLocale;
    this.calendarOptions.allDayText = 'Heures';

    this.mentorSubscription = this.mentorService.activeMentorProfil$.subscribe(
      (mentor: MentorDTO) => {
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
  ngAfterViewChecked(): void {}
}
