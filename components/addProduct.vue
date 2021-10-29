<template>
  <div class='normal-window'>
    <div class='productService-popup-window'>
      <div class='user-input-wrapper'>
        <div class="image-upload">

          <input type="file" accept="image/*" @change="onChange" />
          <div class="image-preview" id="preview">
            <img v-if="item.imageUrl" :src="item.imageUrl" />
          </div>


        </div>
        <div class="productService-details">
          <input type="text" class="inputText" required/>
          <p class="floating-label">Product Name</p>
          <br/>
          <input type="text" class="inputText" required/>
          <p class="floating-label">Product Description</p>
          <br/>
          <input type="text" class="inputText" required/>
          <p class="floating-label">Price</p>
          <br/>

          <select class="product-service-type" name='product-service-type'>
            <option value='product'>Product</option>
            <option value='service'>Service</option>
          </select>
        </div>
        <div class="button-container">
          <button class="save-button">Save</button>
          <button class="cancel-button">Cancel</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'imageUpload',
  data() {
    return {
      item:{
        //...
        image : null,
        imageUrl: null
      }
    }
  },
  methods: {
    onChange(e) {
      const file = e.target.files[0]
      this.image = file
      this.item.imageUrl = URL.createObjectURL(file)
    }
  },



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


.productService-popup-window{
  height: 50%;
  background-color: white;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  border-radius: 5px;
  padding: 15px;
  width: 80%;
  display: flex;
  justify-content: center;
}

.productService-details{
  width: 50%;
  right: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
}
.product-service-type{
  margin: 12px 40px;
}
.image-upload{
  left: 0;
  width: 40%;
  position: absolute;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.image-preview{
  height: 100%;
  justify-content: center;
  display: flex;

}
.image-preview img{
  height: 100%;
}

.button-container {
  position: absolute;
  bottom: 0;
  right: 0;
}
.button-container button{
  padding: 5px;
  margin: 0 15px;
}

.user-input-wrapper {
  position: relative;
  width: 100%;

}
.user-input-wrapper .inputText{
  width: 100%;
  outline: none;
  border:none;
  border-bottom: 1px solid #777;
  box-shadow: none !important;
}
.user-input-wrapper .inputText:focus{
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
.user-input-wrapper input:not(:focus):valid + .floating-label{
  top: -35px;
  left: 10px;
  font-size: 13px;
  opacity: 1;
  color: #6a6a6a;
}
{

}

</style>
