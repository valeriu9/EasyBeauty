<template>
  <popupTemplate ref='popupOpen'>
    <template #body>
      <div class='user-input-wrapper'>
        <div class='image-upload'>

          <input type='file' accept='image/*' @change='onChange' />
          <div class='image-preview' id='preview'>
            <img v-if='item.imageUrl' :src='item.imageUrl' />
          </div>


        </div>
        <div class='productService-details'>
          <input type='text' class='inputText' required />
          <p class='floating-label'>Product Name</p>
          <br />
          <input type='text' class='inputText' required />
          <p class='floating-label'>Product Description</p>
          <br />
          <input type='text' class='inputText' required />
          <p class='floating-label'>Price</p>
          <br />

          <select class='product-service-type' name='product-service-type'>
            <option value='product'>Product</option>
            <option value='service'>Service</option>
          </select>
        </div>
        <div class='button-container'>
          <button class='save-button'>Save</button>
          <button class='cancel-button'>Cancel</button>
        </div>

      </div>
    </template>
  </popupTemplate>
</template>

<script>

import popupTemplate from '@/components/popupTemplate'

export default {
  name: 'imageUpload',

  mounted() {
    let fontScript = document.createElement('script')
    fontScript.setAttribute('src', 'https://kit.fontawesome.com/52311f6e31.js')
    document.head.appendChild(fontScript)
  },
  components: {
    popupTemplate
  },

  layout: 'default',
  props: {
    enableOverlayClick: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showModal: false,
      item: {
        //...
        image: null,
        imageUrl: null
      }
    }
  },
  beforeDestroy() {
    this.close()
  },
  methods: {
    open() {
      this.$refs.popupOpen.open()
    },
    closeButtonClicked() {
      this.$emit('close-button-clicked')
      this.close()
    },
    close() {
      this.showModal = false
      window.onscroll = function() {
      }
      this.$emit('closed')
    },
    overlayClick() {
      console.log('overlayclijc')
      if (this.enableOverlayClick) {
        this.close()
      }
    },
    onChange(e) {
      const file = e.target.files[0]
      this.image = file
      this.item.imageUrl = URL.createObjectURL(file)
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
