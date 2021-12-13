
<template>
  <PopupTemplate ref="schedulePopUp" design="editAppointment">
    <template #body>
      <div class="demo-app">
        <div class="user-form">
          <div class="input-group">
            <input :value="selectedEvent.customerName" placeholder="Full Name" disabled>
          </div>
          <div class="input-group">
            <input
              placeholder="Phone number"
              :value="selectedEvent.phoneNr"
              disabled>
          </div>
          <div class="input-group">
            <input :value="selectedEvent.customerEmail" placeholder="Email (optional)" disabled>
          </div>
          <div class="input-group">
            <select @change="selectService($event)" class="selection">
              <option v-for="(service, index) in serviceList" :key="index" :selected="service.id === selectedEvent.serviceId" :value="index">{{ service.name }} - {{ service.duration }} minutes</option>
            </select>
          </div>
          <div class="input-group date">
            <div v-if="selectedEvent.startTime">
              <p>{{ formatDateDisplay(selectedEvent.startTime) }} {{ formatTimeDisplay(selectedEvent.startTime) }} - {{ formatTimeDisplay(selectedEvent.endTime) }}</p>
            </div>
            <div v-else>
              <p>Choose an event</p>
            </div>
          </div>
          <div class="input-group">
            <input placeholder="Note (optional)" :value="selectedEvent.notes" @input="e => selectedEvent.notes = e.target.value">
          </div>
          <div class="buttons-form" v-if="selectedEvent.phoneNr">
            <button v-if="selectedEvent.isAccepted" @click="onSubmit()">Save changes</button>
            <button v-else @click="onSubmit()">Accept & save</button>
            <button class="red" @click="onDecline()">Decline & remove</button>
          </div>
        </div>
        <div class="demo-app-main">
          <div v-if="$store.state.user.role === 'manager'" class="select-employee-wrapper">
            Select an employee:
            <select @change="selectEmployee($event)" class="select-employee">
              <option v-for="(employee, index) in employeeList" :key="index" :value="index">{{ employee.name }}</option>
            </select>
          </div>
          <CalendarEmp ref="calendar" :eventHasChanges="eventHasChanges" :scheduleForEmployee="appointmentForCalendar" @selectedEvent="setEvent($event)" @newDatesForEvent="setNewDatesForEvent($event)">
          </CalendarEmp>
          <br>
        </div>
      </div>
    </template>
  </PopupTemplate>
</template>

<script>
import CalendarEmp from '~/components/CalendarEmp';
import { format, parseISO, addMinutes } from 'date-fns';
import { getCookieDataUnparsed } from '~/helpers/cookies.js';
export default {
  components: {
    CalendarEmp,
    PopupTemplate: () => import('@/components/PopupTemplate')
  },
  props: {
    serviceList: {
      type: Array,
      default: () => []
    },
    employeeList: {
      type: Array,
      default: () => []
    },
    isEmployeeListFetched: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      appointmentsFromServer: [],
      appointmentForCalendar: [],
      eventHasChanges: false,
      selectedEmployee: {},
      cookie: getCookieDataUnparsed('session'),
      selectedEvent: { customerName: '', phoneNr: null, customerEmail: '', serviceId: null }
    };
  },
  mounted () {
    this.$store.state.user.role === 'manager' && this.isEmployeeListFetched ? this.loadAppointmentsById(this.employeeList[0].id) : this.loadAppointmentsById(this.$store.state.user.id);
    this.selectedEmployee = this.$store.state.user.role === 'manager' && this.isEmployeeListFetched ? this.employeeList[0] : { id: this.$store.state.user.id };
  },

  methods: {
    open () {
      this.$refs.schedulePopUp.open();
    },
    close () {
      this.$refs.schedulePopUp.close();
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
    },
    setEvent (eventId) {
      if (this.eventHasChanges) {
        window.alert('Save changes before selecting another appointment');
        return;
      }
      this.selectedEvent = this.appointmentsFromServer.find((obj) => {
        return obj.id.toString() === eventId.toString();
      });
      if (!this.selectedEvent) {
        this.selectedEvent = { customerName: '', phoneNr: null, customerEmail: '', serviceId: null };
      }
    },
    setNewDatesForEvent (eventDates) {
      this.selectedEvent.endTime = eventDates.endTime;
      this.selectedEvent.startTime = eventDates.startTime;
      this.eventHasChanges = true;
    },
    async loadAppointmentsById (userId) {
      try {
        this.appointmentForCalendar.splice(0, this.appointmentForCalendar.length);
        const appointments = await this.$axios.get(`//easybeauty.somee.com/v1/api/Appointment?employeeId=${userId}`);
        if (appointments.data.length > 0) {
          this.appointmentsFromServer = appointments.data;
          appointments.data.forEach((appointment) => {
            this.appointmentForCalendar.push({ id: appointment.id, title: appointment.customerFullName, start: appointment.startTime, end: appointment.endTime, color: appointment.isAccepted ? '' : '#ccc', constraint: 'businessHours' });
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    selectService (event) {
      this.selectedEvent.serviceId = this.serviceList[event.target.value].id;
      const selectedService = this.serviceList.find((x) => { return x.id.toString() === this.selectedEvent.serviceId.toString(); });
      const tempEndTime = addMinutes(parseISO(this.selectedEvent.startTime), selectedService.duration);
      this.appointmentForCalendar.forEach((appointment) => {
        if (appointment.id === this.selectedEvent.id) {
          appointment.serviceId = this.selectedEvent.serviceId;
          appointment.start = this.selectedEvent.startTime;
          appointment.end = format(tempEndTime, "yyyy-MM-dd'T'HH:mm:ss");
          this.selectedEvent.startTime = appointment.start;
          this.selectedEvent.endTime = appointment.end;
        }
      });
      this.eventHasChanges = true;
    },
    selectEmployee (event) {
      this.appointmentForCalendar.splice(0, this.appointmentForCalendar.length);
      this.selectedEmployee = this.employeeList[event.target.value];
      this.selectedEvent = { customerName: '', phoneNr: null, customerEmail: '', serviceId: null };
      this.loadAppointmentsById(this.selectedEmployee.id);
    },
    async onSubmit () {
      try {
        const objToSend = { startTime: this.selectedEvent.startTime, endTime: this.selectedEvent.endTime, customerName: this.selectedEvent.customerName, phoneNr: this.selectedEvent.phoneNr, serviceId: this.selectedEvent.serviceId, employeeId: this.selectedEvent.employeeId, notes: this.selectedEvent.notes, customerEmail: this.selectedEvent.customerEmail, isAccepted: true };
        const res = await this.$axios.put(`//easybeauty.somee.com/v1/api/Appointment?id=${this.selectedEvent.id}&cookie=${this.cookie}`, objToSend);
        if (res.data.error) {
          window.alert(res.data.error);
        } else {
          this.eventHasChanges = false;
          this.loadAppointmentsById(this.$store.state.user.role === 'manager' ? this.selectedEmployee.id : this.$store.state.user.id);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async onDecline () {
      try {
        const res = await this.$axios.delete(`//easybeauty.somee.com/v1/api/Appointment?id=${this.selectedEvent.id}&cookie=${this.cookie}`);
        if (res.data.error) {
          window.alert(res.data.error);
        } else {
          this.eventHasChanges = false;
          this.loadAppointmentsById(this.$store.state.user.role === 'manager' ? this.selectedEmployee.id : this.$store.state.user.role);
        }
      } catch (e) {
        console.log(e);
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
.select-employee-wrapper {
  margin-left: 40px;
}
.select-employee {
  background: transparent;
  cursor: pointer;
  color: #000;
  transition: all 0.4s ease;
  border: none;
  border-bottom: 1px solid black;
  padding: 12px;
  font-size: 16px;
  margin: 2px -4px;
  margin-left: 10px;
}

.select-employee:focus {
  color: #000;
}
.select-employee:focus-visible {
  outline: none;
}
.select-employee option {
  color: #000;
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
  background-image: url("assets/images/hairsalon.jpg");
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
  margin-bottom: 20px;
}
.red {
  color: rgb(155, 10, 10);
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.buttons-form {
  max-width: fit-content;
}
</style>
