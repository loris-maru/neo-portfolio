<template>
  <div class="imageCore">
    <div ref="imageHero" class="imageContent">
      <!-- CURRENT IMAGE -->
      <img ref="heroImageCurrent" class="heroImage current" :src="currentImg" :alt="imageALT" />
      <!-- NEW IMAGE -->
      <img v-show="!!newImg" v-if="newImg" ref="heroImageNew" class="heroImage new" :src="newImg" :alt="imageALT" />
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

  export default {
    props: {
      imageURL: {
        type: Object,
        required: true
      },
      imageALT: {
        type: String,
        default: "This is a description"
      }
    },
    data() {
      return {
        currentImg: '',
        newImg: ''
      }
    },
    watch: {
      imageURL: {
        handler: 'attachImage',
        immediate: true
      }
    },
    mounted() {
      
    },
    methods: {
      getHeroImageEl() {
        return this.$refs.heroImageCurrent
      },
      addOnNewImageLoad() {
        const {heroImageNew, heroImageCurrent} = this.$refs
        heroImageNew.onload = () => {
          setTimeout(() => {
            const speed = 0.7
            let timeline = gsap.timeline()         
            timeline.to(heroImageCurrent, speed, {opacity: 0})
            timeline.to(heroImageNew, speed, {opacity: 1, onComplete: () => {
                this.currentImg = this.newImg
                heroImageCurrent.style.opacity = 1
                heroImageNew.style.opacity = 0
              }
            }, '-=0.5')// originall -0.15
          }, 10)
        }
      },
      attachImage(src, oldSrc) {
        console.log('attach image updated', src, oldSrc, this.currentImg)

        if (!src?.options.source) return

        /* if (src?.options?.projectId && oldSrc?.options?.projectId && src?.options?.projectId === oldSrc?.options?.projectId) return*/
        if (this.currentImg?.options?.source?.asset?._ref === src?.options?.source?.asset?._ref) return


        if (!this.currentImg || !this.currentImg?.options?.source) {
          this.currentImg = src
          return
        }
        if (!this.newImg) {
          this.$nextTick(() => {
            this.addOnNewImageLoad()
          })
        }
        this.newImg = src

},
      setImageRadius(value, speed = 1) {
        const {imageHero} = this.$refs
        let timeline = gsap.timeline()
        timeline.to(imageHero, speed, {
          'border-radius': value
        })
      },
      animateImage(image, value, speed = 1.5) {
        let timeline = gsap.timeline()
        timeline.to(image, speed, value)
      },
      animateCurrentImage(value, speed = 1) {
        const {heroImageCurrent} = this.$refs   
        let timeline = gsap.timeline()   
        timeline.to(heroImageCurrent, speed, value)
      }
    }
  }
</script>

<style lang="scss" scoped>
.imageCore {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 88vh;
  height: 100vh;
  
  @media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    width: 90vh;
    height: 90vh;
  }
}

.imageContent {
  width: 90vh;
  height: 90vh;
  border-radius: 50%;
  overflow: hidden;
}

.heroImage {
    position: absolute;
    top: 5vh;
    height: 90vh;
    border-radius: 50%;
    &.new {
      opacity: 0;
    }
}

img {
  width: auto;
  height: 100%;
}

</style>