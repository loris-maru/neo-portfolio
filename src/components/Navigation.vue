<template>
    <div id="burger"
          :class="{'active': isBurgerActive}"
          >

          <!--
          <button type="button" class="burgerButton" title="Menu" @click.prevent="toggle"> -->
          <div class="burgerButton" @click.prevent="toggle">

            <img src="@/assets/images/menu_icon_lorisolivier.svg"
              alt="menuButton"
              class="menuButton"
              width="22"
              height="22"
              :class="{'disappear': isBurgerActive}"
              />

            <span v-if="!isBurgerActive" class="menuIndex">Index</span>
            <span v-if="isBurgerActive" class="menuIndex">Close</span>
            
          <!--</button>-->
          </div>
          <div class="divider" v-if="!isBurgerActive"></div>

          <router-link to="/informations">
              <span v-if="!isBurgerActive" class="menuIndex information">Infos</span>
          </router-link>
    </div>
</template>

<script>
import { store, mutations} from '@/store'

  export default {
    computed: {
      isBurgerActive() {
        return store.isNavOpen
      }
    },
    methods: {
     toggle() {
        mutations.toggleNav()
      }
    }
  }
</script>

<style lang="scss" scoped>

#burger {
  position: absolute;
  top: $--spacer--S;
  left: $--spacer--S;
  display: flex;
  cursor: pointer;

  img {
    margin-right: 30px;
    transition: all 0.4s ease-in-out;
  }
}

.menuIndex {
  position: relative;
  top: 1px;
  @include desktop--subtitle--1($--color--02);
  transition: all ease 0.4s;

  &:hover {
    background-size: 200px 20px;
  }
}

.burgerButton {
  border: none;
  background: transparent;
  margin: none;
  padding: none;
}

.disappear {
  opacity: 0;
}

a {
  text-decoration: none;
}

.divider {
  background: $--color--02;
  width: 1px;
  height: 24px;
  margin: 0 26px;
}

/*------ TRANSITION ------*/

.fading-enter-active,
.fading-leave-active {
  transition: all transform 0.6s ease;
}

.fading-enter,
.fading-leave-to {
  opacity: 0;
  transition: all transform 0.6s ease;
}

</style>