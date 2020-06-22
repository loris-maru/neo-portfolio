<template>
  <div class="menuCore">

    <div class="projectItems" v-for="(proj, projectNumber) in projects" :key="projectNumber">
      <MenuItem
        :projectNumber="projectNumber + 1"
        :projectCategory="proj.fieldName"
        :projectName="proj.name"
        :projectSlug="proj.slug.current"
        class="itemProjectMenu"
        />
    </div>

  </div>
</template>

<script>
// Component
import MenuItem from '@/components/MenuItem.vue'

// Sanity
import sanity from '@/sanity'

const query = `*[_type == 'projects']{
  name,
  'fieldName': field->name,
  slug
  }`

  export default {
    data() {
      return {
        projects: query
      }
    },
    components: {
      MenuItem
    },
    methods: {
      async fetchProjects() {
        console.log('Fetching in the menu')
        try {
          const response = await sanity.fetch(query)
          this.projects = response
        } catch(error) {
          console.log('This is the error: ', error)
        }
      }
    },
    created() {
      this.fetchProjects()
    }
    
  }
</script>

<style lang="scss" scoped>

.menuCore {
  width: 70vw;
  background: transparent;
  display: flex;
  flex-flow: row wrap;
  align-items: space-between;
  padding: 160px 30px;

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
    flex-basis: 25%; 
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