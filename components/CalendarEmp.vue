
<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar
        ref="calendarData"
        class='demo-app-calendar'
        :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <p>{{arg.endTime}}</p>
          <p>{{ arg.timeText }}</p>
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
import { createEventId } from '~/helpers/event-utils'
import { addMinutes, addMonths, format, parseISO } from 'date-fns'
import PopupTemplate from '~/components/PopupTemplate'
export default {
  components: {
    FullCalendar,
    PopupTemplate
  },
  props:{
    duration:{
      type: Number,
      default: 30
    },
    scheduleForEmployee:{
      type: Array,
      default:[]
    }
  },
  watch:{
    duration(){
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    this.stringDuration = '0'+hours+':'+minutes+":00";
    },
    currentEvents(){
      this.isDateSelected = this.currentEvents.some(x => x.groupId === '2');
    }
  },
  data() {
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    const stringDuration = '0'+hours+':'+minutes+":00";
    return {
      stringDuration,
      selectedEvent: [],
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
        daysOfWeek: [ 1, 2, 3, 4, 5 ],
        startTime: '10:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
      },
      validRange: function(nowDate) {
          return {
            start: nowDate,
            // user json to flatten an observable
            end: JSON.parse(JSON.stringify(addMonths(nowDate, 1)))
          };
        },
        eventConstraint:{
        start: '10:00', // a start time
        end: '18:00', // an end time
        },
        initialView: 'timeGridWeek',
        nowIndicator: true,
        events: this.scheduleForEmployee,
        editable: true,
        selectable: true,
        selectMirror: false,
        dayMaxEvents: false,
        slotMinTime: "10:00:00",
        slotMaxTime: "18:00:00",
        forceEventDuration: true,
        duration: stringDuration,
        weekends: false,
        allDaySlot: false,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventDurationEditable: false,
        contentHeight: "auto",
        eventDrop: function( eventDropInfo ) {
          if(eventDropInfo.event.start < new Date() ){
            eventDropInfo.revert();
          }
        },
        eventOverlap:  function(stillEvent, movingEvent) {
         return stillEvent.allDay && movingEvent.allDay;
        },
      },
      currentEvents: []
    }
  },

  methods: {
    open() {
      this.$refs.schedulePopUp.open()
    },
    close() {
      this.$refs.schedulePopUp.close()
    },
    handleDateSelect(selectInfo) {
      const startTime = JSON.parse(JSON.stringify(selectInfo.startStr));
      const endTime = JSON.parse(JSON.stringify(addMinutes(parseISO(selectInfo.startStr), this.duration)));
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // clear date selection
      if(format(parseISO(endTime),'HH') > 18){
        window.alert('Expected end time is out of business hours')
        return
      }
      if(parseInt(format(parseISO(endTime),'HH')) === 18 && parseInt(format(parseISO(endTime),'mm')) > 0){
        window.alert('Expected end time is out of business hours')
        return
      }
      if(selectInfo.start > new Date && !this.isDateSelected){
        calendarApi.addEvent({
          id: createEventId(),
          groupId: 2,
          start: startTime,
          end: endTime,
          constraint: 'businessHours'
        })
        this.selectedEvent = this.currentEvents.filter(x => x.groupId === '2')
      }
    },

    handleEventClick(clickInfo) {
      this.$emit('selectedEvent', clickInfo.event.id);
    },

    handleEvents(events) {
      this.currentEvents = events
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
