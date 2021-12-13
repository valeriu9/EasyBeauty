<template>
  <PopupTemplate ref='popupOpen'>
    <template #body>
      <div class='user-input-wrp'>
        <div class='employee-details'>
          <div class='employee'>
            <input type='text' v-model='name' class='inputText' required />
            <p class='floating-label'>Full Name</p>
          </div>
          <div class='employee'>
            <input type='email' v-model='email' class='inputText' required />
            <p class='floating-label'>Email Address</p>
          </div>
          <div class='employee'>
            <input type='number' v-model='phoneNr' class='inputText' required />
            <p class='floating-label'>Phone Number</p>
          </div>
        </div>
        <select class='employee-role' v-model='role' name='employee role'>
          <option value='employee'>Employee</option>
          <option value='manager'>Manager</option>
        </select>
        <div class='button-container'>
          <button @click='save()' class='save-button'>Save</button>
          <button @click='cancel()' class='cancel-button'>Cancel</button>
        </div>
      </div>
    </template>
  </PopupTemplate>
</template>

<script>
import {getCookieDataUnparsed} from '~/helpers/cookies.js'
export default {
  components: {
    PopupTemplate: () => import('@/components/PopupTemplate')
  },
  props: {
    employeeToEdit: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      name: '',
      phoneNr: null,
      email: '',
      role: 'employee',
      id: null,
      cookie: getCookieDataUnparsed('session')
    }
  },
  watch: {
    employeeToEdit() {
        this.name = this.employeeToEdit.name
        this.role = this.employeeToEdit.role ? this.employeeToEdit.role : 'employee'
        this.email = this.employeeToEdit.email
        this.phoneNr = this.employeeToEdit.phoneNr
        this.id = this.employeeToEdit.id
    }
  },
  beforeDestroy() {
    this.close()
  },
  methods: {
    open() {
      this.$refs.popupOpen.open()
    },
    close() {
      this.$refs.popupOpen.close()
    },
    async save() {
      if (this.name === '', this.phoneNr === 0, this.email === '', this.role === '') {
        window.alert('Complete all the fields before saving')
        return
      }
      try {
        if (this.employeeToEdit.name) {
          this.$axios.put(`//easybeauty.somee.com/v1/api/Employee?id=${this.id}&cookie=${this.cookie} `, {
            name: this.name,
            phoneNr: this.phoneNr,
            email: this.email,
            role: this.role
          })
          setTimeout(() => {
            this.$emit('loadEmployees')
          }, 1000)
          this.close()
        } else {
          this.$axios.post(`//easybeauty.somee.com/v1/api/Employee?id=${this.id}&cookie=${this.cookie}`, {
            name: this.name,
            phoneNr: this.phoneNr,
            email: this.email,
            role: this.role
          })
          setTimeout(() => {
            this.$emit('loadEmployees')
          }, 1000)
          this.close()
        }
      } catch (e) {
        console.log(e)
      }
    },
    cancel() {
      this.name = '',
        this.phoneNr = null,
        this.email = '',
        this.role = 'employee',
        this.close()
    }
  }
}
</script>

<style lang='scss' scoped>
.save-button {
  cursor: pointer;
  padding: 10px;
  transition: 0.3s;
  font-size: 17px;
  background-color: lightseagreen;
  margin: 0 15px;
  border: none;
  color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%), 0 0 10px 0 rgb(0 0 0 / 10%) !important;
  width: 14vw;
}

.cancel-button {
  cursor: pointer;
  padding: 10px;
  transition: 0.3s;
  font-size: 17px;
  margin: 0 15px;
  border-radius: 10px;
  width: 14vw;
  background-color: rgba(255, 255, 255, 0.5);
  border: darkred solid medium;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%), 0 0 10px 0 rgb(0 0 0 / 10%) !important;
  color: darkred;
}

.employee-details {
  margin: 0 40px;
  height: 50%;
}

.employee {
  position: relative;
  height: 33%;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.employee-role {
  margin: 20px 40px;
  margin-top: 0;
  cursor: pointer;
  padding: 10px;
  transition: 0.3s;
  font-size: 13px;
  border-radius: 10px;
  background-color: white;
  border: lightseagreen solid thin;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
}

.button-container button {
  padding: 5px;
  cursor: pointer;
}

.user-input-wrp {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.user-input-wrp .inputText {
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid #777;
  box-shadow: none !important;
  height: 35%;
}

.user-input-wrp .inputText:focus {
  border-width: medium medium 2px;
}

.user-input-wrp .floating-label {
  position: relative;
  pointer-events: none;
  left: 10px;
  transition: 0.2s ease all;
  top: -20px;
  color: lightgray;
}

.user-input-wrp input:focus + .floating-label,
.user-input-wrp input:not(:focus):valid + .floating-label {
  top: -40px;
  left: 10px;
  font-size: 13px;
  opacity: 1;
  color: #6a6a6a;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
