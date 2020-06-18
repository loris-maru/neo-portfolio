<template>
  <div class="sidebar">
    <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen">
    </div>

    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <slot></slot>
      </div>
    </transition>

  </div>
</template>

<script>
import { store, mutations } from '@/store'

  export default {
    methods: {
        closeSidebarPanel: mutations.toggleNav
    },
    computed: {
      isPanelOpen() {
        return store.isNavOpen
      }
    }
  }
</script>

<style lang="scss" scoped>

/* ANIMATION*/
.slide-enter-active,
.slide-leave-active {
  transition: transform 1.4s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-200%);
  transition: all 0.8s ease-in 0s;
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
  width: 82vw;
  height: 100vh;

  overflow-x: hidden;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  padding-left: 80px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen 
  and (min-device-width: 1920px) {
    overflow: hidden;
  }
}


</style>