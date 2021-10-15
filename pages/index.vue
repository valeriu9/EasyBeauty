<template>
  <div class="main-container">

    <div class="services-container">

      <div class="product-service-container">
        <div class="service-navbar">
          <button class="add-item-button" type="button" onclick="addNewItem()"><i class="fas fa-plus"></i>
            <p>Add new Item</p>
          </button>
          <div class="search-wrapper">
            <input type="text" placeholder="Search.." name="search">
            <button type="submit"><i class="fa fa-search"></i></button>
          </div>
        </div>
        <div class="items-grid-container">
          <div class="items-grid">
            <img class="grid-item-pic" :src="image" />
            <p class="grid-item-name"> Amazing Coffee</p>
            <p class="grid-item-price">20.49 DKK</p>

          </div>
        </div>

        <div id="Services" class="tabcontent">
          <h3>Services</h3>

        </div>
        <div id="Products" class="tabcontent">
          <h3>Products</h3>
        </div>
      </div>
      <div class="tab">
        <button class="tablinks" @click="openTab('Services')" id="defaultOpen"><i
          class="fas fa-cut"></i>
          <p> Services</p>
        </button>
        <button class="tablinks" @click="openTab('Products')"><i class="fas fa-spray-can"></i>
          <p>
            Products
          </p>
        </button>
      </div>

    </div>
    <div class="checkout-container">
      <h2>Checkout</h2>
      <div class="cart-container">
        <div class="cart-nav-list-container">
          <div class="cart-nav-wrapper">
            <p class="cart-item-name">Name</p>
            <p class="cart-item-quantity">Quantity</p>
            <p class="cart-item-price">Price</p>
          </div>

          <div class="cart-item">
            <div class="item-name">
              <i class="far fa-trash-alt"></i>
              <p>Moroccan Oil Moisture Repair Shampoo - 1000 ml</p>

            </div>
            <div class="item-quantity">
              <div class="value-button" id="decrease" @click="decreaseValue()" value="Decrease Value">
                <p> - </p>
              </div>
              <input id="number" value="1"/>
              <div class="value-button" id="increase" @click="increaseValue()" value="Increase Value">
                <p> + </p>
              </div>
            </div>
            <p class="item-price">549,00 DKK</p>

          </div>
        </div>
        <div class="cart-price-container">
          <div class="price-wrapper">
            <p>Discount (%)</p>
            <input type="text" name="discount">
          </div>
          <div class="price-wrapper">
            <p>Sub Total</p>
            <p>100dkk</p>
          </div>
          <div class="price-wrapper">
            <p>Tax</p>
            <p>100dkk</p>
          </div>
          <div class="total-price-wrapper">
            <p>Total </p>
            <p>200dkk</p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import image from "~/assets/images/coffee.jpg"

export default {

  data: function () {
    return {
      image: image
    }
  },

  mounted() {
    let fontScript = document.createElement('script')
    fontScript.setAttribute('src', 'https://kit.fontawesome.com/52311f6e31.js')
    document.head.appendChild(fontScript)
  },

  layout: 'default',
  methods: {
    openTab(evt, serviceName) {
      const tabcontent = document.getElementsByClassName("tabcontent")[0];
      for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      const tablinks = document.getElementsByClassName("tablinks")[0];
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(serviceName).style.display = "block";
      evt.currentTarget.className += " active";
    },
    increaseValue() {
      var value = parseInt(document.getElementById('number').value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      document.getElementById('number').value = value;
    },

    decreaseValue() {
      var value = parseInt(document.getElementById('number').value, 10);
      value = isNaN(value) ? 0 : value;
      value < 1 ? value = 1 : '';
      value--;
      document.getElementById('number').value = value;
    }
  }
}
</script>

<style lang="css" scoped>
.fa {
  color: white;
  line-height: 1.4;
}

body {
  font-family: Arial;
}

.main-container {
  display: flex;
  flex-direction: row;
  height: 90%;
  background-color: lightblue;
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
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: 10px;
  background-color: white;
  padding: 20px 0;
}

.service-navbar {
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.product-service-container {
  height: 100%;
  background-color: white;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  border-radius: 5px;
  padding: 15px;
}

.items-grid {
  display: flex;
  flex-direction: column;
  width: 15%;
  align-items: center;
}
.grid-item-pic {
  border: 3px solid lightgray;
}
.grid-item-name {
  font-weight: 600;
  margin: 12px;
}
.grid-item-price {
  color: lightseagreen;
  font-weight: 600;
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
  width: 30%;
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
  width: 80%;
  height: 40px;
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

.service-navbar button:hover {
  background: #ccc;
}

.cart-item {
  display: flex;
  justify-content: center;
  height: 5vw;
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
  color: gray;
}

.value-button {
  width: 25px;
  text-align: center;
  box-shadow: 2px 2px 7px 0px rgba(0, 0, 0, 0.3);

  border: 4px solid green;
}

#decrease {
  border-radius: 100%;
}

#increase {
  border-radius: 100%;
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
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


/* Style the tab */
.tab {
  height: 100px;
  text-align: center;
  margin: 20px 0;
}

/* Style the buttons inside the tab */
.tab button {
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
  background-color: white;
  margin: 0px 15px;
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

.topright:hover {
  color: red;
}

.checkout-container h2 {
  text-align: center;
}


.cart-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cart-nav-wrapper {
  display: flex;
  text-align: center;
  border: 1px solid lightgrey;
  background-color: #f2f2f2;
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

span.price {
  float: right;
  color: grey;
}

.cart-nav-list-container {
  flex: 1;
}

.cart-price-container .price-wrapper {
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  padding: 0 15px;
}

.cart-price-container .total-price-wrapper {
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}

.cart-price-container .price-wrapper input {
  width: 20px;
}
</style>
