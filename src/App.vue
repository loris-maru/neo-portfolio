<template>
  <div>
    <Slide left width="800" class="menu" >
       <a id="home" href="#"> 
        <ul>
          <li v-for="(project, projectNum) in projects" :key="projectNum">
            {{project.name}}
          </li>
        </ul>
      </a>
    </Slide>

    <div class="centerContent">
      <router-view />
    </div>

  </div>
</template>

<script>
import sanity from '@/sanity'

const query = `*[_type == 'projects']{
  name,
  year,
  headline
}`

import { Slide } from 'vue-burger-menu'
  export default {
    data() {
      return {
        projects: query
      }
    },
    components: {
      Slide
    },
    methods: {
      async fetchProject() {
        console.log('Fetching the projects')
        try {
          const response = await sanity.fetch(query)
          this.projects = response
        } catch(error) {
          console.log('The error is: ', error)
        }
      }
    },
    created() {
      this.fetchProject()
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/menu.scss';

.centerContent {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
}

.menu {
  position: fixed;
  z-index: 200;
}

li {
  font: {
    family: 'McQueen';
    size: 22px;
  }
  color: #fff;
  margin-bottom: 22px;
}

</style>