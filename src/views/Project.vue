<template>
  <div ref="projectBody" class="projectBody">
    
    <div v-if="project" class="contentCore">
      <transition-group name="fade" tag="div" appear>
        <div class="component-container" v-for="(component, index) in project.components" :key="index">
          <component :is="getComponentTag(component._type)" v-bind="component" :project="project"  />
        </div>
      </transition-group>
    </div>

    <aside></aside>

    <div v-if="project" class="containerFooter">
      <transition name="fadeSlow" appear>
        <Footer class="footer" ref="footerCore" />
      </transition>
    </div>

  </div>
</template>

<script>
// Components Fixed
import Footer from '@/components/projects/Footer.vue'

// Components Variable
import Header from '@/components/projects/Header.vue'
import ImageFull from '@/components/projects/FullFrameImage.vue'
import DetailTable from '@/components/projects/DetailTable.vue'
import DualOne from '@/components/projects/TwoColumns_IMGS.vue'
import TwoColumns_IMGText from '@/components/projects/TwoColumns_IMG-Text.vue'
import TwoColumns_TextIMG from '@/components/projects/TwoColumns_Text-IMG.vue'
import FeatureDetail from '@/components/projects/FeatureDetail.vue'
import Text from '@/components/projects/TextLevelOne.vue'

// Plugins
import sanity from '@/sanity'

const COMPONENT_MAP = {
  // first key is from Sanity
  // Second one is the component in Vue
  'header': Header,
  'imgFullPage': ImageFull,
  'feature': FeatureDetail,
  'largeText': Text,
  'imgText': TwoColumns_IMGText,
  'textImg': TwoColumns_TextIMG,
  'doubleImage': DualOne,
  'table': DetailTable,
}

  export default {
    name: 'project',
    props: {
      slug: String
    },
    components: {
      Header,
      ImageFull,
      DualOne,
      Footer
    },
    data() {
      return {
        project: null
      }
    },
    methods: {
      getComponentTag(docTitle) {
        const tag = COMPONENT_MAP?.[docTitle] || 'div'
        console.log('tag', tag, docTitle)
        return tag
      },
      async fetchProject(slug) {
        const query = `*[_type == "projects" && slug.current == $slug]{
          components,
          field,
          headline,
          heroImage,
          name,
          slug,
          year,
          'fieldName': field->name,
          image
        }`
        try {
          const params = {slug}
          const response = await sanity.fetch(query, params)
          console.log('RESPONSE', response)
          this.project = response[0]
        } catch(error) {
          console.error(error)
        }

      }
    },
    created() {
      console.log('in project', this)
      // Go to homepage if there is no slug
      if (!this.slug) this.$router.replace('/')
      this.fetchProject(this.slug)
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.projectBody {
  position: relative;
  overflow:hidden;
}

.component-container {
  position: relative;
  top: 300px;

  @media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    top: 100px;
    }
}

aside {
  position: fixed;
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  background: $--color--02;

  @media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    width: 10px;
    }
}

.footer {
  position: relative;
  left: 30vw;
  margin-bottom: 200px; 

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2) {
      left: 0;
      margin-bottom: 120px;
    }

    @media screen and (min-width: 1900px) {
      margin: 400px 0;
    }
}

.contentCore {
  position: relative;
  width: calc(100% - 2vw);
  margin-bottom: 300px;
  
  @media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    width: calc(100% - 16px);
    margin-bottom: 200px;
    }

  @media screen and (min-width: 1900px) {
      margin-bottom: 600px;
    }
}

.navBloc {
  position: fixed;
  top: 40px;
  left: 60px;
  z-index: 999;
  background: rgba(255, 255, 255, 0.86);
}


/*------ TRANSITION ------*/

// GROUP
.fade-enter-active .fade-leave-active {
  transition: all 4s;
}

.fade-enter, .fade-leave-to {
  opacity: 1;
  transform: translateY(50px);
}

// FOOTER
.fadeSlow-enter-active .fadeSlow-leave-active {
  transition: all 5s ease-in-out;
  opacity: 0;
}

.fafadeSlowde-enter, .fadeSlow-leave-to {
  transition: all 5s ease-in-out;
  opacity: 1;
}


</style>