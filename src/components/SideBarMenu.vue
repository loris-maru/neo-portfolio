<template>
  <div class="sidebar">
    <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen">
    </div>

    <transition name="slide">
      <div v-show="isPanelOpen" class="sidebar-panel" :class="{'roundingElements': !isPanelOpen}">
        <slot></slot>
      </div>
    </transition>

  </div>
</template>

<script>
import gsap from 'gsap'
  export default {
    methods: {
        closeSidebarPanel() {
          this.$store.commit('toggleNav')
        }
    },
    computed: {
      isPanelOpen() {
        return this.$store.state.isNavOpen
      }
    }
  }
</script>

<style lang="scss" scoped>

/* ANIMATION*/
.slide-enter-active,
.slide-leave-active {
  transition: transform 1.6s ease, border-radius;
  border-radius: 0px;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-200%);
  transition: all 1.2s ease-in;
  border-radius: 0 50vh 50vh 0;
}

.sidebar-backdrop {
  background: transparent;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}

.sidebar-panel {
  width: 62vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  padding-left: 80px;
  // Change the speed of the transition
  transition: all 1.8s;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen 
  and (min-device-width: 1920px) {
    overflow: hidden;
  }

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      padding-left: 12px;
    }
}

.roundingElements {
  border-radius: 50%;
  transition: all ease 3s;
}

</style>