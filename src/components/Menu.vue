<template>
  <div class="menuCore">

    <div  class="projectItems"
          v-for="(proj, projectNumber) in projects"
          :style="getSpaceStyle(projectNumber)"
          :key="projectNumber"
          ref="projectItems"
          >
      <MenuItem
        :projectNumber="projectNumber + 1"
        :projectCategory="proj.fieldName"
        :projectName="proj.name"
        :projectSlug="proj.projectSlug"
        class="itemProjectMenu"
        />
    </div>

  </div>
</template>

<script>
// Component
import MenuItem from '@/components/MenuItem.vue'
import gsap from 'gsap'
// Sanity
import sanity from '@/sanity'
import {mapState} from 'vuex'
const query = `*[_type == 'projects']{
  name,
  'fieldName': field->name,
  slug, 
  'projectSlug': slug.current
  }`

  export default {
    data() {
      return {
        projects: []
      }
    },
    components: {
      MenuItem
    },
    watch: {
      '$store.state.isNavOpen'(isOpen) {
        isOpen ? this.onAppear() : this.onDisappear()
      }
    },
    methods: {
      onDisappear() {
        // Create a gsap timeline
        const timeline = new gsap.timeline()
        // Loop through refs of all nav items
        this.$refs.projectItems.forEach(item => {
          // Get data-right attribute which is used to determine
          // How far the element should be moved
          // data-right is set in the onAppear method
          const rightValue = item.getAttribute('data-right')
          // Add animation to the timeline
          // 0 as the third argument indicates that all animations 
          // should be started immediately
          timeline.to(item, 1.4, {
            right: `${rightValue}px`
          }, 0)
        })
      },
      onAppear() {
       setTimeout(() => {
         // Create a gsap timeline
          const timeline = new gsap.timeline()
          // Loop through refs of all nav items
          this.$refs.projectItems.forEach(item => {
            // Get right style of the item and extract the number value
            const rightStyle = item.style.right
            const rightValue = parseInt(rightStyle.replace('px', ''))
            // Set data-right attribute so it can be used
            // in the 'onDisappear' method. This is needed
            // to move items back when sidebar is closed
            item.setAttribute('data-right', rightValue)
            // Add animation to the timeline
            // 0 as the third argument indicates that all animations 
            // should be started immediately
            timeline.to(item, 1.4, {
              right: 0
            }, 0)
          })
        }, 1000) 
      },
      getSpaceStyle(index) {
        let style = {
          position: 'relative'
        }
        const MAP = {
          0: '150px',
          1: '100px',
          2: '50px'
        }

        style.right = MAP[index % 3]
        return style
      },
      async fetchProjects() {
        console.log('Fetching in the menu')
        try {
          const response = await sanity.fetch(query)
          console.log('respnse', response)
          this.projects = response
        } catch(error) {
          console.log('This is the error: ', error)
        }
      }
    },
    created() {
      this.fetchProjects()
    },
    
  }
</script>

<style lang="scss" scoped>



.menuCore {
  width: 60vw;
  background: transparent;
  display: flex;
  flex-flow: row wrap;
  align-items: space-between;
  padding: 160px 30px;
  transition: all 0.5s ease-in-out;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      padding: 100px 22px;
    }
}

.projectItems {
  flex-basis: 32%;
  
  @media screen 
  and (min-device-width: 1920px) {
    //flex-basis: 25%;
  }

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      flex-basis: 100%;
    }
}

.itemProjectMenu {
  margin-bottom: 100px;

  @media screen 
  and (min-device-width: 1920px) {
    margin-bottom: 160px;
  }

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      margin-bottom: 80px;
    }
}


</style>