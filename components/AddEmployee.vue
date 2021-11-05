<template>
  <popupTemplate ref='popupOpen'>
    <template #body>
      <div class='user-input-wrp'>
        <div class='employee-details'>
          <input type='text' class='inputText' required />
          <p class='floating-label'>First Name</p>
          <input type='text' class='inputText' required />
          <p class='floating-label'>Last Name</p>
          <input type='text' class='inputText' required />
          <p class='floating-label'>Email Address</p>
          <input type='text' class='inputText' required />
          <p class='floating-label'>Phone Number</p>
        </div>

        <select class='employee-role' name='employee role'>
          <option value='employee'>Employee</option>
          <option value='manager'>Manager</option>
        </select>
        <div class='button-container'>
          <button class='save-button'>Save</button>
          <button class='cancel-button'>Cancel</button>
        </div>

      </div>
    </template>
  </popupTemplate>
</template>

<script>

import popupTemplate from '@/components/popupTemplate'

export default {

  components: {
    popupTemplate
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
    openAddEmployeeModal() {
      this.$refs.AddEmployeePopup.open()
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
    overlayClick() {
      console.log('overlayclijc')
      if (this.enableOverlayClick) {
        this.close()
      }
    }
  }
}
</script>

<style lang='scss' scoped>

.employee-details {
  margin: 0 40px;
}

.employee-role {
  margin: 10px 40px;
  cursor: pointer;
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
  top: -35px;
  left: 10px;
  font-size: 13px;
  opacity: 1;
  color: #6a6a6a;
}

</style>
