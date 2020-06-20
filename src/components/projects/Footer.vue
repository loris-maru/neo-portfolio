<template>
  <div class="footerCore">

    <router-link to="/">
      <button type="button" class="buttonBackHome" @mouseover="mouseHover" @mouseleave="mouseByby">
        <img src="../../assets/images/arrow_icn.svg" alt="Arrow back icon" ref="iconButton" />
        <span class="labelButton" ref="textButton">Home</span>
      </button>
    </router-link>

    <section>
      <h1>
        <img src="../../assets/images/icn_rectangle_white.svg" alt="Icon icon rectangle" />
        More projects
      </h1>
      <div class="additionalInfo">
        <div v-for="(lastProj, projeIndex) in footer.featuredProject" :key="projeIndex" class="itemsTable">
          <h3>{{lastProj.footerItemSubtitle}}</h3>
          <h2>{{lastProj.itemTitle}}</h2>
        </div>
      </div>

    </section>

    <section>
      <h1>
        <img src="../../assets/images/icn_rectangle_orange.svg" alt="Icon icon rectangle" />
        More information
      </h1>

      <div class="additionalInfo">
        <div v-for="(aboutInfo, aboutItemNum) in footer.aboutInfos" :key="aboutItemNum" class="itemsTable">
          <h3>{{aboutInfo.footerItemSubtitle}}</h3>
          <h2>{{aboutInfo.itemTitle}}</h2>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
// Sanity Fetch
import sanity from '@/sanity'
import imageUrlBuilder from '@sanity/image-url'
const imageBuilder = imageUrlBuilder(sanity)
import gsap from 'gsap'

const query = `*[_type == 'footer'][0]{
  featuredProject,
  aboutInfos,
  itemTitle,
  footerItemSubtitle,
  'projName': featuredProject[].footerItemSubtitle
  }`

  export default {
    props: {
      category: {
        type: String,
        default: 'digital'
      },
      projectTitle: {
        type: String,
        default: 'Nissan Box'
      }
    },
    data() {
      return {
        footer: query
      }
    },
    methods: {
      async fetchInfos() {
        console.log('Currently fetching the footer')
        try {
          const response = await sanity.fetch(query)
          this.footer = response
        } catch(error) {
          console.log('The error is: ', error)
        }
      },
      imageUrlFor(source) {
        const res = imageBuilder.image(source)
        console.log('image url for res', res)
        return res
      },
      mouseHover() {
        let tl = gsap.timeline()
        tl.to(this.$refs.iconButton, 0.3, {left: '-60px'}, 0.2)
        tl.to(this.$refs.textButton, 0.3, {right: '8px'}, 0.1)
      },
      mouseByby() {
        let tl = gsap.timeline()
        tl.to(this.$refs.iconButton, 0.3, {left: '0'}, 0.2)
        tl.to(this.$refs.textButton, 0.3, {right: '-60px'}, 0.2)
      }
    },
    created() {
      this.fetchInfos()
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';


.footerCore {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 70vw;
  //height: 500px;
  background: $--color--02;
  padding: 80px;

  @media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    flex-flow: column nowrap;
    padding: 120px 8vw;
    }
}

button {
  position: absolute;
  top: 0;
  left: -80px;
  background: $--color--02;
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 4px 0 0 4px;
  transition: all 0.4s ease;
  overflow: hidden;
  
  img {
    position: relative;
    width: auto;
    height: 16px;
  }

  &:hover{
    background: #1D5672;
  }
}

.labelButton {
  position: absolute;
  right: -60px;
  font: {
    family: 'McQueen';
    size: 16px;
    variation-settings: 'wght' $--weight--medium;
  }
  color: $--color--03;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

section {
  width: 50%;

  @media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    width: 100%;
    margin-bottom: 50px;
    }
}

/*------ Table additional Info ------*/

.additionalInfo {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) { 
      display: flex;
      flex-flow: column wrap;
    }
}

.itemsTable {
  display: flex;
  flex-flow: column wrap;
  flex-basis: 36%;
  margin-top: 60px;
  margin-right: 55px;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) { 
      margin: 25px 0;
    }
}

/*-----------------------------------*/

h1 {
  display: flex;
  align-items: center;
  @include title--desktop--3($--color--03, $--weight--medium);

  img {
    margin-right: 30px;
  }

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) { 
      @include title--mobile--3($--color--03, $--weight--medium);
      margin-bottom: 30px;
    }
}

h2 {
  @include title--desktop--1($--color--03, $--weight--light);
  
  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) { 
      @include title--mobile--1($--color--03, $--weight--medium);
      text-transform: capitalize;
    }
}

h3 {
  @include title--desktop--3($--color--03, $--weight--light);
  margin-bottom: 10px;
  letter-spacing: 0.25em;
  opacity: 0.7;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) { 
      @include title--mobile--3($--color--03, $--weight--medium);
    }
}

section:last-child {
  h1 {
    @include title--desktop--3($--color--01, $--weight--medium);

    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) { 
      @include title--mobile--3($--color--01, $--weight--medium);
    }
  }
  h2 {
    @include title--desktop--1($--color--01, $--weight--light);

    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) { 
      @include title--mobile--1($--color--01, $--weight--medium);
      text-transform: capitalize;
    }
  }

  h3 {
    @include title--desktop--3($--color--01, $--weight--light);

    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) { 
      @include title--mobile--3($--color--01, $--weight--medium);
    }
  }
}

</style>