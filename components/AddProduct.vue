<template>
  <PopupTemplate ref='popupOpen'>
    <template #body>
      <div class='user-input-wrapper'>
        <div class='image-upload'>

          <input type='file' accept='image/*' @change='onChange' />
          <div class='image-preview' id='preview'>
            <img v-if='image' :src='image' />
          </div>

        </div>
        <div class='productService-details'>
          <input type='text' class='inputText' v-model="name" required />
          <p class='floating-label'>Product Name</p>
          <br />
          <input type='text' class='inputText' v-model="description" required />
          <p class='floating-label'>Product Description</p>
          <br />
          <input type='number' class='inputText' v-model="price" required />
          <p class='floating-label'>Price</p>
          <br />
          <select class='product-service-type' v-model="type" name='product-service-type'>
            <option value='products'>Product</option>
            <option value='services'>Service</option>
          </select>
          <div v-if="type === 'services'"> <input type='text' class='inputText' v-model="duration" required />
            <p class='floating-label'>Duration</p>
            <br />
          </div>

        </div>
        <div class='button-container'>
          <button class='save-button' @click="saveProduct()">Save</button>
          <button class='cancel-button' @click="close()">Cancel</button>
        </div>
      </div>
    </template>
  </PopupTemplate>
</template>

<script>
export default {
  name: 'imageUpload',

  mounted() {
    let fontScript = document.createElement('script')
    fontScript.setAttribute('src', 'https://kit.fontawesome.com/52311f6e31.js')
    document.head.appendChild(fontScript)
  },
  components: {
    PopupTemplate: () => import('~/components/PopupTemplate')
  },

  layout: 'default',
  props: {
    enableOverlayClick: {
      type: Boolean,
      default: true
    },
    itemToEdit: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    itemToEdit() {
      if (this.itemToEdit.name) {
        this.name = this.itemToEdit.name;
        this.type = this.itemToEdit.type;
        this.description = this.itemToEdit.description;
        this.price = this.itemToEdit.price;
        this.image = this.itemToEdit.image;
        this.duration = this.itemToEdit.duration;
        this.id = this.itemToEdit.id;
      }
    }
  },
  data() {
    return {
      showModal: false,
      image: '',
      name: '',
      image: '',
      description: '',
      price: null,
      type: 'products',
      duration: null,
      id: 0
    }
  },
  beforeDestroy() {
    this.close()
  },
  methods: {
    open() {
      this.$refs.popupOpen.open()
    },
    close() {
      this.$refs.popupOpen.close()
    },
    async saveProduct() {
      if (this.type === 'services' && (this.name === '', this.price === 0, this.image === '', this.duration === 0)) {
        window.alert("Complete all the fields before saving")
        return
      } else if (this.type === 'products' && (this.name === '', this.price === 0, this.image === '')) {
        window.alert("Complete all the fields before saving")
        return
      }
      if (!this.itemToEdit.name) {
        const imgbbUploader = require("imgbb-uploader");
        const options = {
          apiKey: '44be07cc6bc3fb0585b6e9f1b2cce6b6',
          base64string: this.image.replace("data:", "").replace(/^.+,/, "")
        }
        imgbbUploader(options)
          .then((response) => {
            this.image = response.medium.url
            try {
              if (this.type === 'products') {
                this.$emit('openLoader');
                this.$axios.post(`http://easybeauty.somee.com/v1/api/Product`, {
                  name: this.name,
                  description: this.description,
                  price: this.price,
                  image: this.image
                });
                this.$refs.popupOpen.close()
                setTimeout(() => {
                  this.$emit('loadProducts');
                }, 1000);
              } else {
                this.$axios.post(`http://easybeauty.somee.com/v1/api/Service`, {
                  name: this.name,
                  description: this.description,
                  price: this.price,
                  duration: this.duration,
                  image: this.image
                });
                setTimeout(() => {
                  this.$emit('loadServices');
                }, 1000);
              }
            } catch (e) {
              console.log(e);
              this.$emit('closeLoader');
            }
          }).catch((error) => console.error(error),
            this.$emit('closeLoader')
          );
      } else {
        try {
          if (this.type === 'products') {
            this.$emit('openLoader');
            this.$axios.put(`http://easybeauty.somee.com/v1/api/Product/${this.itemToEdit.id}`, {
              name: this.name,
              description: this.description,
              price: this.price,
              image: this.image
            });
            this.$refs.popupOpen.close()
            setTimeout(() => {
              this.$emit('loadProducts');
            }, 1000);
          } else {
            this.$axios.put(`http://easybeauty.somee.com/v1/api/Service/${this.itemToEdit.id}`, {
              name: this.name,
              description: this.description,
              price: this.price,
              duration: this.duration,
              image: this.image
            });
            setTimeout(() => {
              this.$emit('loadServices');
            }, 1000);
          }
        } catch (e) {
          console.log(e);
          this.$emit('closeLoader');
        }
      }
    },
    onChange(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      setTimeout(() => {
        this.image = reader.result
      }, 1000);
    }
  }

}
</script>

<style lang='scss' scoped>
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
  margin: 12px 40px;
  cursor: pointer;
}

.image-upload {
  width: 45%;
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
  background-image: url('assets/images/image-upload.png');
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

.button-container button {
  padding: 5px;
  margin: 0 15px;
  cursor: pointer;
}

.user-input-wrapper {
  position: fixed;
  width: 40%;
}

.user-input-wrapper .inputText {
  width: 100%;
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
</style>
