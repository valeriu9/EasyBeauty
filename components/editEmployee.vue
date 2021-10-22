<template>
  <div class="normal-window">
  <div class="employee-popup-window">
    <div class="edit-employee-navbar">
      <button class="add-employee-button" type="button" @click="addNewEmployee()"><i class="fas fa-plus"></i>
        <p>Add employee</p>
      </button>
      <div class="search-wrapper">
        <input name="search" placeholder="Search.." type="text">
        <button type="submit"><i class="fa fa-search"></i></button>
      </div>
    </div>
    <div class="employee-list-container">
      <div class="existing-employee">
        <button class="edit-employee" type="button" @click="editItem()"><i class="far fa-edit"></i></button>
        <button class="delete-employee" type="button" @click="deleteItem()"><i class="far fa-trash-alt"></i>
        </button>
        <p class="employee-name">Bider nummer 1</p>
        <p class="employee-role"> Employee </p>
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

.normal-window{
  width: 100%;
  height: 100%;
  position: absolute;
  border: 2px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}
.edit-employee-navbar{
  overflow: hidden;
  display: flex;
  justify-content: center;
  height: 7%;
  align-items: center;
}

.employee-popup-window{
  height: 60%;
  background-color: white;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  border-radius: 5px;
  padding: 15px;
  width: 60%;
}

.employee-list-container{
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 14px;
  height: 90%;
}
.existing-employee {
  height: 10%;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  margin: 10px 0;
  border-bottom: 2px solid darkgray;
}

.employee-name {
  font-weight: 600;
  margin: 12px;
}

.edit-employee {
  position: absolute;
  right: 10px;
  display: flex;
  margin: 5px;
  font-size: 0.8vw;
}

.delete-employee {
  position: absolute;
  right: 50px;
  display: flex;
  margin: 5px;
  font-size: 0.8vw;
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
  padding: 6px;
  font-size: 17px;
  border: none;
  border-radius: 25%;
  background-color: lightgrey;
  text-align: center;
  width: 22vw;
  height: 16px;
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

</style>
