<template>
  <div class="CentralSpine">
    <!-- IMAGE 1 -->
    <div class="imageContent">
      <lazy-component>
        <img class="image" :class="imageOpacityClass" @load="onImageLoad" :src="imageUrlFor(firstImage).auto('format').quality(70).fit('max')">
      </lazy-component>
    </div>

    <!-- IMAGE 2 -->
    <div class="imageContent">
      <lazy-component>
        <img class="image" :class="imageOpacityClass" @load="onImageLoad" :src="imageUrlFor(secondImage).auto('format').quality(70).fit('max')">
      </lazy-component>
    </div>

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
      firstImage: {
        type: Object,
        required: true
      },
      secondImage: {
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
@import '@/styles/main.scss';

.CentralSpine {
  padding: $--spacer--XXL 10vw;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  @media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    flex-flow: column nowrap;
    padding: $--spacer--XS 10vw;
    }
}

.imageContent {
  width: 48.4%;
  img {
    width: 100%;
  }

  @media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    width: 100%;
    }
}


/*-------- Image Fading In --------*/

.image {
  transition: all 0.5s;
}

.opacity-0 {
  opacity: 0;
}

.opacity-full {
  opacity: 100%;
}


</style>