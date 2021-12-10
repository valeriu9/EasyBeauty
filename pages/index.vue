<template>
  <div class='main-container'>
    <BaseLoader ref='loader' />
    <AddProduct ref='addProductPopup' :itemToEdit='itemToEdit' :enableOverlayClick='true' @loadServices='loadServices'
      @loadProducts='loadProducts' @openLoader='openLoader' @closeLoader='closeLoader' />
    <div class='services-container'>
      <div class='product-service-container'>
        <div class='service-navbar'>
          <button v-if="user.role === 'manager'" class='add-item-button' type='button' @click='openAddProductModal()'>
            <img
              src='~/assets/images/plus-solid.svg'>
            <p>Add new Item</p>
          </button>
          <div class='search-wrapper'>
            <input name='search' id='searchField' :value='searchText' @input='e => searchText = e.target.value'
              placeholder='Search..'
              type='text'>
            <img @click='search()' src='~/assets/images/search-solid.svg'>
          </div>
        </div>
        <div class='items-grid-container'>
          <div v-for='(item, index) in filteredList' :key='index' class='items-grid'>

            <div class='image-container'>
              <button v-if="user.role === 'manager'" class='edit-item-button'
                @click='openAddProductModal(item)'>
                <img
                  src='~/assets/images/edit-regular.svg'>
              </button>
              <button v-if="user.role === 'manager'" class='delete-item-button'
                @click='deleteItem(item, index)'>
                <img
                  src='~/assets/images/trash-solid.svg'>
              </button>
              <img :src='item.image' class='grid-item-pic' @click='addToSaleList(item)'>
            </div>
            <div class='item-container'>
              <p class='grid-item-name'>{{ item.name }}</p>
              <p class='grid-item-description'>{{ item.description }}</p>
              <p v-if='item.duration' class='grid-item-duration'>Duration: {{ item.duration }} min</p>
              <p class='grid-item-price'>{{ item.price }}DKK</p>
            </div>
          </div>
        </div>
      </div>
      <div class='tab'>
        <button id='defaultOpen' class='tablinks'
          @click.prevent='setActive' :class="[isActive ? 'active' : '']"
          @click="switchTab('services')">
          <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='cut'
            class='svg-inline--fa fa-cut fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'>
            <path fill='currentColor'
              d='M278.06 256L444.48 89.57c4.69-4.69 4.69-12.29 0-16.97-32.8-32.8-85.99-32.8-118.79 0L210.18 188.12l-24.86-24.86c4.31-10.92 6.68-22.81 6.68-35.26 0-53.02-42.98-96-96-96S0 74.98 0 128s42.98 96 96 96c4.54 0 8.99-.32 13.36-.93L142.29 256l-32.93 32.93c-4.37-.61-8.83-.93-13.36-.93-53.02 0-96 42.98-96 96s42.98 96 96 96 96-42.98 96-96c0-12.45-2.37-24.34-6.68-35.26l24.86-24.86L325.69 439.4c32.8 32.8 85.99 32.8 118.79 0 4.69-4.68 4.69-12.28 0-16.97L278.06 256zM96 160c-17.64 0-32-14.36-32-32s14.36-32 32-32 32 14.36 32 32-14.36 32-32 32zm0 256c-17.64 0-32-14.36-32-32s14.36-32 32-32 32 14.36 32 32-14.36 32-32 32z'></path>
          </svg>
          <p> Services</p>
        </button>
        <button class='tablinks' @click.prevent='setActive' :class="[!isActive ? 'active' : '']"
          @click="switchTab('products')">
          <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='spray-can'
            class='svg-inline--fa fa-spray-can fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'>
            <path fill='currentColor'
              d='M224 32c0-17.67-14.33-32-32-32h-64c-17.67 0-32 14.33-32 32v96h128V32zm256 96c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32zm-256 32H96c-53.02 0-96 42.98-96 96v224c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32V256c0-53.02-42.98-96-96-96zm-64 256c-44.18 0-80-35.82-80-80s35.82-80 80-80 80 35.82 80 80-35.82 80-80 80zM480 96c17.67 0 32-14.33 32-32s-14.33-32-32-32-32 14.33-32 32 14.33 32 32 32zm-96 32c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32zm-96-96c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32zm96 0c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32zm96 192c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32z'></path>
          </svg>
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
          <div v-for='(item, index) in saleList' :key='index' class='cart-item'>
            <div class='item-name'>
              <img src='~/assets/images/trash-solid.svg' @click='removeItemFromSaleList(index)'>
              <p>{{ item.name }}</p>
            </div>
            <div class='item-quantity'>
              <div id='decrease' class='value-button' value='Decrease Value' @click='decreaseValue(index)'>
                <img
                  src='~/assets/images/minus-solid.svg'>
              </div>
              <input id='number' :value='item.quantity' />
              <div id='increase' class='value-button' value='Increase Value' @click='increaseValue(index)'>
                <img
                  src='~/assets/images/plus-solid.svg'>
              </div>
            </div>
            <p class='item-price'>{{ item.price }} DKK</p>
          </div>
        </div>
        <div class='cart-price-container'>
          <div class='price-wrapper'>
            <p>Discount (%)</p>
            <input name='discount' :value='discount' @input='e => discount = e.target.value' type='number' min='0'
              max='100'>
          </div>
          <div class='price-wrapper'>
            <p>Total without taxes</p>
            <p>{{ totalBeforeTax }}DKK</p>
          </div>
          <div class='price-wrapper'>
            <p>Tax</p>
            <p>{{ taxes }}DKK</p>
          </div>
          <div class='total-price-wrapper'>
            <p class='total-price'>Total </p>
            <p class='total-price-amount'>{{ total }}DKK</p>
          </div>
        </div>
      </div>
      <div class='checkout-buttons'>
        <button class='cancel-order' type='button' @click='resetSalesList()'>
          <p> Cancel Order </p>
        </button>
        <button class='pay-order' type='button' @click='pay()'>
          <p> Pay ({{ total }} DKK) </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseLoader from '@/components/BaseLoader'
import { getCookieDataUnparsed, deleteCookie } from '~/helpers/cookies.js'

export default {

  components: {
    BaseLoader
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    searchText() {
      this.search()
    }
  },
  computed: {
    totalBeforeTax() {
      let result = 0
      this.saleList.forEach(element => {
        result += element.price
      })
      result = result * 0.75
      return result
    },
    taxes() {
      let result = 0
      this.saleList.forEach(element => {
        result += element.price
      })
      result = result * 0.25
      return result
    },
    total() {
      if (this.discount === 0 || this.discount === '') {
        return this.totalBeforeTax + this.taxes
      } else {
        return (this.totalBeforeTax + this.taxes) * (1 - (this.discount / 100))
      }
    }
  },
  data() {
    return {
      productList: [],
      serviceList: [],
      searchText: '',
      activeTab: 'services',
      isActive: true,
      filteredList: [],
      saleList: [],
      discount: null,
      itemToEdit: {},
      user: this.$store.state.user,
      cookie: getCookieDataUnparsed('session')
    }

  },
  layout: 'default',
  methods: {

    setActive() {
      this.isActive = !this.isActive
    },

    openLoader() {
      this.$refs.loader.open()
    },
    closeLoader() {
      this.$refs.loader.close()
    },
    openAddProductModal(item = {}) {
      this.itemToEdit = {}
      this.$refs.addProductPopup.open()
      if (Object.keys(item).length !== 0) {
        item.type = this.activeTab
        this.itemToEdit = item
      }
    },
    closeAddProductModal() {
      this.$refs.addProductPopup.close()
    },

    switchTab(name) {
      if (name === 'services') {
        this.filteredList = this.serviceList
        this.activeTab = 'services'
      }
      if (name === 'products') {
        this.filteredList = this.productList
        this.activeTab = 'products'
      }
    },
    increaseValue(index) {

      const temp = JSON.parse(JSON.stringify(this.saleList))
      temp[index].price = temp[index].price + this.saleList[index].initialPrice
      console.log(temp[index].price + 'and ' + this.saleList[index].initialPrice)
      temp[index].quantity++
      this.saleList = []
      this.saleList = temp
    },
    decreaseValue(index) {
      if (this.saleList[index].quantity !== 1) {
        const temp = JSON.parse(JSON.stringify(this.saleList))
        temp[index].price = temp[index].price - this.saleList[index].initialPrice
        temp[index].quantity--
        this.saleList = []
        this.saleList = temp
      }
    },
    search() {
      if (this.activeTab === 'products') {
        this.filteredList = this.productList.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()))
      }
      if (this.activeTab === 'services') {
        this.filteredList = this.serviceList.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()))
      }
    },
    addToSaleList(item) {
      item.quantity = 1
      item.initialPrice = item.price
      this.saleList.push(item)
    },
    removeItemFromSaleList(index) {
      this.saleList.splice(index, 1)
    },
    async pay() {
      try {
        if (this.total === 0) return
        const res = await this.$axios.post('http://easybeauty.somee.com/v1/api/Payment', {
          'amount': this.total
        })
        if (res.data.error) {
          window.alert(res.data.error)
        } else {
          this.saleList = []
          window.alert(res.data.succes)
        }
      } catch (e) {
        console.log(e)
      }
    },
    resetSalesList() {
      this.saleList = []
    },
    async fetchData() {
      try {
        this.openLoader()
        const services = await this.$axios.get(`http://easybeauty.somee.com/v1/api/Service?cookie=${this.cookie}`)
        this.serviceList = services.data
        const products = await this.$axios.get(`http://easybeauty.somee.com/v1/api/Product?cookie=${this.cookie}`)
        if(products.data.error){
          deleteCookie('easybeauty_user');
          window.location.href = '/login'
        }
        this.productList = products.data
        this.filteredList = this.serviceList
        this.closeLoader()
      } catch (e) {
        console.log(e)
      }
    },
    async loadProducts() {
      try {
        this.filteredList = []
        const products = await this.$axios.get(`http://easybeauty.somee.com/v1/api/Product?cookie=${this.cookie}`)
        this.productList = products.data
        this.filteredList = this.productList
        this.closeLoader()
      } catch (e) {
        console.log(e)
      }
    },
    async loadServices() {
      try {
        this.filteredList = []
        const services = await this.$axios.get(`http://easybeauty.somee.com/v1/api/Service`)
        this.serviceList = services.data
        this.filteredList = this.serviceList
        this.closeLoader()
      } catch (e) {
        console.log(e)
      }
    },
    async deleteItem(item, index) {
      try {
        if (this.activeTab === 'services') {
          await this.$axios.delete(`http://easybeauty.somee.com/v1/api/Service?id=${item.id}&cookie=${this.cookie}`)
          this.serviceList.splice(index, 1)
          this.filteredList = this.serviceList
        }
        if (this.activeTab === 'products') {
          await this.$axios.delete(`http://easybeauty.somee.com/v1/api/Product?id=${item.id}&cookie=${this.cookie}`)
          this.productList.splice(index, 1)
          this.filteredList = this.productList
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
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

.item-container {
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 40%;
}

.services-container {
  width: 70%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  margin: 10px 10px 10px 70px;
}

.checkout-container {
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: 10px 70px 10px 10px;
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
  max-height: 80%;
  background-color: white;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  border-radius: 5px;
  padding: 0 15px;
}

.items-grid-container {
  height: 90%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  max-height: 89%;
}

.items-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 0.8vw;
  margin: 10px;
  position: relative;
  width: 10vw;
  height: 90%;
}

.grid-item-pic {
  border: 2px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  height: 140px;
  width: 130px;
  object-fit: cover;
}

.image-container {
  position: relative;
}

.grid-item-name {
  font-weight: 600;
  width: 85%;
  height: 4vh;
}

.grid-item-description {
  word-wrap: break-word;
  height: 30px;
}

.grid-item-price {
  color: lightseagreen;
  font-weight: 600;
  margin: 10px;
}

.edit-item-button {
  position: absolute;
  left: 0;
  display: flex;
  margin: 5px;
  font-size: 0.8vw;

  img {
    height: 13px;
    cursor: pointer;
  }
}

.delete-item-button {
  position: absolute;
  right: 0;
  display: flex;
  margin: 5px;
  font-size: 0.8vw;
  z-index: 10;

  img {
    height: 13px;
    cursor: pointer;
  }
}

.search-wrapper img {
  border-radius: 100%;
  background: lightseagreen;
  margin: 10px;
  padding: 7px;
  height: 30px;
  cursor: pointer;
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

.add-item-button img {
  height: 20px;
}

.service-navbar input:hover {
  background-color: #ddd;
  color: black;
}

.service-navbar input[type='text'] {
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
  position: relative;
  img {
    height: 12px;
    margin: 0 10px;
    position: absolute;
    left: 0;
    cursor: pointer;
  }
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
  img {
    height: 15px;
  }
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

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
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
  padding: 8px 14px;
  transition: 0.3s;
  font-size: 1vw;
  background-color: white;
  margin: 0 15px;
  color: gray;
  border-radius: 10px;
  border: transparent solid thick;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
}

/* Change background color of buttons on hover */
.tab button:hover {
  color: lightseagreen;
  border: lightseagreen solid thick;
}

/* Create an active/current tablink class */
.tablinks.active {
  color: lightseagreen;
  border: lightseagreen solid thick;
}

.tablinks svg {
  height: 20px;
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
  height: 100%;
  background-color: white;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  border-radius: 5px;
  max-height: 80%;
}

.item-list {
  height: 60%;
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
  padding: 0 50px;
  height: 6vh;
  color: gray;
  align-items: center;
}

.cart-price-container .total-price-wrapper {
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height: 7vh;
}

.cart-price-container .price-wrapper input {
  width: 35px;
  -moz-appearance: textfield;
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

/* width */
::-webkit-scrollbar {
  width: 10px;
  border-radius: 10%;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
