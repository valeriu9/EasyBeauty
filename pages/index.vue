<template>
  <div class="container-background">
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
          <div id="Services" class="tabcontent">
            <h3>Services</h3>

          </div>
          <div id="Products" class="tabcontent">
            <h3>Products</h3>
          </div>
        </div>
        <div class="tab">
          <button class="tablinks" @click="openTab('Services')"> <i
              class="fas fa-cut"></i>
            Services</button>
          <button class="tablinks" @click="openTab('Products')"> <i class="fas fa-spray-can"></i>
            Products</button>
        </div>

      </div>
      <div class="checkout-container">
        <h2>Checkout</h2>
        <div class="cart-container">
          <div class="cart-nav-list-container">
            <div class="cart-nav-wrapper">
              <p>Name</p>
              <p>Quantity</p>
              <p>Price</p>
            </div>
            <p>Product 1 <span class="price">$15</span></p>
            <p>Product 2 <span class="price">$5</span></p>
            <p>Product 3 <span class="price">$8</span></p>
            <p>Product 4 <span class="price">$2</span></p>
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
  </div>
</template>

<script>
export default {
  layout: 'default',
  methods:{
   openTab( serviceName) {
   const tabcontent = document.getElementsByClassName("tabcontent")[0];
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
   const tablinks = document.getElementsByClassName("tablinks")[0];
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(serviceName).style.display = "block";
    // evt.currentTarget.className += " active";
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
    height: 100%;
    background-color: lightblue;
}

.services-container {
    box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
    width: 70%;
    margin: 10px;
    display: flex;
    flex-direction: column;
    background-color: white;
}

.checkout-container {
    box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
    width: 30%;
    display: flex;
    flex-direction: column;
    margin: 10px;
    background-color: white;
}

.service-navbar {
    overflow: hidden;
    display: flex;
    justify-content: center;
}

.product-service-container {
    height: 100%;
}

.search-wrapper button {
    border-radius: 100%;
    background: lightseagreen;
}


.service-navbar .search-wrapper {
    margin: auto;
    align-items: center;
    display: flex;
}

.service-navbar .add-item-button {
    margin: auto;
    align-items: center;
    display: flex;
    color: lightseagreen;
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


/* Style the tab */
.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

/* Style the buttons inside the tab */
.tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
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
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.cart-nav-wrapper {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    border: 1px solid lightgrey;
    background-color: #f2f2f2;
}

.cart-nav-wrapper p {
    margin: 5px;
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
