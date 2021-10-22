<template>
  <div class='normal-window'>
    <div class='employee-popup-window'>
      <div class='edit-employee-navbar'>
        <button class='add-employee-button' type='button' @click='addNewEmployee()'><i class='fas fa-plus'></i>
          <p>Add employee</p>
        </button>
        <div class='search-wrapper'>
          <input name='search' placeholder='Search..' type='text'>
          <button type='submit'><i class='fa fa-search'></i></button>
        </div>
      </div>
      <div class='employee-list-container'>
        <div class='existing-employee'>
          <button class='edit-employee' type='button' @click='editItem()'><i class='far fa-edit'></i></button>
          <button class='delete-employee' type='button' @click='deleteItem()'><i class='far fa-trash-alt'></i>
          </button>
          <div class='employee-details'>
            <p class='employee-name'>Bider nummer 1</p>
            <p class='employee-email'> Bider@kontakt.ru </p>
            <p class='employee-phone'> 43 12 56 78 </p>
            <p class='employee-role'> Employee </p>
          </div>

        </div>
        <div class='existing-employee'>
          <button class='edit-employee' type='button' @click='editItem()'><i class='far fa-edit'></i></button>
          <button class='delete-employee' type='button' @click='deleteItem()'><i class='far fa-trash-alt'></i>
          </button>
          <div class='employee-details'>
            <p class='employee-name'>Bider nummer 1</p>
            <p class='employee-email'> Bider@kontakt.ru </p>
            <p class='employee-phone'> 43 12 56 78 </p>
            <p class='employee-role'> Employee </p>
          </div>
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

.edit-employee-navbar {
  overflow: hidden;
  display: flex;
  justify-content: center;
  height: 15%;
  align-items: center;
}

.employee-popup-window {
  height: 60%;
  background-color: white;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  border-radius: 5px;
  padding: 15px;
  width: 60%;
}

.employee-list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 14px;
  height: 85%;
  overflow-y: auto;
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
}

.delete-employee {
  position: absolute;
  right: 50px;
  display: flex;
  margin: 5px;
  font-size: 14px;
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

.edit-employee-navbar input[type=text] {
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
}
.add-employee-button p {
  margin: 0 10px;
}

</style>
