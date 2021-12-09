
<template>
  <PopupTemplate ref="schedulePopUp" design='editAppointment'>
    <template #body>
      <div class='demo-app'>
        <form class='user-form' @submit="onSubmit($event)">
          <div class='input-group'>
            <input :value="selectedEvent.fullName" placeholder='Full Name' disabled>
          </div>
          <div class='input-group'>
            <input placeholder='Phone number'
              :value="selectedEvent.phoneNr" disabled>
          </div>
          <div class='input-group'>
            <input :value="selectedEvent.email" placeholder="Email (optional)" disabled>
          </div>
          <div class='input-group'>
            <select @change="selectService($event)" class='selection'>
              <option v-for="(service, index) in serviceList" :key="index" :value="index">{{service.name}} - {{service.duration}} minutes</option>
            </select>
          </div>
          <div class="input-group date">
            <div v-if="selectedEvent.startStr">
              <p>{{formatDateDisplay(selectedEvent.startStr)}} {{formatTimeDisplay(selectedEvent.startStr)}} - {{formatTimeDisplay(selectedEvent.endStr)}}</p>
            </div>
            <div v-else>
              <p>Choose an event</p>
            </div>
          </div>
          <div class='input-group'>
            <input placeholder='Note (optional)' :value="selectedEvent.note">
          </div>
        </form>
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
          <p>*Drag and drop your event for changing date and time</p>
          <p>*Click on your event in order to delete it</p>
          <br>
        </div>
      </div>
      <div class="button" @click="close()">Choose</div>
    </template>
  </PopupTemplate>
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
  mounted(){
    this.loadServices();
    this.loadAppointmentsById();
  },
  data() {
    const appointmentList = [];
    const serviceList = [];
    const selectedService = {};
    return {
      serviceList,
      appointmentList,
      selectedService,
      selectedEvent: {},
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
        initialEvents: this.appointmentList,
        editable: true,
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
      console.log(selectInfo);
    //  if(selec)
    },

    handleEventClick(clickInfo) {
      if(clickInfo.event.groupId === '1'){
        return
      }
      if (confirm(`Are you sure you want to delete the appointment?`)) {
        this.selectedEvent = {}
        clickInfo.event.remove()
      }
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
    },
    async loadServices() {
      try {
        const services = await this.$axios.get(`http://easybeauty.somee.com/v1/api/Service`);
        this.serviceList = services.data;
      } catch (e) {
        console.log(e);
      }
    },
    async loadAppointmentsById() {
      try {
        const appointments = await this.$axios.get(`http://easybeauty.somee.com/v1/api/Appointment?employeeId=${this.$store.state.user.id}`);

          if(appointments.data.length > 0 ){
          appointments.data.forEach(appointment => {
            this.appointmentList.push({id: createEventId(), groupId: 1, 'start':appointment.startTime+'0Z', 'end': appointment.endTime+'0Z', 'editable': false, color:'#ddd',  constraint: 'businessHours'});
          });
          this.$refs.calendarData.render()
        }
      } catch (e) {
        console.log(e);
      }
    },
    selectService(event){
      this.selectedService = this.serviceList[event.target.value];
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
  flex-direction: row;
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
  width: 70%;
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

.inputField {
  flex: 1;
}
.date-button {
  padding: 0 14px !important;
}
.date {
  p {
    color: #ccc;
  }
}
.main-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.form-card {
  background: black;
  border-radius: 10px;
  box-shadow: 0px 8px 20px 0px rgb(0 0 0 / 15%);
  width: 100%;
  display: table;
  max-width: 780px;
  margin: 0 auto;
}

.form-picture {
  width: 50%;
  display: table-cell;
  background-image: url('assets/images/hairsalon.jpg');
}

.form-details {
  padding: 30px 65px;
  display: table-cell;
}
.form-title {
  font-size: 24px;
  color: #fff;
  font-weight: 400;
  margin-bottom: 36px;
}
.input-group {
  position: relative;
  margin-bottom: 33px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.input-group input {
  outline: none;
  margin: 0;
  border: none;
  box-shadow: none;
  width: 100%;
  font-family: inherit;
  padding: 5px 0;
  font-size: 16px;
  color: #ccc;
  background: transparent;
}

.selection {
  background: transparent;
  cursor: pointer;
  color: gray;
  transition: all 0.4s ease;
  border: none;
  width: 102%;
  font-size: 16px;
  margin: 2px -4px;
}

.selection:focus {
  color: white;
}

.selection option {
  color: #000;
  background: #fff;
}
.selection > option:nth-child(1) {
  color: gray;
}
.user-form {
  padding: 20px;
  margin-top: 100px;
  background-color: rgb(41, 39, 39);
  height: fit-content;
}
.user-form button {
  border-radius: 20px;
  background: #c19d75;
  display: inline-block;
  line-height: 40px;
  padding: 0 33px;
  cursor: pointer;
  color: #fff;
  transition: all 0.4s ease;
  font-size: 18px;
  border: none;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
