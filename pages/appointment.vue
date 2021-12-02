<template>
  <div class='main-container'>
    <div class='form-card'>
      <div class='form-picture'></div>
      <div class='form-details'>
        <div class='form-title'>
          <h2> Book Appointment</h2>
        </div>
        <form class='user-form' @submit="onSubmit($event)">
          <div v-for="(error, index) in errorList" :key="index" class="error-message">
            <p v-if="error.active" class="error-color">
              {{error.message}}
            </p>
          </div>
          <div class='input-group'>
            <input :value="fullName" @input="e => fullName = e.target.value"
              @blur="validateFullName(fullName)" placeholder='Full Name'>
          </div>
          <div class='input-group'>
            <input placeholder='Phone number'
              :value="phoneNr" @input="e => phoneNr = e.target.value"
              @blur="validatePhoneNr(phoneNr)" type="number">
          </div>
          <div class='input-group'>
            <input :value="email" @input="e => email = e.target.value"
              @blur="validateEmail(email)" type="text" placeholder="Email (optional)">
          </div>
          <div class='input-group'>
            <select @change="selectService($event)" class='selection'>
              <option v-for="(service, index) in serviceList" :key="index" :value="index">{{service.name}} - {{service.duration}} minutes</option>
            </select>
          </div>
          <div class='input-group'>
            <select @change="selectEmployee($event)" class='selection'>
              <option v-for="(employee, index) in employeeList" :key="index" :value="index">{{employee.fullName}}</option>
            </select>
          </div>
          <div class="input-group date">
            <input type="datetime-local" :value="timeFrame" class="inputField" readonly>
            <button class='date-button' type="button" @click="open()"> <i class="far fa-calendar"></i></button>
          </div>
          <div class='input-group'>
            <input placeholder='Note (optional)'>
          </div>
          <button @click="saveAppointmnet()">Send Appointment</button>
        </form>
      </div>
    </div>
    <PopupTemplate ref="schedulePopUp">
      <template>
        <Calendar :duration="selectedService.duration" :scheduleForEmployee="this.scheduleForEmployee" />
      </template>
    </PopupTemplate>
  </div>
</template>

<script>
import PopupTemplate from '~/components/PopupTemplate'
import Calendar from '@/components/Calendar'
import {createEventId } from '~/helpers/event-utils'
export default {
  layout: 'empty',
  props: {
    enableOverlayClick: {
      type: Boolean,
      default: true
    }
  },
  components: {
    PopupTemplate,
    Calendar
  },
  mounted() {
    let fontScript = document.createElement('script')
    fontScript.setAttribute('src', 'https://kit.fontawesome.com/52311f6e31.js')
    document.head.appendChild(fontScript)
    this.loadServices();
    this.loadEmployees();
  },
  data(){
    return {
      employeeList: [],
      serviceList:[],
      selectedService:{},
      selectedEmployee:{},
      scheduleForEmployee: [],
      email:'',
      fullName: '',
      startTime: new Date(),
      endTime: new Date(),
      phoneNr: null,
      timeFrame: {},
      errorList:[
        {
          message: '*Invalid Email',
          active: false
        },
        {
          message: '*Invalid phone nr',
          active: false
        },
        {
          message: '*Name is required',
          active: false
        }
      ]}
  },
  methods:{
    open() {
      this.$refs.schedulePopUp.open()
    },
    close() {
      this.$refs.schedulePopUp.close()
    },
      async loadServices() {
      try {
        const services = await this.$axios.get(`http://easybeauty.somee.com/v1/api/Service`);
        this.serviceList = services.data;
        this.selectedService = services.data[1]
      } catch (e) {
        console.log(e);
      }
    },
      async loadEmployees() {
      try {
        const employees = await this.$axios.get(`http://easybeauty.somee.com/v1/api/Employee`);
        this.employeeList = employees.data;
        this.selectedEmployee = employees.data[0]
        this.getAppointmentsByEmployee(employees.data[0].id);
      } catch (e) {
        console.log(e);
      }
    },
    selectService(event){
      this.selectedService = this.serviceList[event.target.value];
    },
    selectEmployee(event){
      this.scheduleForEmployee.splice(0, this.scheduleForEmployee.length)
      this.selectedEmployee = this.employeeList[event.target.value];
      this.getAppointmentsByEmployee(this.selectedEmployee.id);
    },
    async getAppointmentsByEmployee(employeeId) {
      try {
        var startDay = new Date();
        startDay.setUTCHours(0,0,0,0);
        this.scheduleForEmployee.push({
          start: startDay.toISOString(),
          end: '2021-12-02T17:00:00',
          color: '#ccc',
          constraint: 'businessHours',
          groupId: 1,
          display: 'background'
        })
        const appointments = await this.$axios.get(`http://easybeauty.somee.com/v1/schedule/${employeeId}`);
        if(appointments.data.length > 0 ){
          appointments.data.forEach(appointment => {
            this.scheduleForEmployee.push({id: createEventId(), groupId: 1, 'start':appointment.startTime, 'end': appointment.endTime, 'editable': false, color:'#ddd',  constraint: 'businessHours'});
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    validateFullName(fullName){
      this.errorList[2].active = false;
      if(fullName.length === 0){
        this.errorList[2].active = true;
      }
    },
    validatePhoneNr(phoneNr){
      this.errorList[1].active = false;
      if(phoneNr === null || phoneNr.length < 6 || phoneNr.length > 12){
        this.errorList[1].active = true;
      }
    },
    validateEmail(email){
      this.errorList[0].active = false;
      if (email === '' || !this.email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )) {
        this.errorList[0].active = true;
      } else {
        this.errorList[0].active = false;
      }
    },
    onSubmit(event){
      event.preventDefault()
    },
    saveAppointmnet(){
      this.validateFullName(this.fullName)
      this.validateEmail(this.email)
      this.validatePhoneNr(this.phoneNr)
      if(this.errorList.find(x => x.active === true)){
        return
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.input-group.date {
  display: flex;
}

.inputField {
  flex: 1;
}
.date-button {
  padding: 0 14px !important;
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
.error-color {
  color: crimson;
  margin-bottom: 20px;
}
</style>
