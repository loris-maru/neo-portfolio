<template>
  <div class="imageContainerCore" ref="imgContainer">
    <img draggable="false" :src="imgHero" alt="Image Hero" ref="imgCoreContent" />
  </div>
</template>

<script>
import {TimelineLite} from 'gsap'

  export default {
    props: {
      imgHero: {
        type: Object,
        required: true
      }
    },
    methods: {
      animateImage(value, speed = 0.3) {
        const {imgCoreContent} = this.$refs
        const timeline = new TimelineLite()
        timeline.to(imgCoreContent, speed, value)
      },
      animateContainer(value, speed = 0.3) {
        const {imgContainer} = this.$refs
        const timeline = new TimelineLite()
        timeline.to(imgContainer, speed, value)
      }
    }
    
  }
</script>

<style lang="scss" scoped>

  .imageContainerCore {
    // overflow: hidden;
    width: auto;
    height: 100vh;
    pointer-events: none;
    img {
      position: relative;
      top: 10vh;
      right: 0;
      width: auto;
      height: 80vh;
      border-radius: 50%;
      transform-origin: center center;
    }
  }
</style>