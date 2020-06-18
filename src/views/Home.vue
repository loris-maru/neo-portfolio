<template>
  <div class="homeCenter">

    <InfoBar 
      :projectNumber="this.currentProjectIndex + 1"
      :projectName="currentProject.name"
      :projectField="currentProject.fieldName"
      :projectYear="currentProject.year"
      class="infoBar"
      ref="infoBar" />

    <ButtonProjectView
      :slug="currentProjectSlug"
      @redirectToProject="redirectToProject" 
      class="buttonCore"
      ref="buttonView"
      @mouseenter.native="filter = true"
      @mouseleave.native="filter = false"
      />

      <div class="blueFilter" :class="{appear: filter}">
      </div>

    <imageHero
      ref="projIMG"
      :imageURL="imageUrlFor(currentProject.heroImage).auto('format').quality(70).fit('max')"
      class="imageHero"
      :imageALT="currentProject.headline"
      />

    <ProjectCounter
      class="projectCounter"
      :currentProjectNumber="this.currentProjectIndex + 1"
      :totalProject="projects.length"
      ref="projCounter"
      />

    <swiper
      ref="projSwiper"
      class="swiper"
      :options="swiperOptionh"
      @transitionStart="onStartScrolling"
      @transitionEnd="onEndScrolling"
      @slideChange="onChangeWholeScrolling"
      >     

        <swiper-slide class="slideFull" v-for="(proj, projNum) in projects" :key="projNum">
          <h1 class="headlineTitle" ref="mainTitle">
            {{proj.headline}}
          </h1>
        </swiper-slide>

    </swiper>

    <div ref="blueBackground" class="blueBackground">
    </div>

    <div ref="creamBackground" class="creamBackground">
    </div>

  </div>
</template>

<script>
// Sanity
import sanity from '@/sanity'
import imageUrlBuilder from '@sanity/image-url'
const imageBuilder = imageUrlBuilder(sanity)

// GSAP
import {TimelineLite} from 'gsap'

// Swiper
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

// Components
import imageHero from '@/components/imageHero.vue'
import InfoBar from '@/components/InfoBar.vue'
import ProjectCounter from '@/components/ProjectCounter.vue'
import ButtonProjectView from '@/components/ButtonProjectView.vue'

const query = `*[_type == 'projects']{
  name,
  year,
  headline,
  heroImage,
  slug,
  'fieldName': field->name,
  'headerCompTitle': components[].title,
  'headerYear':components[]{year}
}`
  export default {
    name: 'carousel',
    data() {
      return {
        projects: query,
        currentProjectIndex: 0,
        filter: false,
        swiperOptionh: {
          spaceBetween: 50,
          mousewheel: true,
          direction: 'horizontal',
          slidesPerView: 1,
          speed: 900
        }
      }
    },
    components: {
      Swiper,
      SwiperSlide,
      imageHero,
      InfoBar,
      ProjectCounter,
      ButtonProjectView
    },
    computed: {
      currentProject() {
        return this.projects[this.currentProjectIndex]
      },
      currentProjectSlug() {
        return this.currentProject?.slug?.current || ''
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

      /* ON SCROLL START */
      onStartScrolling() {
        // ANIMATE the image
        this.$refs.projIMG.animateCurrentImage({
          borderRadius: '0%',
          height: '100vh',
          top: '0'
        }, this.$options.animationSpeed)
        
        this.$refs.buttonView.animateButton({
          transform: 'scale(0.92)',
          opacity: 0
        })

        this.$refs.buttonView.animateText({
          opacity: 0
        })

        const tlBackground = new TimelineLite()
        tlBackground.to(this.$refs.creamBackground, 0.3, {width: '100vw'})
        tlBackground.to(this.$refs.blueBackground, 0.4, {width: '100vw'})

        const tlTitle = new TimelineLite()
        tlTitle.to(this.$refs.mainTitle, 0.2, {opacity: '0'})
      },

      // WHILE SCROLLING
      onChangeWholeScrolling() {
        const tlTitle = new TimelineLite()
        tlTitle.to(this.$refs.mainTitle, 0.3, {opacity: '0'})
      },

      // END scrolling
      onEndScrolling() {
        // ANIMATE the image
        this.$refs.projIMG.animateCurrentImage({
          borderRadius: '50%',
          height: '90vh',
          top: '5vh'
        }, this.$options.animationSpeed)

        // ANIMATE the button
        this.$refs.buttonView.animateButton({
          transform: 'scale(1)',
          opacity: 1
        })

        this.$refs.buttonView.animateText({
          opacity: 1
        }, 1)

        const tlBackground = new TimelineLite()
        tlBackground.to(this.$refs.blueBackground, 0.6, {width: '64vw'})
        tlBackground.to(this.$refs.creamBackground, 0.8, {width: '74vw'})
        this.currentProjectIndex = this.$refs.projSwiper.$swiper.realIndex

        const tlTitle = new TimelineLite()
        tlTitle.to(this.$refs.mainTitle, 0.6, {opacity: '1'})
      },
      // ----------------
      // PAGE TRANSITION
      // ----------------
      redirectToProject(url) {
        const headTimeline = new TimelineLite()
        
        this.$refs.infoBar.animateInfoBar({
          opacity: '0',
          top: '-150px'
        })

        this.$refs.buttonView.animateButton({
          opacity: '0'
        })
        this.$refs.projCounter.animateCounter({
          opacity: '0',
          top: '-150px'
        })
          
        headTimeline.to(this.$refs.mainTitle, 0.3, {opacity: '0', onComplete: () => {

          this.$refs.projIMG.animateCurrentImage({
            borderRadius: '0%',
            height: '100vh',
            top: '0',
            right: '-10vh',
            onComplete: () => {
                headTimeline.to(this.$refs.blueBackground, 0.6, {width: '2vw'})
              this.$refs.projIMG.animateCurrentImage({
                right: '-60vw'
              })
                headTimeline.to(this.$refs.creamBackground, 0.4, {width: '50vw',
                onComplete: () => {
                  this.$router.push(url)
                }
              })
            }
          })
          
        }})// End of $refs.mainTitle
      //----------------------------  
      } // END of REDIRECTTOPROJECT()
    },
    created() {
      this.$options.animationSpeed = 0.25
      this.fetchProject()
    }
  }
</script>

<style lang="scss" scoped>

/*------- MASTER TITLE -------*/
h1 {
  position: relative;
  left: 20vw;
  width: 40vw; 
  position: relative;
  font: {
    family: 'Oni';
    size: 9vw;
    variation-settings: 'wght' 700;
  }
  color: $--color--01;
  line-height: 1.1;
}

/*------ SLIDER ------*/

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


/*------ COMPONENTS ------*/

.imageHero {
  position: fixed;
  z-index: 90;
  right: 10vh;

  transition: all ease-in-out 0.6s;
}

.infoBar {
  position: fixed;
  top: $--spacer--S;
  left: 40vw;
  z-index: 4000;

  transition: all ease-in-out 0.6s;
}

.projectCounter {
  position: fixed;
  bottom: 0;
  left: 40vw;
  z-index: 4000;

  transition: all ease-in-out 0.6s;
}

.buttonCore {
  position: fixed;
  top: 30vh;
  z-index: 8500;
  right: 22vw;
  opacity: 1;
}

/*------ BACKGROUND ------*/

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
  background: $--color--04;
  opacity: 1;
}

.blueFilter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 7000;
  background: rgba(42, 102, 131, 0.64);
  opacity: 0;
  pointer-events: none;

  transition: all ease-in-out 0.4s;
}

.appear {
  opacity: 1;
}

</style>