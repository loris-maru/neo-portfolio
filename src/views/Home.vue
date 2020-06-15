<template>
  <div class="homeCenter">

    <imageHero 
      :imgHero="imageUrlFor(projects[0].heroImage)"
      class="imageHero"
      ref="imageHero"
    />

    <swiper
      ref="projSwiper"
      class="swiper"
      :options="swiperOptionh"
      @transitionStart="onStartScrolling"
      @transitionEnd="onEndScrolling">     

        <swiper-slide class="slideFull" v-for="(proj, projNum) in projects" :key="projNum">
          <aside>{{currentProjectNumber}}</aside>
          <h1>{{proj.name}}</h1>
        </swiper-slide>

    </swiper>
       

    <div ref="blueBackground" class="blueBackground">
    </div>

    <div ref="creamBackground" class="creamBackground">
    </div>

  </div>
</template>

<script>
import sanity from '@/sanity'
import imageUrlBuilder from '@sanity/image-url'
const imageBuilder = imageUrlBuilder(sanity)

import {TimelineLite} from 'gsap'

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import imageHero from '@/components/imageHero.vue'

const query = `*[_type == 'projects']{
  name,
  year,
  headline,
  heroImage
}`
  export default {
    name: 'carousel',
    data() {
      return {
        projects: query,
        currentProjectIndex: 0,
        swiperOptionh: {
          spaceBetween: 50,
          mousewheel: true,
          direction: 'horizontal',
          slidesPerView: 1,
          speed: 1000
        }
      }
    },
    components: {
      Swiper,
      SwiperSlide,
      imageHero
    },
    computed: {
      currentProjectNumber() {
        //return this.$refs.projSwiper.$swiper.realIndex
        return this.currentProjectIndex + 1
      }
    },
    methods: {
      async fetchProject() {
        console.log('Fetching the projects')
        try {
          const response = await sanity.fetch(query)
          this.projects = response
        } catch(error) {
          console.log('The error is: ', error)
        }
      },
      imageUrlFor(source) {
        const res = imageBuilder.image(source)
        console.log('image url for res', res)
        return res
      },
      /* START */
      onStartScrolling() {
        this.$refs.imageHero.animateImage({
          borderRadius: '0%',
          height: '100vh',
          top: '0',
          right: '-10vh'
        })
        console.log('Current index is: ', this.$refs.projSwiper.$swiper.realIndex)

        const tlBackground = new TimelineLite()
        tlBackground.to(this.$refs.creamBackground, 0.3, {width: '100vw'})
        tlBackground.to(this.$refs.blueBackground, 0.4, {width: '100vw'})
      },

      /* END*/
      onEndScrolling() {
        this.$refs.imageHero.animateImage({
          borderRadius: '50%',
          height: '80vh',
          top: '10vh',
          right: '0'
        })
        const tlBackground = new TimelineLite()
        tlBackground.to(this.$refs.blueBackground, 0.8, {width: '64vw'})
        tlBackground.to(this.$refs.creamBackground, 1.2, {width: '74vw'})
        this.currentProjectIndex = this.$refs.projSwiper.$swiper.realIndex
      },
    },
    created() {
      console.log('refs', this.$refs)
      this.fetchProject()
    }
  }
</script>

<style lang="scss" scoped>

.swiper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: transparent;
  margin: 0;
}

.slideFull {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100vh;
}

h1 {
  position: relative;
  z-index: 40;
  padding-left: 200px;
  font: {
    family: 'McQueen';
    size: 62px;
    variation-settings: 'wght' 600;
  }
  color: $--color--02;
}

aside {
  position: relative;
  z-index: 40;
  padding-left: 200px;
  font: {
    family: 'McQueen';
    size: 160px;
    variation-settings: 'wght' 300;
  }
  color: $--color--02;
}


.blueBackground {
  position: fixed;
  top: 0; 
  right: 0;
  width: 64vw;
  height: 100vh;
  z-index: 10;
  background: $--color--02;
}

.creamBackground {
  position: fixed;
  top: 0; 
  right: 0;
  width: 74vw;
  height: 100vh;
  z-index: 5;
  background: $--color--03;
}

.imageHero {
  position: fixed;
  z-index: 1200;
  right: 10vh;
}

</style>