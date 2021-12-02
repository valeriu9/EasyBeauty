<template>
  <PopupTemplate ref='popupOpen'>
    <template #body>
      <AddEmployee ref='AddEmployeePopup' :enableOverlayClick='true' @loadEmployees='loadEmployees()'
        :employeeToEdit='employeeToEdit' />
      <div class='edit-employee-navbar'>
        <button class='add-employee-button' type='button' @click='openAddEmployeeModal()'><i class='fas fa-plus'></i>
          <p>Add employee</p>
        </button>
        <div class='search-wrapper'>
          <input name='search' :value='searchText' @input='e => searchText = e.target.value' placeholder='Search..'
            type='text'>
          <button type='submit' @click='search()'><i class='fa fa-search'></i></button>
        </div>
      </div>
      <div class='employee-list-container'>
        <div v-for='(employee, index) in filteredList' :key='employee.index' class='existing-employee'>
          <button class='edit-employee' type='button' @click='openAddEmployeeModal(employee)'><i
              class='far fa-edit'></i>
          </button>
          <button class='delete-employee' type='button' @click='removeEmployee(index, employee.id)'><i
              class='far fa-trash-alt'></i>
          </button>
          <div class='employee-details'>
            <p class='employee-name'>{{ employee.fullName }}</p>
            <p class='employee-email'> {{ employee.email }} </p>
            <p class='employee-phone'> {{ employee.phoneNr }} </p>
            <p class='employee-role'> {{ employee.role }} </p>
          </div>
        </div>
      </div>
    </template>
  </PopupTemplate>
</template>

<script>
import {getCookieDataUnparsed} from '~/helpers/cookies.js'
export default {
  components: {
    AddEmployee: () => import('~/components/AddEmployee'),
    PopupTemplate: () => import('~/components/PopupTemplate')
  },

  mounted() {
    let fontScript = document.createElement('script')
    fontScript.setAttribute('src', 'https://kit.fontawesome.com/52311f6e31.js')
    document.head.appendChild(fontScript)
    this.loadEmployees()
  },

  layout: 'default',
  props: {
    enableOverlayClick: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showModal: false,
      searchText: '',
      filteredList: [],
      employeeList: [],
      employeeToEdit: {},
         cookie: getCookieDataUnparsed('session')
    }
  },
  beforeDestroy() {
    this.close()
  },
  methods: {
    open() {
      this.$refs.popupOpen.open()
    },
    openAddEmployeeModal(employee = {}) {
      this.employeeToEdit = {}
      this.$refs.AddEmployeePopup.open()
      if (Object.keys(employee).length !== 0) {
        this.employeeToEdit = employee
      }
    },
    closeAddEmployeeModal() {
      this.$refs.AddEmployeePopup.close()
    },
    closeButtonClicked() {
      this.$emit('close-button-clicked')
      this.close()
    },
    close() {
      this.showModal = false
      window.onscroll = function() {
      }
      this.$emit('closed')
    },
    async loadEmployees() {
      try {
        this.filteredList = []
        this.employeeList = []
        const employees = await this.$axios.get(`http://easybeauty.somee.com/v1/api/Employee`)
        this.employeeList = employees.data
        this.filteredList = this.employeeList
      } catch (e) {
        console.log(e)
      }
    },
    overlayClick() {
      console.log('overlayclijc')
      if (this.enableOverlayClick) {
        this.close()
      }
    },
    async removeEmployee(index, id) {
      try {
        await this.$axios.delete(`http://easybeauty.somee.com/v1/api/Employee?id=${id}&cookie=${this.cookie}`)
        this.employeeList.splice(index, 1)
        this.filteredList = this.employeeList
      } catch (e) {
        console.log(e)
      }
    },
    search() {
      this.filteredList = this.employeeList.filter(employee => employee.fullName.toLowerCase().includes(this.searchText.toLowerCase()))
    }
  }
}
</script>

<style lang='scss' scoped>
.edit-employee-navbar {
  overflow: hidden;
  display: flex;
  justify-content: center;
  height: 15%;
  align-items: center;
}

.employee-list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 14px;
  height: 90%;
  margin-top: 10px;
}

.existing-employee {
  height: 10%;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  margin: 15px 0;
  border-bottom: 2px solid darkgray;
  padding: 10px 0;
}

.employee-name {
  font-weight: 600;
  width: 20%;
}

.employee-email {
  width: 35%;
}

.employee-phone {
  width: 12%;
}

.employee-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
}

.edit-employee {
  position: absolute;
  right: 10px;
  display: flex;
  margin: 5px;
  font-size: 14px;
  cursor: pointer;
}

.delete-employee {
  position: absolute;
  right: 50px;
  display: flex;
  margin: 5px;
  font-size: 14px;
  cursor: pointer;
}

.search-wrapper button {
  border-radius: 100%;
  background: lightseagreen;
  margin: 10px;
  border: none;
  padding: 10px;
  height: 30px;
  display: flex;
  align-items: center;
}

.edit-employee-navbar input:hover {
  background-color: #ddd;
  color: black;
}

.edit-employee-navbar input[type='text'] {
  padding: 5px;
  font-size: 14px;
  border: none;
  border-radius: 3%;
  background-color: lightgrey;
  text-align: center;
  width: 20vw;
  height: 30px;
  color: gray;
}

.edit-employee-navbar .search-wrapper {
  margin-left: auto;
  align-items: center;
  display: flex;
}

.edit-employee-navbar .add-employee-button {
  margin-right: auto;
  align-items: center;
  display: flex;
  color: lightseagreen;
  background-color: transparent;
  border: none;
  font-size: 15px;
  cursor: pointer;
}

.add-employee-button p {
  margin: 0 10px;
}
</style>
