<template>
  <div class="imageContainer">
    <lazy-component>
      <img :src="imageFull" alt="Image of the biography and CV of Loris Olivier" />
    </lazy-component>
  </div>
</template>

<script>
  export default {
    props: {
      imageFull: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

.imageContainer {
  padding: $--spacer--L 0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
  }

  @media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    padding: $--spacer--S $--spacer--XS;
    }
}

</style>