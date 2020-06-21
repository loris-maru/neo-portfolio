<template>
  <div class="counterCore" ref="counterCore">
    <h1>{{currentProjectNumber}}</h1>
    <div class="divider"></div>
    <h1>{{totalProject}}</h1>
  </div>
</template>

<script>
import gsap from 'gsap'

  export default {
    props: {
      currentProjectNumber: {
        type: Number,
        default: 1
      },
      totalProject: {
        type: Number, 
        default: 20
      }
    },
    methods: {
      animateCounter(value, speed = 0.4) {
        const {counterCore} = this.$refs
        let tl = gsap.timeline()
        tl.to(counterCore, speed, value)
      }
    }
  }
</script>

<style lang="scss" scoped>

.counterCore {
  width: 200px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding-bottom: $--spacer--XS;
  border-bottom: solid 10px $--color--01;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      width: 120px;
  }
}

.divider {
  width: 100%;
  height: 1px;
  background: $--color--01;
  margin: 0 22px;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      margin: 0 10px;
  }
}

  h1 {
    @include desktop--subtitle--1($--color--01);
  }
</style>