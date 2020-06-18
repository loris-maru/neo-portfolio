<template>
  <div class="coreApp">

    <Navigation class="navcore" />    

    <SideBarMenu class="SideBarMenu">
      <Menu class="menu" />
    </SideBarMenu>

      <div class="filterBlock" ref="containerFilter" :class="{'appear': isMenuOpen}">
      </div>

    <div class="centerContent">
      <router-view />
    </div>

    <div ref="blueContainer" class="blueContainer"></div>
    <div ref="creamContainer" class="creamContainer"></div>

  </div>
</template>

<script>
import { store } from '@/store'
import sanity from '@/sanity'
import {TimelineLite} from 'gsap'

// Components
import Menu from '@/components/Menu.vue'
import SideBarMenu from '@/components/SideBarMenu.vue'
import Navigation from '@/components/Navigation.vue'


const query = `*[_type == 'projects']{
  name,
  year,
  headline
}`

//import { Slide } from 'vue-burger-menu'
  export default {
    data() {
      return {
        projects: query
      }
    },
    components: {
      //Slide,
      Menu,
      SideBarMenu,
      Navigation
    },
    computed: {
      menuWidth: function() {
        return Math.floor(this.windowWidth * 0.70)
      },
      isMenuOpen() {
        return store.isNavOpen
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
      fadeInMenu() {
        const tl = new TimelineLite()
        if (this.isNavOpen == true) {
          tl.to(this.$refs.containerFilter, 0.4, {opacity: '0.7'})
        } else if (this.isNavOpen == false) {
          tl.to(this.$refs.containerFilter, 0.4, {opacity: '0'})
        }
      }
    },
    created() {
      this.fetchProject()
    }
  }
</script>

<style lang="scss" scoped>

.coreApp {
  overflow: hidden;
}

.centerContent {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
}

/*----------*/

.menu::-webkit-scrollbar {
  display: none;
  }

.navcore {
  position: fixed; 
  top: 40px;
  left: 40px;
  z-index: 9000;
}

li {
  font: {
    family: 'McQueen';
    size: 22px;
  }
  color: #fff;
  margin-bottom: 22px;
}

/*------ BACKGROUND ------*/
.blueContainer {
  position: fixed;
  top: 0;
  right: 0;
  width: 2vw;
  height: 100vh;
  background: $--color--02;
  z-index: 0;
}

.creamContainer {
  position: fixed;
  top: 0;
  right: 2vw;
  width: 50vw;
  height: 120vh;
  background: $--color--04;
  z-index: 0;
  opacity: 1;
}

.SideBarMenu {
  position: relative;
  z-index: 8800;
}

.filterBlock {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(42, 102, 131, 1);
  z-index: 8500;
  opacity: 0;
  pointer-events: none;

  transition: all ease 0.6s;
}

.appear {
  opacity: 0.72;
  transition: all ease 0.8s;
}

/* ANIMATION*/
.fadingIn-enter-active,
.fadingIn-leave-active {
  transition: transform 0.5s ease;
}

.fadingIn-enter,
.fadingIn-leave-to {
  opacity: 1;
  transition: transform 0.5s ease;
}

</style>