<template>
  <div class='main-container'>
    <div class='form-card'>
      <div class='form-picture'></div>
      <div class='form-details'>
        <div class='form-title'>
          <h2> Book Appointment</h2>
        </div>
        <form class='user-form'>
          <div class='input-group'>
            <input placeholder='First Name'>
          </div>
          <div class='input-group'>
            <input placeholder='Phone number'>
          </div>
          <div class='input-group'>
            <input placeholder='Email (optional)'>
          </div>
          <div class='input-group'>
            <select class='selection'>
              <option value="" selected disabled>Employee</option>
              <option value="employee">Aleks</option>
              <option value="employee">Eric</option>
              <option value="employee">Valera</option>
            </select>
          </div>
          <div class='input-group'>
            <select class='selection'>
              <option value="" selected disabled>Service Type</option>
              <option value="serviceType">Long hair</option>
              <option value="serviceType">Short hair</option>
              <option value="serviceType">Painting</option>
            </select>
          </div>
          <div class='input-group'>
            <input placeholder='Note (optional)'>
          </div>
          <button>Send Appointment</button>
        </form>
      </div>
    </div>
    <Calendar />
  </div>
</template>

<script>

import Calendar from '@/components/Calendar'

export default {
  components: {
    Calendar
  },
  mounted() {
    let fontScript = document.createElement('script')
    fontScript.setAttribute('src', 'https://kit.fontawesome.com/52311f6e31.js')
    document.head.appendChild(fontScript)
  },


  layout: 'empty',
  props: {
    enableOverlayClick: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
