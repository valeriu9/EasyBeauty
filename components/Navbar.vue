<template>
  <div class="container">
    <EditEmployee ref="employeePopup" :enableOverlayClick="true" />
    <!--
    <EditAppointment ref="appointmentPopup" :enableOverlayClick="true" />
-->
    <nav class='nav-menu-wrapper'>
      <div class='nav-menu-content'>
        <div class='logo'>
          <a class='logo-clickable' href='#'>
            <svg id='logo' xmlns='http://www.w3.org/2000/svg' width='163.425' height='63.701'
              viewBox='0 0 163.425 63.701'>
              <g id='Group_3' data-name='Group 3' transform='translate(-3856.305 1453.6)'>
                <g id='Group_2' data-name='Group 2' transform='translate(3878.191 -1426.885)'>
                  <path id='Path_2' data-name='Path 2' class='cls-1'
                    d='M3885.532-1423.346a6.886,6.886,0,0,1-6.118,4,5.819,5.819,0,0,1-5.981-5.98,7.345,7.345,0,0,1,7.176-7.372,5.53,5.53,0,0,1,5.7,5.786,4.686,4.686,0,0,1-.473,2.143h-8.679a2.459,2.459,0,0,0,2.56,1.974,2.576,2.576,0,0,0,1.836-.863Zm-8.037-3.783h5.285a2.186,2.186,0,0,0-2.282-2.085A3.367,3.367,0,0,0,3877.5-1427.13Z'
                    transform='translate(-3873.433 1432.693)'></path>
                  <path id='Path_3' data-name='Path 3' class='cls-1'
                    d='M3896.385-1427.881a9.083,9.083,0,0,1-.111,1.169l-1.251,7.093h-2.782l-.362-1.252a6.737,6.737,0,0,1-3.7,1.391c-2.616,0-3.951-1.558-3.951-3.339,0-2.558,1.78-4.589,8.4-4.589a1.535,1.535,0,0,0-1.529-1.947,2.089,2.089,0,0,0-1.78,1.251l-3.755-.277a5.916,5.916,0,0,1,5.73-4.312C3894.326-1432.693,3896.385-1430.8,3896.385-1427.881Zm-4.255,3.255.111-.556c-3.645,0-4.229.834-4.229,1.78a1.233,1.233,0,0,0,1.335,1.141A2.83,2.83,0,0,0,3892.13-1424.626Z'
                    transform='translate(-3870.434 1432.693)'></path>
                  <path id='Path_4' data-name='Path 4' class='cls-1'
                    d='M3898.38-1423.792a1.426,1.426,0,0,0,1.612,1.392c.891,0,1.5-.5,1.5-1.057,0-1.224-5.619-1.252-5.619-5.008,0-2.225,1.835-4.228,4.9-4.228,3.81,0,5.34,2.032,5.368,3.895l-3.56.279c-.057-.584-.612-1.113-1.558-1.113-.751,0-1.252.39-1.252.946,0,1.2,5.59,1.252,5.59,4.979,0,2.253-1.946,4.366-5.2,4.366-3.782,0-5.174-1.946-5.4-4.172Z'
                    transform='translate(-3867.508 1432.693)'></path>
                  <path id='Path_5' data-name='Path 5' class='cls-1'
                    d='M3904.945-1432.475h4.034l1.39,7.816,4.172-7.816h4.256l-7.677,13.24c-1.668,2.893-3.2,4.145-5.312,4.145a6.88,6.88,0,0,1-1.641-.279l.556-3.143h.39a2.57,2.57,0,0,0,2.56-1.725Z'
                    transform='translate(-3864.896 1432.754)'></path>
                  <path id='Path_6' data-name='Path 6' class='cls-1'
                    d='M3913.918-1423.392a2.334,2.334,0,0,1,2.252-2.226,1.924,1.924,0,0,1,1.891,1.947,2.333,2.333,0,0,1-2.252,2.226A1.924,1.924,0,0,1,3913.918-1423.392Z'
                    transform='translate(-3862.187 1434.658)'></path>
                  <path id='Path_7' data-name='Path 7' class='cls-1'
                    d='M3927.822-1432.475h2.5l1.03,7.4,3.477-7.4h3.978l-6.565,12.8h-3.2l-.974-7.093-3.477,7.093h-3.2l-2.059-12.8h3.812l.917,7.4Z'
                    transform='translate(-3860.682 1432.754)'></path>
                  <path id='Path_8' data-name='Path 8' class='cls-1'
                    d='M3946.229-1427.881a9.083,9.083,0,0,1-.111,1.169l-1.252,7.093h-2.782l-.361-1.252a6.732,6.732,0,0,1-3.7,1.391c-2.615,0-3.95-1.558-3.95-3.339,0-2.558,1.78-4.589,8.4-4.589a1.535,1.535,0,0,0-1.529-1.947,2.089,2.089,0,0,0-1.78,1.251l-3.755-.277a5.916,5.916,0,0,1,5.73-4.312C3944.17-1432.693,3946.229-1430.8,3946.229-1427.881Zm-4.256,3.255.111-.556c-3.644,0-4.228.834-4.228,1.78a1.233,1.233,0,0,0,1.335,1.141A2.827,2.827,0,0,0,3941.972-1424.626Z'
                    transform='translate(-3856.589 1432.693)'></path>
                  <path id='Path_9' data-name='Path 9' class='cls-1'
                    d='M3945.322-1432.475h4.033l1.391,7.816,4.172-7.816h4.254l-7.677,13.24c-1.668,2.893-3.2,4.145-5.313,4.145a6.885,6.885,0,0,1-1.641-.279l.557-3.143h.389a2.568,2.568,0,0,0,2.559-1.725Z'
                    transform='translate(-3853.68 1432.754)'></path>
                  <path id='Path_10' data-name='Path 10' class='cls-1'
                    d='M3958.889-1423.792a1.426,1.426,0,0,0,1.612,1.392c.891,0,1.5-.5,1.5-1.057,0-1.224-5.62-1.252-5.62-5.008,0-2.225,1.836-4.228,4.9-4.228,3.81,0,5.341,2.032,5.368,3.895l-3.56.279c-.056-.584-.612-1.113-1.558-1.113-.751,0-1.252.39-1.252.946,0,1.2,5.591,1.252,5.591,4.979,0,2.253-1.947,4.366-5.2,4.366-3.784,0-5.174-1.946-5.4-4.172Z'
                    transform='translate(-3850.699 1432.693)'></path>
                </g>
                <path id='Path_11' data-name='Path 11' class='cls-1'
                  d='M4019.73-1389.9H3856.305v-63.7H4019.73Zm-158.324-5.1h153.223v-53.5H3861.406Z'
                  transform='translate(0)'></path>
              </g>
            </svg>
          </a>

        </div>
        <div class='buttons-wrapper'>
          <div class='button'>
            <div class='active' @click="goToAppointment()"><i class='fa fa-calendar-o'></i> Appointments</div>
          </div>
          <div class='button'>
            <div class='active' @click="openAppointmentsModal()"><i class='fa fa-calendar-o'></i> Edit Appointments</div>
          </div>
          <div class='button'>
            <div class='active' @click="openEmployeeModal()"><i class='fas fa-user-friends'></i> Employees</div>
          </div>

        </div>
        <div class='extras'>
          <p>{{ userInfo.name }}</p>
          <div v-if='userInfo.name' class='cursor-pointer' @click='logout()'><i class='fas fa-door-open'></i></div>
          <a v-if='!userInfo.name' href='/login'><i class='fas fa-door-open'></i></a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import {getCookieDataUnparsed} from '~/helpers/cookies.js'
export default {

  components:{
     EditEmployee: () => import('~/components/EditEmployee'),
     EditAppointment: () => import('~/components/EditAppointment'),
  },
  beforeMount() {
    this.userInfo = this.$store.state.user
    console.log(this.$store.state.user)
  },
  data() {
    return { userInfo: {} }
  },
  methods: {
    async logout() {
      try {
         const cookie = getCookieDataUnparsed('session');
        await this.$axios.delete(`http://easybeauty.somee.com/v1/api/Login/logout?cookie=${cookie}`)
        this.$cookies.remove('easybeauty_user')
        this.$store.dispatch('user/userLoggedOut')
        window.location.href = '/login'
      } catch (e) {
        console.log(e)
      }
    },
      goToAppointment(){
        this.$router.push('/appointment');
      },
      goToHome(){
        this.$router.push('/');
      },


    openEmployeeModal(){
      this.$refs.employeePopup.open();
    },
    closeEmployeeModal(){
      this.$refs.employeePopup.close();
    },
    openAppointmentsModal(){
      this.$refs.appointmentPopup.open();
    },
    closeAppointmentsModal(){
      this.$refs.appointmentPopup.close();
    }
  }
}
</script>
<style lang='scss' scoped>
body {
  font-family: bureau-grot, sans-serif;
}

.container {
  max-width: 100% !important;
}

.cursor-pointer {
  cursor: pointer;
}

.nav-menu-wrapper {
  width: 100%;
  height: 80px;
  transition: all 400ms ease-in-out;
  background-color: lightseagreen;
}

.nav-menu-content {
  display: flex;
  height: 100%;
  position: relative;
  padding: 0 5vw;
  color: white;
}

.nav-menu-content .extras,
.nav-menu-content .logo {
  display: Flex;
  flex-direction: row;
  width: 15%;
  margin: auto;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.nav-menu-content .extras i {
  color: white;
}

.nav-menu-content .buttons-wrapper {
  display: flex;
  width: 60%;
  justify-content: center;
}

.nav-menu-content .extras {
  justify-content: center;
  font-size: 1.2vw;
  width: 20%;

  p {
    margin-right: 20px;
  }
}

.nav-menu-content > .buttons-wrapper > .button > .active {
  margin: auto;
  font-weight: 400;
  font-size: 1.2vw;
  text-decoration: none;
  color: white;
}

.nav-menu-content > .buttons-wrapper > .button {
  height: 100%;
  text-align: center;
  display: flex;
  padding: 0 30px;
  width: max-content;
  align-self: baseline;
  cursor: pointer;
  margin: auto;
  font-weight: 400;
  font-size: 1.2vw;
  text-decoration: none;
  color: white;
}

.nav-menu-content > .logo > .logo-clickable svg {
  fill: white;
  transition: all 100ms ease-in-out;
}

.button:hover .dropdown-content {
  display: block;
}
</style>
