<template>
  <div class="CentralSpine">

    <!-- T E X T --> 
    <div class="textProject">
      <h2>{{subtitle}}</h2>
      <h1>{{title}}</h1>
      <p>
        {{content}}
      </p>
    </div>

    <!-- I M A G E -->
    <div class="imageContent">
      <lazy-component>
        <img  class="image"
              :class="imageOpacityClass" @load="onImageLoad"  :src="imageUrlFor(image).auto('format').quality(70).fit('max')">
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
      image: {
        type: Object,
        required: true
      },
      subtitle: {
        type: String,
        default: 'I am a subtitle'
      },
      title: {
        type: String,
        default: 'There you have a title'
      },
      content: {
        type: String,
        default: 'Now you have the content'
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

.CentralSpine {
  padding: $--spacer-MEGA 10vw;
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
  width: 45%;
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

.textProject {
  width: 48.4%;
  padding-right: 8vw;

  @media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    width: 100%;
    padding: 30px 0;
    }
}

  @import '@/styles/main.scss';

  h1 {
    @include title--desktop--h2;
    margin-bottom: 18px;

    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) { 
      @include title--mobile--h2;
      line-height: 1.3;
    }
  }

  h2 {
    @include title--desktop--3($--color--02);
    margin-bottom: 14px;

    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) { 
      @include title--mobile--3($--color--02);
    }
  }

  p {
    @include text--desktop--small;

    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) { 
      @include text--mobile--small;
    }
  }

/*-------- Image fade-in --------*/
.image {
  transition: all 0.5s;
}

.opacity-0 {
  opacity: 0;
}

.opacity-full {
  opacity: 1;
}

</style>