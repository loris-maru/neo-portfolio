<template>
  <div class="counterCore" ref="counterCore">
    <h1>{{currentProjectNumber}}</h1>
    <div class="divider"></div>
    <h1>{{totalProject}}</h1>
  </div>
</template>

<script>
import {TimelineLite} from 'gsap'
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
        const tl = new TimelineLite()
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
}

.divider {
  width: 100%;
  height: 1px;
  background: $--color--01;
  margin: 0 22px;
}

  h1 {
    @include desktop--subtitle--1($--color--01);
  }
</style>