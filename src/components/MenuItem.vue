<template>
  <div class="coreMenuItem">
    <a @click.prevent="$emit('fromMenuToProject', projectSlug)">
      <section>
        <span class="projNumber">{{projectNumber}}</span>
        <h2>{{projectCategory}}</h2>
      </section>
      <h1>
          {{projectName}}
      </h1>
      </a>
  </div>
</template>

<script>

  export default {
    name: 'MenuItem',
    props: {
      projectNumber: {
        type: Number, 
        default: 2019
      },
      projectCategory: {
        type: String,
        default: 'Design'
      },
      projectName: {
        type: String, 
        default: 'My Project'
      },
      slug: {
        type: [Number, String],
        required: true
      }
    },
    computed: {
      projectSlug() {
        return `/project/${this.slug}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  
.projNumber {
  font: {
    family: 'McQueen';
    size: 16px;
    weight: 400;
  }
  color: $--color--02;
  margin-right: 10px;
  padding-right: 10px;
  border-right: solid 2px #BFD1DA;
}

section {
  display: flex;
  flex-flow: row nowrap;
}

a {
  color: $--color--02;
  text-decoration: none;
  cursor: pointer;
}

h1 {
  font: {
    family: 'Oni';
    size: 34px;
    variation-settings: 'wght' 400;
  }
  color: $--color--02;
  margin-top: 12px;
  transition: all ease 0.6s;
  transform-origin: top left;

  &:hover {
    transform: scale(1.15);
    font-variation-settings: 'wght' 800;
  }
}

h2 {
  @include desktop--subtitle--1($--color--02);
}

</style>