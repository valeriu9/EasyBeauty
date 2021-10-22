<template>
  <div class='main-container'>

    <div class='services-container'>

      <div class='product-service-container'>
        <div class='service-navbar'>
          <button class='add-item-button' type='button' @click='addNewItem()'><i class='fas fa-plus'></i>
            <p>Add new Item</p>
          </button>
          <div class='search-wrapper'>
            <input name='search' placeholder='Search..' type='text'>
            <button type='submit'><i class='fa fa-search'></i></button>
          </div>
        </div>
        <div class='items-grid-container'>
          <div v-for='index in 20' :key='index' class='items-grid'>
            <button class='edit-item-button' type='button' @click='editItem()'><i class='far fa-edit'></i></button>
            <button class='delete-item-button' type='button' @click='deleteItem()'><i class='far fa-trash-alt'></i>
            </button>
            <img src='~/assets/images/coffee.jpg' class='grid-item-pic' />
            <p class='grid-item-name'> Amazing Coffee</p>
            <p class='grid-item-description'> The best coffee coming from mother russian with a slight taste of vodka and sweat</p>
            <p class='grid-item-price'>20.49 DKK</p>

          </div>
        </div>

        <div id='Services' class='tabcontent'>
          <h3>Services</h3>
        </div>
        <div id='Products' class='tabcontent'>
          <h3>Products</h3>
        </div>
      </div>
      <div class='tab'>
        <button id='defaultOpen' class='tablinks' @click="openTab('Services')"><i
          class='fas fa-cut'></i>
          <p> Services</p>
        </button>
        <button class='tablinks' @click="openTab('Products')"><i class='fas fa-spray-can'></i>
          <p>
            Products
          </p>
        </button>
      </div>
    </div>
    <div class='checkout-container'>

      <div class='cart-container'>
        <div class='cart-item-nav'>
          <h2>Checkout</h2>
          <div class='cart-nav-wrapper'>
            <p class='cart-item-name'>Name</p>
            <p class='cart-item-quantity'>Quantity</p>
            <p class='cart-item-price'>Price</p>
          </div>
        </div>
        <div class='item-list'>
          <div v-for='index in 20' :key='index' class='cart-item'>
            <div class='item-name'>
              <i class='far fa-trash-alt'></i>
              <p>Moroccan Oil Moisture Repair Shampoo - 1000 ml</p>
            </div>
            <div class='item-quantity'>
              <div id='decrease' class='value-button' value='Decrease Value' @click='decreaseValue()'>
                <i class='fas fa-minus'></i>
              </div>
              <input id='number' value='1' />
              <div id='increase' class='value-button' value='Increase Value' @click='increaseValue()'>
                <i class='fas fa-plus'></i>
              </div>
            </div>
            <p class='item-price'>549,00 DKK</p>
          </div>
        </div>
        <div class='cart-price-container'>
          <div class='price-wrapper'>
            <p>Discount (%)</p>
            <input name='discount' type='text'>
          </div>
          <div class='price-wrapper'>
            <p>Sub Total</p>
            <p>100dkk</p>
          </div>
          <div class='price-wrapper'>
            <p>Tax</p>
            <p>100dkk</p>
          </div>
          <div class='total-price-wrapper'>
            <p class='total-price'>Total </p>
            <p class='total-price-amount'>200dkk</p>

          </div>
        </div>

      </div>
      <div class='checkout-buttons'>
        <button class='cancel-order' type='button' @click='addNewItem()'>
          <p> Cancel Order </p>
        </button>
        <button class='pay-order' type='button' @click='addNewItem()'>
          <p> Pay (100 DKK) </p>
        </button>

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

  layout: 'default',
  methods: {
    openTab(evt, serviceName) {
      const tabcontent = document.getElementsByClassName('tabcontent')[0]
      for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none'
      }
      const tablinks = document.getElementsByClassName('tablinks')[0]
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '')
      }
      document.getElementById(serviceName).style.display = 'block'
      evt.currentTarget.className += ' active'
    },
    increaseValue() {
      var value = parseInt(document.getElementById('number').value, 10)
      value = isNaN(value) ? 0 : value
      value++
      document.getElementById('number').value = value
    },

    decreaseValue() {
      var value = parseInt(document.getElementById('number').value, 10)
      value = isNaN(value) ? 0 : value
      value < 1 ? value = 1 : ''
      value--
      document.getElementById('number').value = value
    }
  }
}
</script>

<style lang='css' scoped>
.fa {
  color: white;
  line-height: 1.4;
}

.main-container {
  display: flex;
  flex-direction: row;
  height: calc(100% - 80px);
  background-color: #d2f0fb;
  width: 100%;
  position: fixed;
}

.services-container {
  width: 70%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  background-color: transparent;
}

.checkout-container {
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.service-navbar {
  overflow: hidden;
  display: flex;
  justify-content: center;
  height: 10%;
  align-items: center;
}

.product-service-container {
  height: 100%;
  background-color: white;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  border-radius: 5px;
  padding: 0 15px;
}

.items-grid-container {
  height: 69vh;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
}

.items-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 0.8vw;
  margin: 10px;
  position: relative;
}

.grid-item-pic {
  border: 2px solid lightgray;
  border-radius: 5px;
}

.grid-item-name {
  font-weight: 600;
  margin: 10px;
}
.grid-item-description {
}

.grid-item-price {
  color: lightseagreen;
  font-weight: 600;
  margin: 4px;
}

.edit-item-button {
  position: absolute;
  align-self: start;
  display: flex;
  margin: 5px;
  font-size: 0.8vw;
}

.delete-item-button {
  position: absolute;
  align-self: end;
  display: flex;
  margin: 5px;
  font-size: 0.8vw;
}

.search-wrapper button {
  border-radius: 100%;
  background: lightseagreen;
  margin: 10px;
}


.service-navbar .search-wrapper {
  margin-left: auto;
  align-items: center;
  display: flex;
  width: 40%;
}

.service-navbar .add-item-button {
  margin-right: auto;
  align-items: center;
  display: flex;
  color: lightseagreen;
  background-color: transparent;
}


.service-navbar input:hover {
  background-color: #ddd;
  color: black;
}

.service-navbar input[type=text] {
  padding: 6px;
  font-size: 17px;
  border: none;
  border-radius: 50px;
  background-color: lightgrey;
  text-align: center;
  width: 20vw;
  height: 35px;
  color: gray;
}

.service-navbar button {
  padding: 6px 10px;
  font-size: 17px;
  border: none;
  cursor: pointer;
}

.service-navbar button p {
  margin: 10px 20px;
}

.cart-item {
  display: flex;
  justify-content: center;
  height: 50px;
  font-size: 0.8vw;
  border-bottom: lightgray solid thin;
}

.item-name {
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
}

.item-name i {
  margin: 0 10px;

}

.item-price {
  text-align: center;
  width: 30%;
  margin: auto;
  color: gray;
}

.item-quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  color: lightseagreen;
  font-size: 0.8vw;
}


.value-button {
  width: 25px;
  text-align: center;
}

#decrease i {
  border: 3px solid lightseagreen;
  border-radius: 100%;
  box-shadow: 2px 2px 7px 0 rgba(0, 0, 0, 0.3);
  padding: 2px;
}

#increase > i {
  border: 3px solid lightseagreen;
  border-radius: 100%;
  box-shadow: 2px 2px 7px 0 rgba(0, 0, 0, 0.3);
  padding: 2px;
}

.value-button:hover {
  cursor: pointer;
}

input#number {
  text-align: center;
  border: none;
  width: 20px;
  background-color: transparent;
  color: gray;
  font-size: 0.8vw;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


/* Style the tab */
.tab {
  height: 145px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Style the buttons inside the tab */
.tab button {
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 1vw;
  background-color: white;
  margin: 0 15px;
  border: none;
  color: gray;
  border-radius: 10px;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
}

/* Change background color of buttons on hover */
.tab button:hover {
  color: lightseagreen;
  border: lightseagreen solid thick;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 12px;
  border: 1px solid #ccc;
  height: 85%;
}

.checkout-container h2 {
  text-align: center;
  font-size: 1.5vw;
  margin: 12px 0;
}

.cart-container {
  display: flex;
  flex-direction: column;
  height: 89%;
  background-color: white;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  border-radius: 5px;
}

.item-list {
  height: 35vw;
  overflow-y: scroll;
}

.cart-nav-wrapper {
  display: flex;
  text-align: center;
  background-color: #f2f2f2;
  font-size: 0.8vw;
  color: darkgray;
  font-weight: 600;
  height: 30px;
  align-items: center;
}

.cart-nav-wrapper p {
  margin: 5px;
}

.cart-item-name {
  width: 45%;
}

.cart-item-quantity {
  width: 25%;
}

.cart-item-price {
  width: 30%;
}

.cart-price-container {
  height: 30%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.cart-price-container .price-wrapper {
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
  padding: 15px;
  height: 50px;
  color: gray;
}

.cart-price-container .total-price-wrapper {
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin: auto 0;
}

.cart-price-container .price-wrapper input {
  width: 20px;
}

.checkout-buttons {
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 145px;
  text-align: center;
}

.cancel-order {
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 15px;
  color: darkred;
  border-radius: 10px;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  border: darkred solid medium;
  font-size: 16px;
  width: 10vw;

}

.pay-order {
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
  background-color: lightseagreen;
  margin: 0 15px;
  border: none;
  color: white;
  border-radius: 10px;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  width: 14vw;
}

</style>
