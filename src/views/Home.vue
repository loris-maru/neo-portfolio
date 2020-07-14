<template>
  <div class="homeCenter">

    <ScrollSymbol class="scrollSymbol" />

    <InfoBar 
      :projectNumber="this.currentProjectIndex + 1"
      :projectName="currentProject.name"
      :projectField="currentProject.fieldName"
      :projectYear="currentProject.year"
      class="infoBar"
      ref="infoBar"
      :class="{'titleOnMenu': isThisMenuOpen}" />

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
      :imageURL="imageUrlFor(currentProject.heroImage).auto('format').quality(70).fit('max').maxWidth(1200).maxHeight(1200)"
      class="imageHero"
      :class="{'appearOnMenu': isThisMenuOpen}"
      :imageALT="currentProject.headline"
      />

    <ProjectCounter
      class="projectCounter"
      :currentProjectNumber="this.currentProjectIndex + 1"
      :totalProject="projects.length"
      ref="projCounter"
      :class="{'titleOnMenu': isThisMenuOpen}"
      />

    <swiper
      ref="projSwiper"
      class="swiper"
      :options="swiperOptionh"
      @transitionStart="onStartScrolling"
      @transitionEnd="onEndScrolling">     

        <swiper-slide class="slideFull" v-for="(proj, projNum) in projects" :key="projNum">
          <h1 ref="mainTitle" class="project-main-title" :class="{'titleOnMenu': isThisMenuOpen}">
            {{proj.headline}}
          </h1>
        </swiper-slide>
    </swiper>

    <div ref="blueBackground" class="blueBackground" :class="{'backgroundChangeOne': isThisMenuOpen}">
    </div>

    <div ref="creamBackground" class="creamBackground" :class="{'backgroundChangeTwo': isThisMenuOpen}">
    </div>

  </div>
</template>

<script>
// Sanity
import sanity from '@/sanity'
import imageUrlBuilder from '@sanity/image-url'
const imageBuilder = imageUrlBuilder(sanity)

// GSAP
//import {TimelineLite} from 'gsap'
import gsap from 'gsap'

// Swiper
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

// Components
import imageHero from '@/components/imageHero.vue'
import InfoBar from '@/components/InfoBar.vue'
import ProjectCounter from '@/components/ProjectCounter.vue'
import ButtonProjectView from '@/components/ButtonProjectView.vue'
import ScrollSymbol from '@/components/ScrollSymbol.vue'

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
          direction: 'vertical',
          slidesPerView: 1,
          speed: 1600,
          sensitivity: 3,
          keyboard: true
        }
      }
    },
    components: {
      Swiper,
      SwiperSlide,
      imageHero,
      InfoBar,
      ProjectCounter,
      ButtonProjectView,
      ScrollSymbol
    },
    computed: {
      currentProject() {
        return this.projects[this.currentProjectIndex]
      },
      currentProjectSlug() {
        return this.currentProject?.slug?.current || ''
      },
      isThisMenuOpen() {
        return this.$store.state.isNavOpen
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

      ifTheMenuIsOpen() {
        if(this.$store.state.isNavOpen == true) {
          gsap.to(this.$refs.mainTitle, {
            duration: 0.6,
            x: '2vw',
            ease: 'easeOut'
          })
        } else if(this.$store.state.isNavOpen == false) {
          gsap.to(this.$refs.mainTitle, {
            duration: 0.6,
            x: 0,
            ease: 'easeOut'
          })
        }
      },
      
/*--------- ON SCROLL START ---------*/
      
      onStartScrolling() {
        gsap.to(this.$refs.mainTitle, {
          duration: 0.8,
          lineHeight: '2em',
          ease: 'easeIn',
          onComplete: () => {
            gsap.to(this.$refs.mainTitle, {
              duration: 0.4,
              lineHeight: '1.05em',
              ease: 'easeOut'
            })
          }
        })
        this.$refs.projIMG.animateCurrentImage({
          duration: 0.8,
          scale: '1.4',
          ease: 'easeOut',
          onComplete: () => {
            this.$refs.projIMG.animateCurrentImage({
              duration: 0.8,
              scale: '1',
              ease: 'easeIn'
            })
          }
        })
        /* ANIMATE TEXT INSIDE THE BUTTON */
        this.$refs.buttonView.animateText({
          opacity: '0',
          onComplete: () => {
            this.$refs.buttonView.animateText({
              opacity: '1'
            })
          }
        })
        /* ANIMATE BLUE BACKGROUND*/
        gsap.to('.blueBackground', {
          duration: 0.9,
          width: '72vw',
          ease: 'easeOut',
          onComplete: () => {
            gsap.to('.blueBackground', {
              duration: 1.2,
              width: '64vw',
              ease: 'easeOut'
            })
          }
        })
        /* ANIMATE CREAM BACKGROUND*/
        gsap.to('.creamBackground', {
          duration: 0.9,
          width: '86vw',
          ease: 'easeOut',
          onComplete: () => {
            gsap.to('.creamBackground', {
              duration: 1.5,
              width: '74vw',
              ease: 'easeOut'
            })
          }
        })
        
      },
      // END scrolling
      onEndScrolling() {
        this.currentProjectIndex = this.$refs.projSwiper.$swiper.realIndex
      },
      // ----------------
      // PAGE TRANSITION
      // ----------------
      redirectToProject(url) {
        let headTimeline = gsap.timeline()
        this.$refs.infoBar.animateInfoBar({
          opacity: '0',
          top: '-150px'
        })
        this.$refs.buttonView.animateButton({
          opacity: '0'
        })
        this.$refs.projCounter.animateCounter({
          opacity: '0',
          bottom: '-150px'
        })
        headTimeline.to(this.$refs.mainTitle, 0.3, {opacity: '0', onComplete: () => {
          this.$refs.projIMG.animateCurrentImage({
            height: '100vh',
            top: '0',
            right: '-10vh',
            onComplete: () => {
                headTimeline.to(this.$refs.blueBackground, 0.6, {width: '2vw'})
              this.$refs.projIMG.animateCurrentImage({
                right: '-60vw'
              })
                headTimeline.to(this.$refs.creamBackground, 0.4, {width: '2vw',
                onComplete: () => {
                  this.$router.push(url)
                }
              })
            }
          })
          
        }})// End of $refs.mainTitle
      //----------------------------  
      } // END of REDIRECT TO PROJECT()
    },

    created() {
      this.$options.animationSpeed = 0.25
      this.fetchProject()
    }
  }
</script>

<style lang="scss" scoped>

.project-main-title {
  will-change: transform;
  height: 500px;
}

.scrollSymbol {
  position: fixed;
  left: 74px;
  top: 40vh;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
    display: none;
  }
}

/*------- MASTER TITLE -------*/
h1 {
  position: relative;
  top: -70px;
  left: 20vw;
  width: 50vw; 
  position: relative;
  font: {
    family: 'Oni';
    size: 180px;
    variation-settings: 'wght' 700;
  }
  color: $--color--01;
  line-height: 200px;
  transition: transform ease-in-out 1.2s;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
    font-size: 68px;
    left: 8vw;
    top: -2vw;
  }

  @media screen and (min-device-width: $--breakpoint--super-desktop){
    top: 0;
    left: 28vw;
  }
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
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 24vh;
}


/*------ COMPONENTS ------*/

.menuOpenPosition {
  right: -24vw;
}

.imageHero {
  position: fixed;
  z-index: 90;
  right: -10vw;

  transition: all ease-in-out 1.2s;
  transition-delay: 0.2s;
  

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
    right: -18vw;
  }
}

.infoBar {
  position: fixed;
  top: $--spacer--S;
  left: 40vw;
  z-index: 4000;

  transition: all ease-in-out 1.2s;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
    top: 30px;
    left: 44vw;
  }
}

.projectCounter {
  position: fixed;
  bottom: 0;
  left: 40vw;
  z-index: 4000;

  transition: all ease-in-out 1.2s;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
    left: 44vw;
  }
}

.buttonCore {
  position: fixed;
  top: 27.5vh;
  z-index: 8500;
  right: 22vw;
  opacity: 1;
    @media only screen 
      and (min-device-width: 375px) 
      and (max-device-width: 736px) 
      and (orientation: portrait) { 
      right: 14vw;
      top: 50vh;
    }

  @media screen and (min-device-width: $--breakpoint--super-desktop){
    top: 25vh;
    }
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

  transition: right ease-in-out 0.8s;
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

.appearOnMenu {
  transform: translateX(120px);
  transition: all ease 1.2s;
  transition-delay: 0.7s;
}

.titleOnMenu {
  transform: translateX(120px);
  transition: all ease 1s;
  transition-delay: 0.6s;
}

.backgroundChangeOne {
  right: -200px;
  transition: all ease 2s;
  transition-delay: 0.5s;
}

.backgroundChangeTwo {
  right: -80px;
  transition: all ease 3s;
  transition-delay: 0.5s;
}


</style>