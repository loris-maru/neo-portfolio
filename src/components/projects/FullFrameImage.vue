<template>
  <div class="imgContainer">
    <lazy-component @show="onImageLoad">
    <img  class="image"
          :class="imageOpacityClass"         
          :src="imageUrlFor(image).auto('format').quality(70).fit('max')"
          alt="Image of the project" />
    </lazy-component>
  </div>
</template>

<script>
import sanity from '@/sanity'
import imageUrlBuilder from '@sanity/image-url'
const imageBuilder = imageUrlBuilder(sanity)

  export default {
    data() {
      return {
        imageOpacityClass: 'opacity-0'
      }
    },
    props: {
      project: {
        type: Object,
        required: true
      },
      image: {
        type: Object,
        required: true
      }
    },
    methods: {
      imageUrlFor(source) {
        const res = imageBuilder.image(source)
        console.log('image url for res', res)
        return res
      },
      onImageLoad(_) {
        this.imageOpacityClass = 'opacity-full'
      }
    }
  }
</script>

<style lang="scss" scoped>

.image {
  transition: all 0.5s;
}

.opacity-0 {
  opacity: 0;
}

.opacity-full {
  opacity: 1;
}

.imgContainer {
  padding: $--spacer--M 0 $--spacer--L 60px;
  @media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    @include text--mobile--medium;
    padding: $--spacer--XS 0;
    }
}

img {
  width: 100%;
  height: auto;
}

</style>