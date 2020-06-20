<template>
  <div class="buttonBackCore">
    <router-link to="/">
      <button class="buttonBack" type="button" @mouseover="mouseEnter" @mouseout="mouseLeft">
        <div class="imgBox">
          <img src="../../assets/images/icn_arrow_back.svg" alt="Icon arrow back" ref="iconButton" />
        </div>
        <span class="label" ref="labelText">Back Home</span>
      </button>
    </router-link>
  </div>
</template>

<script>
import gsap from 'gsap'

  export default {
    data() {
      return {
        imgPos: 0,
        textPos: 0
      }
    },
    methods: {
      mouseEnter() {
        let tl = gsap.timeline()
        tl.to(this.$refs.iconButton, 0.4, {right: '0px'}, 0.1)
        tl.to(this.$refs.labelText, 0.6, {right: '-6px'}, 0.1)
      },
      mouseLeft() {
        let tl = gsap.timeline()
        tl.to(this.$refs.iconButton, 0.4, {right: '-80px'}, 0.2)
        tl.to(this.$refs.labelText, 0.4, {right: '6px'}, 0.2)
      }
    }
  }
</script>

<style lang="scss" scoped>

.buttonBackCore {
  width: 260px;
  padding: 22px 45px;
  border-radius: 2px;
  background: rgba(19, 73, 100, 1);
  transition: all 0.4s ease;

  &:hover {
    background: rgba(19, 73, 100, 0.3);
  }
}

.imgBox {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  position: relative;
  top: 2px;
  overflow: hidden;
  width: 26px;
  height: 14px;
}

button {
  overflow: hidden;
  background: transparent;
  border: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  font: {
    family: 'McQueen';
    size: 16px;
    variation-settings: 'wght' 600;
  }
  color: $--color--03;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  img {
    position: relative;
    right: -80px;
  }
}

a {
  text-decoration: none;
}

.label {
  position: relative;
  right: 0;
}

</style>