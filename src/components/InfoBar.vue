<template>
  <div class="infoBarCore" ref="infoBar">
    <section>
      <h2>Project #{{projectNumber}}</h2>
      <h1>{{projectName}}</h1>
    </section>
    <section class="mobileVisibility">
      <h2>Field</h2>
      <h1>{{projectField}}</h1>
    </section>
    <section class="mobileVisibility">
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
  width: 50vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      width: 50vw;
  }
}

section {
  
  margin-right: 80px;
  display: flex;
  flex-flow: column nowrap;

  &:first-child {
    flex-basis: 50%;
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      flex-basis: 100%;
      margin: 0;
    }
  }

  &:nth-child(2) {
    flex-basis: 30%;
  }

  &:last-child {
    flex-basis: 20%;
  }

  @media only screen
    and (min-device-width: 1900px) {
      flex-basis: 30%;
    }
}

h1 {
  @include desktop--title--1($--color--01);
  margin-top: 6px;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      position: relative;
      top: -6px;
  }

  @media only screen
    and (min-device-width: 1900px) {
      @include title--super-desktop--1($--color--01);
    }
}

h2 {
  @include desktop--subtitle--1($--color--01);

  @media only screen
    and (min-device-width: 1900px) {
      @include title--super-desktop--2($--color--01);
    }
}

.mobileVisibility {
  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
    display: none;
  }
}

</style>