<template>
  <div class="coreApp">
    <div class="navcore">
      <Navigation />    
    </div>

    <SideBarMenu class="SideBarMenu" ref="sideBarContainer">
      <Menu class="menu" ref="menuSliding" />
    </SideBarMenu>

      <div class="filterBlock" ref="containerFilter" :class="{'appear': isMenuOpen}">
      </div>

    
      <div class="centerContent">
          <router-view :key="$route.fullPath" />
      </div>
    

    <div ref="blueContainer" class="blueContainer"></div>
    <div ref="creamContainer" class="creamContainer"></div>

  </div>
</template>

<script>
import sanity from '@/sanity'
import gsap from 'gsap'

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
        console.log('isMenuOpen', this)
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
      }
  },
  created() {
      this.fetchProject()
    }
}
</script>

<style lang="scss" scoped>


.centerContent {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;

  transition: all ease-out 0.7s;
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
  background: black !important;
  
  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      top: 9px;
      left: 10px;
  }
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
  z-index: 1;
}

.creamContainer {
  position: fixed;
  top: 0;
  right: 2vw;
  width: 2vw;
  height: 120vh;
  background: $--color--04;
  z-index: 1;
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
  .fadingIn-enter,
  .fadingIn-leave-to {
    opacity: 1;
    transition: transform 0.4s ease;
  }

.fadingIn-enter-active,
.fadingIn-leave-active {
  transition: transform 0.4s ease;
}


.slither-enter-active, .slither-leave-active {
  transition: transform 1s;
}

.slither-enter, .slither-leave-to {
  transform: translatey(-40px);
  opacity: 0.6;
}

.slither-enter-to, .slither-leave {
  transform: translateX(0);
}



</style>