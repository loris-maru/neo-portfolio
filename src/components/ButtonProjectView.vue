<template>
  <div class="buttonCore" ref="buttonMain">
    <a @click.prevent="$emit('redirectToProject', projectSlug)">
      <button type="button" ref="buttonLabel">
        View<br>
        Project
      </button>
    </a>
  </div>
</template>

<script>
import gsap from 'gsap'

  export default {
    props: {
      slug: {
        type: [Number, String],
        required: true
      }
    },
    computed: {
      projectSlug() {
        return `/project/${this.slug}`
      }
    },
    methods: {
      animateButton(value, speed = 0.2) {
        const {buttonMain} = this.$refs
        let timeline = gsap.timeline()
        timeline.to(buttonMain, speed, value)
      },
      animateText(value, speed = 0.6) {
        const {buttonLabel} = this.$refs
        let timeline = gsap.timeline()
        timeline.to(buttonLabel, speed, value)
      }
    }
  }
</script>

<style lang="scss" scoped>

.buttonCore {
  width: 25vw;
  height: 25vw;
  display: flex;
  background: rgba(42, 102, 131, 0.15);
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
  border: {
    radius: 50%;
    width: 3px;
    style: solid;
    color: $--color--01;
  }
  transition: all ease-in-out 0.4s;

  &:hover{
    transform: scale(1.03);
    border-width: 5px;
  }

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) {
      width: 150px;
      height: 150px;
      background: rgba(42, 102, 131, 0.82);;
  }
}

button {
  position: relative;
  background: transparent;
  border: none;
  top: -8px;
  font: { 
    family: 'Oni';
    size: 3.6vw;
    variation-settings: 'wght' $--weight--medium;
  }
  color: $--color--01;
  text-transform: uppercase;
  line-height: 1;
  letter-spacing: 0.09em;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) {
      top: 0;
      font-size: 22px;
  }
}

</style>