
<template>
  <div class="demo-app">
    <div class="demo-app-main">
      <FullCalendar
        ref="calendarData"
        class="demo-app-calendar"
        :options="calendarOptions">
        <template #eventContent="arg">
          <p>{{ arg.timeText }}</p>
        </template>
      </FullCalendar>
      <p v-if="error" class="red">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format, parseISO } from 'date-fns';
export default {
  components: {
    FullCalendar
  },
  props: {
    scheduleForEmployee: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedEvent: null,
      error: '',
      isDateSelected: false,
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin
        ],
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'today'
        },
        businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '10:00', // a start time (10am in this example)
          endTime: '18:00' // an end time (6pm in this example)
        },
        eventConstraint: {
          start: '10:00', // a start time
          end: '18:00' // an end time
        },
        initialView: 'timeGridWeek',
        nowIndicator: true,
        events: this.scheduleForEmployee,
        editable: true,
        selectable: true,
        selectMirror: false,
        dayMaxEvents: false,
        slotMinTime: '10:00:00',
        slotMaxTime: '18:00:00',
        forceEventDuration: true,
        duration: 30,
        weekends: false,
        allDaySlot: false,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventDurationEditable: false,
        contentHeight: 'auto',
        eventDrop: this.eventChanged,
        eventDragStart: this.checkIfEventSelected,
        eventOverlap (stillEvent, movingEvent) {
          return stillEvent.allDay && movingEvent.allDay;
        }
      },
      currentEvents: []
    };
  },
  watch: {
    currentEvents () {
      this.isDateSelected = this.currentEvents.some(x => x.groupId === '2');
    }
  },

  methods: {
    open () {
      this.$refs.schedulePopUp.open();
    },
    close () {
      this.$refs.schedulePopUp.close();
    },
    handleEventClick (clickInfo) {
      this.$emit('selectedEvent', clickInfo.event.id);
      this.selectedEvent = clickInfo.event.id;
    },
    checkIfEventSelected () {
      this.error = '';
      this.error = this.selectedEvent ? '' : '*Select appointment first';
    },
    handleDateSelect () {
      this.$emit('selectedEvent', 0);
      this.selectedEvent = null;
    },
    eventChanged (event) {
      if (event.event.start < new Date() || this.selectedEvent === null) {
        event.revert();
      } else {
        const startTime = event.event.startStr.split('+');
        const endTime = event.event.endStr.split('+');
        const newDates = { startTime: startTime[0], endTime: endTime[0] };
        this.$emit('newDatesForEvent', newDates);
      }
    },
    handleEvents (events) {
      this.currentEvents = events;
    },
    formatTimeDisplay (date) {
      if (date) {
        return format(parseISO(date), 'HH:mm');
      }
    },
    formatDateDisplay (date) {
      if (date) {
        return format(parseISO(date), 'dd/MM/yyyy');
      }
    }
  }
};
</script>

<style lang='scss' scoped>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}
.red {
  color: rgb(216, 0, 0);
}
.demo-app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
  height: 100%;
}

.fc {
  /* the calendar root */
  margin: 0 auto;
}
.fc-event-main {
  font-size: 11px;
  /* cursor: default; */
}
.fc-event {
  cursor: pointer;
}
.myCalendar {
  cursor: pointer;
}
.button {
  width: 120px;
  padding: 14px;
  border: 1px solid white;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
  background-color: #2c3e50;
  text-align: center;
  margin-right: 0;
  float: right;
}
</style>
