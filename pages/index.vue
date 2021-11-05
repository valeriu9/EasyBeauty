<template>
  <div class='main-container'>
    <addProduct ref='addProductPopup' :enableOverlayClick='true' />
    <div class='services-container'>

      <div class='product-service-container'>
        <div class='service-navbar'>
          <button class='add-item-button' type='button' @click='openAddProductModal()'><i class='fas fa-plus'></i>
            <p>Add new Item</p>
          </button>
          <div class='search-wrapper'>
            <input name='search' :value='searchText' @input='e => searchText = e.target.value' placeholder='Search..'
                   type='text'>
            <button type='submit' @click='search()'><i class='fa fa-search'></i></button>
          </div>
        </div>
        <div class='items-grid-container'>
          <div v-for='(product, index) in filteredList' :key='index' @click='addToSaleList(product)' class='items-grid'>

            <div class='image-container'>
              <button class='edit-item-button' type='button' @click='openAddProductModal()'><i class='far fa-edit'></i>
              </button>
              <button class='delete-item-button' type='button' @click='deleteItem()'><i class='far fa-trash-alt'></i>
              </button>
              <img :src='product.image' class='grid-item-pic' />

            </div>
            <p class='grid-item-name'>{{ product.name }}</p>
            <p class='grid-item-description'>{{ product.description }}</p>
            <p class='grid-item-price'>{{ product.price }}DKK</p>

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
        <button id='defaultOpen' class='tablinks' @click="switchTab('services')"><i
          class='fas fa-cut'></i>
          <p> Services</p>
        </button>
        <button class='tablinks' @click="switchTab('products')"><i class='fas fa-spray-can'></i>
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
              <i class='far fa-trash-alt' @click='removeItemFromSaleList(index)'></i>
              <p>{{ item.name }}</p>
            </div>
            <div class='item-quantity'>
              <div id='decrease' class='value-button' value='Decrease Value' @click='decreaseValue(index)'>
                <i class='fas fa-minus'></i>
              </div>
              <input id='number' :value='item.quantity' />
              <div id='increase' class='value-button' value='Increase Value' @click='increaseValue(index)'>
                <i class='fas fa-plus'></i>
              </div>
            </div>
            <p class='item-price'>{{ item.price }} DKK</p>
          </div>
        </div>
        <div class='cart-price-container'>
          <div class='price-wrapper'>
            <p>Discount (%)</p>
            <input name='discount' :value='discount' type='text'>
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
  computed: {
    totalBeforeTax() {
      let result = 0
      this.saleList.forEach(element => {
        result += element.price
      })
    }
  },
  data() {
    const productList = [
      {
        name: 'Shampoo 200 ml',
        quantity: 1,
        price: 300,
        description: 'very good shampoo 2',
        image: 'https://www.plaineproducts.com/wp-content/uploads/shampoo-unscented-nopump-2-980x1176.jpg'
      },
      {
        name: 'Shampoo 300 ml',
        quantity: 1,
        price: 400,
        description: 'very good shampoo 3',
        image: 'https://www.dove.com/content/dam/unilever/dove/canada/pack_shot/055086607414.01a-36885116-png.png'
      },
      {
        name: 'Shampoo 400 ml',
        quantity: 1,
        price: 500,
        description: 'very good shampoo 4',
        image: 'https://www.costco.co.uk/medias/sys_master/images/he1/h5a/34867981549598.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      },
      {
        name: 'Shampoo 500 ml',
        quantity: 1,
        price: 600,
        description: 'very good shampoo 5',
        image: 'https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/67543-kefir-shampoo-12oz.jpg'
      }
    ]
    const serviceList = [
      {
        name: 'Men haircut',
        quantity: 1,
        price: 150,
        description: 'good haircut',
        duration: 100,
        image: 'https://content.latest-hairstyles.com/wp-content/uploads/crew-cut-for-men-500x333.jpg'
      },
      {
        name: 'Women haircut',
        quantity: 1,
        price: 120,
        description: 'bad haircut',
        duration: 100,
        image: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Short_Mohawk.jpg'
      },
      {
        name: 'Bi haircut',
        quantity: 1,
        price: 190,
        description: 'disaster haircut',
        duration: 100,
        image: 'https://images.squarespace-cdn.com/content/v1/54faf78ce4b04da0abdfbde8/1582586946018-F0YNS10YTQIEVV3K0XAB/Mohawk-Bob-00.jpg'
      },
      {
        name: 'Lisbi haircut',
        quantity: 1,
        price: 160,
        description: 'curly haircut',
        duration: 100,
        image: 'https://content.latest-hairstyles.com/wp-content/uploads/crew-cut-for-men-500x333.jpg'
      },
      {
        name: 'Gey haircut',
        quantity: 1,
        price: 250,
        description: 'fade haircut',
        duration: 100,
        image: 'https://media.allure.com/photos/601c13ffedaf93560a6d5a2a/1:1/w_2558,h_2558,c_limit/kaia-gerber-swoop-bob.jpg'
      },
      {
        name: 'Question haircut',
        quantity: 1,
        price: 450,
        description: 'bold haircut',
        duration: 100,
        image: 'https://content.latest-hairstyles.com/wp-content/uploads/crew-cut-for-men-500x333.jpg'
      },
      {
        name: 'NonBi haircut',
        quantity: 1,
        price: 550,
        description: 'Nicky Minaj haircut',
        duration: 100,
        image: 'https://guardian.ng/wp-content/uploads/2020/11/Different-hairstyles-for-your-baby-girls.-Photo-Pinterest-640x360.jpg'
      }
    ]
    const filteredList = productList
    return { productList, serviceList, searchText: '', activeTab: 'products', filteredList, saleList: [], discount: 0 }
  },
  layout: 'default',
  methods: {

    openAddProductModal() {
      this.$refs.addProductPopup.open()
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
      temp[index].price = temp[index].price + this.saleList[index].price
      temp[index].quantity++
      this.saleList = []
      this.saleList = temp
    },
    decreaseValue(index) {
      if (this.saleList[index].quantity !== 1) {
        const temp = JSON.parse(JSON.stringify(this.saleList))
        if (temp[index].quantity !== 2) {
          console.log((temp[index].price / (temp[index].quantity + 1)) + 'if')
          temp[index].price = temp[index].price - (temp[index].price / temp[index].quantity)
        } else {
          console.log(temp[index].price / (temp[index].quantity + 1) + 'in else')
          temp[index].price = temp[index].price / temp[index].quantity
        }
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
      this.saleList.push(item)
    },
    removeItemFromSaleList(index) {
      console.log(index)
      this.saleList.splice(index, 1)
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
  height: 89%;
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
  padding: 5px;
  height: 120px;
  width: 120px;
  object-fit: cover;
}

.image-container {
  position: relative;
}

.grid-item-name {
  font-weight: 600;
  margin: 10px;
}

.grid-item-price {
  color: lightseagreen;
  font-weight: 600;
  margin: 4px;
}

.edit-item-button {
  position: absolute;
  left: 0;
  display: flex;
  margin: 5px;
  font-size: 0.8vw;
}

.delete-item-button {
  position: absolute;
  right: 0;
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
  height: 25vw;
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
