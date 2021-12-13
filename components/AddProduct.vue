<template>
  <PopupTemplate ref="popupOpen">
    <template #body>
      <div class="user-input-wrapper">
        <div class="image-upload">
          <div class="image-preview" id="preview">
            <input type="file" accept="image/jpeg, image/png" @change="onChange" />
            <img v-if="image" :src="image" />
          </div>
        </div>
        <div class="productService-details">
          <input type="text" class="inputText" v-model="name" required maxlength="25" />
          <p class="floating-label">Product Name</p>
          <br />
          <input type="text" class="inputText" v-model="description" required maxlength="40" />
          <p class="floating-label">Product Description</p>
          <br />
          <div class="product-price">
            <span class="currency-input">
              <input type="number" class="inputText" v-model="price" required />
              <p class="floating-label">Price </p>
            </span>
          </div>
          <br />
          <div v-if="activeTab === 'services'">
            <input type="text" class="inputText" v-model="duration" required />
            <p class="floating-label">Duration</p>
            <br />
          </div>
        </div>
        <div class="button-container">
          <button class="save-button" @click="saveProduct()">Save</button>
          <button class="cancel-button" @click="close()">Cancel</button>
        </div>
      </div>
    </template>
  </PopupTemplate>
</template>

<script>
import { getCookieDataUnparsed } from '~/helpers/cookies.js';

export default {
  components: {
    PopupTemplate: () => import('@/components/PopupTemplate')
  },

  layout: 'default',
  props: {
    itemToEdit: {
      type: Object,
      default: () => {
      }
    },
    activeTab: {
      type: String,
      default: 'Service'
    }
  },
  data () {
    return {
      image: '',
      name: '',
      description: '',
      price: null,
      duration: null,
      id: 0,
      cookie: getCookieDataUnparsed('session')
    };
  },
  watch: {
    itemToEdit () {
      this.name = this.itemToEdit.name;
      this.type = this.itemToEdit.type;
      this.description = this.itemToEdit.description;
      this.price = this.itemToEdit.price;
      this.image = this.itemToEdit.image;
      this.duration = this.itemToEdit.duration;
      this.id = this.itemToEdit.id;
    }
  },
  methods: {
    open () {
      this.$refs.popupOpen.open();
    },
    close () {
      this.$emit('closed');
      this.$refs.popupOpen.close();
    },
    saveProduct () {
      if (this.activeTab === 'services' && (this.name === '', this.price === 0, this.image === '', this.duration === 0)) {
        window.alert('Complete all the fields before saving');
        return;
      } else if (this.activeTab === 'products' && (this.name === '', this.price === 0, this.image === '')) {
        window.alert('Complete all the fields before saving');
        return;
      }
      if (!this.itemToEdit.name) {
        const imgbbUploader = require('imgbb-uploader');
        const options = {
          apiKey: '44be07cc6bc3fb0585b6e9f1b2cce6b6',
          base64string: this.image.replace('data:', '').replace(/^.+,/, '')
        };
        imgbbUploader(options)
          .then((response) => {
            this.image = response.image.url;
            try {
              this.$emit('openLoader');
              if (this.activeTab === 'products') {
                this.$axios.post(`//easybeauty.somee.com/v1/api/Product?cookie=${this.cookie}`, {
                  name: this.name,
                  description: this.description,
                  price: this.price,
                  image: this.image
                });
                this.close();
                setTimeout(() => {
                  this.$emit('loadProducts');
                }, 1000);
              } else {
                this.$axios.post(`//easybeauty.somee.com/v1/api/Service?cookie=${this.cookie}`, {
                  name: this.name,
                  description: this.description,
                  price: this.price,
                  duration: this.duration,
                  image: this.image
                });
                this.close();
                setTimeout(() => {
                  this.$emit('loadServices');
                }, 1000);
              }
            } catch (e) {
              console.log(e);
            }
          }).catch(error => console.error(error)
          );
      } else {
        try {
          this.$emit('openLoader');
          if (this.activeTab === 'products') {
            this.$axios.put(`//easybeauty.somee.com/v1/api/Product?id=${this.itemToEdit.id}&cookie=${this.cookie}`, {
              name: this.name,
              description: this.description,
              price: this.price,
              image: this.image
            });
            this.close();
            setTimeout(() => {
              this.$emit('loadProducts');
            }, 1000);
          } else {
            this.$axios.put(`//easybeauty.somee.com/v1/api/Service?id=${this.itemToEdit.id}&cookie=${this.cookie}`, {
              name: this.name,
              description: this.description,
              price: this.price,
              duration: this.duration,
              image: this.image
            });
            this.close();
            setTimeout(() => {
              this.$emit('loadServices');
            }, 1000);
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    onChange (e) {
      document.getElementById('preview').style.backgroundImage = 'none';
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setTimeout(() => {
        this.image = reader.result;
      }, 1000);
    }
  }

};
</script>

<style lang='scss' scoped>
input[type="file"] {
  opacity: 0;
  cursor: pointer;
}

.save-button {
  cursor: pointer;
  padding: 10px;
  transition: 0.3s;
  font-size: 17px;
  background-color: lightseagreen;
  margin: 0 15px;
  border: none;
  color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%), 0 0 10px 0 rgb(0 0 0 / 10%) !important;
  width: 14vw;
}

.cancel-button {
  cursor: pointer;
  padding: 10px;
  transition: 0.3s;
  font-size: 17px;
  margin: 0 15px;
  border-radius: 10px;
  width: 14vw;
  background-color: rgba(255, 255, 255, 0.5);
  border: darkred solid medium;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%), 0 0 10px 0 rgb(0 0 0 / 10%) !important;
  color: darkred;
}

.currency-input:after {
  position: absolute;
  left: 60px;
  top: 38%;
  font-size: 13px;
  content: "DKK";
}

.productService-details {
  width: 50%;
  right: 25px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
}

.product-service-type {
  cursor: pointer;
  padding: 10px;
  transition: 0.3s;
  font-size: 13px;
  border-radius: 10px;
  width: 70%;
  background-color: rgba(255, 255, 255, 1);
  border: lightseagreen solid thin;
}

.product-price {
  position: relative;
  width: min-content;
  min-width: 50px;
}

.product-price .inputText {
  width: 100%;
}

.image-upload {
  width: 40%;
  position: fixed;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image-preview {
  height: 55%;
  justify-content: center;
  display: flex;
  background-image: url("assets/images/image-upload.png");
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
}

.image-preview img {
  height: 100%;
}

.button-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.user-input-wrapper {
  position: fixed;
  width: 40%;
}

.user-input-wrapper .inputText {
  padding-left: 10px;
  outline: none;
  border: none;
  border-bottom: 1px solid #777;
  box-shadow: none !important;
  margin-top: 20px;
}

.user-input-wrapper .inputText:focus {
  border-width: medium medium 2px;
}

.user-input-wrapper .floating-label {
  position: relative;
  pointer-events: none;
  left: 10px;
  transition: 0.2s ease all;
  top: -20px;
  color: lightgray;
}

.user-input-wrapper input:focus + .floating-label,
.user-input-wrapper input:not(:focus):valid + .floating-label {
  top: -35px;
  left: 10px;
  font-size: 13px;
  opacity: 1;
  color: #6a6a6a;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
