
<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <p>{{arg.endTime}}</p>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
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
import { INITIAL_EVENTS, createEventId } from '~/helpers/event-utils'
import { addMinutes, addMonths, format, parseISO } from 'date-fns'
export default {

  components: {
    FullCalendar
  },
  props:{
    duration:{
      type: Number,
      default: null
    }
  },

  data() {
    const serviceDuration = this.duration;
    const hours = Math.floor(serviceDuration / 60);
    const minutes = serviceDuration % 60;
    const stringDuration = '0'+hours+':'+minutes+":00";
    return {
      serviceDuration,
      stringDuration,
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
            // user json to clone clone
            end: JSON.parse(JSON.stringify(addMonths(nowDate, 1)))
          };
        },
        eventConstraint:{
        start: '10:00', // a start time
        end: '18:00', // an end time
        },
        initialView: 'timeGridWeek',
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: false,
        dayMaxEvents: false,
        slotMinTime: "10:00:00",
        slotMaxTime: "18:00:00",
        forceEventDuration: true,
        duration: stringDuration,
        // snapDuration: stringDuration,
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
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: []
    }
  },

  methods: {
    handleDateSelect(selectInfo) {
      console.log(selectInfo.startStr);
      const startTime = JSON.parse(JSON.stringify(selectInfo.startStr));
      const endTime = JSON.parse(JSON.stringify(addMinutes(parseISO(selectInfo.startStr), this.serviceDuration)));
      console.log(this.serviceDuration);
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // clear date selection
        // console.log(format(parseISO(endTime),'HH'));
      if(format(parseISO(endTime),'HH') > 18){
        window.alert('Expected end time is out of business hours')
        return
      }
      if(parseInt(format(parseISO(endTime),'HH')) === 18 && parseInt(format(parseISO(endTime),'mm')) > 0){
        window.alert('Expected end time is out of business hours')
        return
      }
      if(selectInfo.start > new Date){
      let title = prompt('Please enter a new title for your event')
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: startTime,
          end: endTime,
          constraint: 'businessHours'
        })
      }
      }
    },

    handleEventClick(clickInfo) {
      console.log(clickInfo);
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },

    handleEvents(events) {
      this.currentEvents = events
    }
  }
}
</script>

<style lang='css'>

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

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;

  width: 50% !important;
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

.fc { /* the calendar root */
  margin: 0 auto;
}

</style>
