<template>
  <PopupTemplate ref='popupOpen'>
    <template #body>
      <EditAppointment ref='EditAppointmentPopup' :enableOverlayClick='true' />
      <div class='appointment-navbar'>
        <button class='add-appointment-button' type='button' @click='openAddAppointmentModal()'><i
            class='fas fa-plus'></i>
          <p>Add Appointment</p>
        </button>
      </div>
      <div class='appointment-list-container'>
        <div class='existing-appointment'>
          <button class='edit-appointment' type='button' @click='openAddAppointmentModal()'><i class='far fa-edit'></i>
          </button>
          <button class='delete-appointment' type='button' @click='removeappointment(index)'><i
              class='far fa-trash-alt'></i>
          </button>
          <div class='appointment-details'>
            <p class='appointment-name'>Big cut</p>
            <p class='appointment-email'> Bider@kontakt.ru </p>
            <p class='appointment-phone'> 43 12 56 78 </p>
          </div>

        </div>
        <div class='existing-appointment'>
          <button class='edit-appointment' type='button' @click='openAddAppointmentModal()'><i class='far fa-edit'></i>
          </button>
          <button class='delete-appointment' type='button' @click='removeappointment(index)'><i
              class='far fa-trash-alt'></i>
          </button>
          <div class='appointment-details'>
            <p class='appointment-name'>Big cut</p>
            <p class='appointment-email'> Bider@kontakt.ru </p>
            <p class='appointment-phone'> 43 12 56 78 </p>
          </div>

        </div>

      </div>
    </template>
  </PopupTemplate>
</template>

<script>

export default {

  components: {
    PopupTemplate: () => import('~/components/PopupTemplate'),
    EditAppointment: () => import('~/components/EditAppointment')
  },

  mounted() {
    let fontScript = document.createElement('script')
    fontScript.setAttribute('src', 'https://kit.fontawesome.com/52311f6e31.js')
    document.head.appendChild(fontScript)
  },

  layout: 'default',
  props: {
    enableOverlayClick: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return { showModal: false }
  },
  beforeDestroy() {
    this.close()
  },
  methods: {
    open() {
      this.$refs.popupOpen.open()
    },
    openAddAppointmentModal() {
      this.$refs.EditAppointmentPopup.open()
    },
    closeAddAppointmentModal() {
      this.$refs.EditAppointmentPopup.close()
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
    overlayClick() {
      console.log('overlayclijc')
      if (this.enableOverlayClick) {
        this.close()
      }
    },
    removeEmployee(index) {
      console.log(index)
      this.saleList.splice(index, 1)
    }
  }
}
</script>

<style lang='scss' scoped>
.appointment-navbar {
  overflow: hidden;
  display: flex;
  justify-content: center;
  height: 15%;
  align-items: center;
}

.appointment-list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 14px;
  height: 85%;
  overflow-y: auto;
}

.existing-appointment {
  height: 10%;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  margin: 15px 0;
  border-bottom: 2px solid darkgray;
  padding: 10px 0;
}

.appointment-name {
  font-weight: 600;
}

.appointment-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
}

.edit-appointment {
  position: absolute;
  right: 10px;
  display: flex;
  margin: 5px;
  font-size: 14px;
  cursor: pointer;
}

.delete-appointment {
  position: absolute;
  right: 50px;
  display: flex;
  margin: 5px;
  font-size: 14px;
  cursor: pointer;
}

.appointment-navbar input:hover {
  background-color: #ddd;
  color: black;
}

.appointment-navbar .add-appointment-button {
  margin-right: auto;
  align-items: center;
  display: flex;
  color: lightseagreen;
  background-color: transparent;
  border: none;
  font-size: 15px;
  cursor: pointer;
}

.add-appointment-button p {
  margin: 0 10px;
}
</style>
