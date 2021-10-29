<template>
  <div class='normal-window'>
    <div class='employee-popup-window'>

      <div class='user-input-wrp'>
        <input type="text" class="inputText" required/>
        <p class="floating-label">First Name</p>
        <br/>
        <input type="text" class="inputText" required/>
        <p class="floating-label">Last Name</p>
        <br/>
        <input type="text" class="inputText" required/>
        <p class="floating-label">Email Address</p>
        <br/>
        <input type="text" class="inputText" required/>
        <p class="floating-label">Phone Number</p>

        <select class="employee-details" name='employee role'>
          <option value='volvo'>Employee</option>
          <option value='saab'>Manager</option>
        </select>
        <div class="button-container">
          <button class="save-button">Save</button>
          <button class="cancel-button">Cancel</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {

  mounted() {
    let fontScript = document.createElement('script')
    fontScript.setAttribute('src', 'https://kit.fontawesome.com/52311f6e31.js')
    document.head.appendChild(fontScript)
  },

  layout: 'default'
}
</script>

<style lang='css' scoped>
.normal-window {
  width: 100%;
  height: 100%;
  position: absolute;
  border: 2px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}


.employee-popup-window{
  height: 50%;
  background-color: white;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  border-radius: 5px;
  padding: 15px;
  width: 30%;
}

.add-employee {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
.employee-details{
  margin: 12px 40px;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.button-container button{
  padding: 5px;
}

.user-input-wrp {
  position: relative;
  width: 50%;
}
.user-input-wrp .inputText{
  width: 100%;
  outline: none;
  border:none;
  border-bottom: 1px solid #777;
  box-shadow: none !important;
}
.user-input-wrp .inputText:focus{
  border-color: blue;
  border-width: medium medium 2px;
}
.user-input-wrp .floating-label {
  position: absolute;
  pointer-events: none;
  top: 18px;
  left: 10px;
  transition: 0.2s ease all;
}
.user-input-wrp input:focus ~ .floating-label,
.user-input-wrp input:not(:focus):valid ~ .floating-label{
  top: 0px;
  left: 10px;
  font-size: 13px;
  opacity: 1;
}

</style>
