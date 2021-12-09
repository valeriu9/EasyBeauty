
<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar
        ref="calendarData"
        class='demo-app-calendar'
        :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <p>{{arg.timeText }}</p>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { format, parseISO } from 'date-fns'
export default {
  components: {
    FullCalendar
  },
  props:{
    scheduleForEmployee:{
      type: Array,
      default:[]
    }
  },
   computed:{
    selectedEvent(event){
      return event
    }
  },
  data() {
    return {
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
        daysOfWeek: [ 1, 2, 3, 4, 5 ],
        startTime: '10:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
      },
        eventConstraint:{
        start: '10:00', // a start time
        end: '18:00', // an end time
        },
        initialView: 'timeGridWeek',
        nowIndicator: true,
        events: this.scheduleForEmployee,
        editable: true,
        snapDuration:'00:10:00',
        selectable: true,
        selectMirror: false,
        dayMaxEvents: false,
        slotMinTime: "10:00:00",
        slotMaxTime: "18:00:00",
        forceEventDuration: true,
        weekends: false,
        allDaySlot: false,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventDurationEditable: true,
        contentHeight: "auto",
        eventDrop: function( eventDropInfo ) {
          if(eventDropInfo.event.start < new Date() ){
            eventDropInfo.revert();
          }
        },
        eventOverlap:  function(stillEvent, movingEvent) {
         return stillEvent.allDay && movingEvent.allDay;
        },
          eventResize: function(clickInfo) {
          // selectedEvent = clickInfo
          window.alert('si fasi waii?')
  }
      }
    }
  },

  methods: {
    handleEventClick(clickInfo) {
    this.$emit('selectedEvent', clickInfo.event.id);
    },
    formatTimeDisplay(date){
      if(date){
      return format(parseISO(date), 'HH:mm')
      }
    },
    formatDateDisplay(date){
      if(date){
      return format(parseISO(date), 'dd/MM/yyyy')
      }
    }
  }
}
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
