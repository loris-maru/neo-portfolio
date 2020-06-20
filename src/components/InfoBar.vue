<template>
  <div class="infoBarCore" ref="infoBar">
    <section>
      <h2>Project #{{projectNumber}}</h2>
      <h1>{{projectName}}</h1>
    </section>
    <section>
      <h2>Field</h2>
      <h1>{{projectField}}</h1>
    </section>
    <section>
      <h2>Year</h2>
      <h1>{{projectYear}}</h1>
    </section>

  </div>
</template>

<script>
import gsap from 'gsap'

  export default {
    props: {
      projectNumber: {
        type: Number,
        default: 30
      },
      projectName: {
        type: String,
        default: 'My Project'
      },
      projectField: {
        type: String,
        default: 'Design'
      },
      projectYear: {
        type: Number,
        default: 2019
      }
    },
    methods: {
      animateInfoBar(value, speed = 0.6) {
      const {infoBar} = this.$refs
      let timeline = gsap.timeline()
      timeline.to(infoBar, speed, value)
    }
    }
    
  }
</script>

<style lang="scss" scoped>

.infoBarCore {
  width: 42vw;
  display: flex;
  flex-flow: row nowrap;
  align-items: space-around;
}

section {
  flex-basis: 24%;
  margin-right: 80px;
  display: flex;
  flex-flow: column nowrap;

  &:nth-child(2) {
    flex-basis: 20%;
  }
}

h1 {
  @include desktop--title--1($--color--01);
  margin-top: 12px;
}

h2 {
  @include desktop--subtitle--1($--color--01);
}

</style>