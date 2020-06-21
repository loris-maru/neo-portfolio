<template>
    <div id="burger"
          :class="{'active': isBurgerActive}">

          <div class="burgerButton" @click.prevent="toggle">

            <div class="iconToggle">
              <div class="dotOne" ref="dotOne"></div>
              <div class="dotTwo" ref="dotTwo"></div>
              <div class="dotThree" ref="dotThree"></div>
              <div class="dotFour" ref="dotFour"></div>
            </div>


            <!-- <span v-if="!isBurgerActive" class="menuIndex">Index</span> -->
            <span class="menuIndex mobileVisibility" :class="{'appear': !isBurgerActive, 'index': isBurgerActive}">Index</span>
            <span class="menuIndex" :class="{'appear': isBurgerActive, 'close': !isBurgerActive}">Close</span>

          <!--</button>-->
          </div>
          <div class="divider mobileVisibility" :class="{'appear': !isBurgerActive, 'index': isBurgerActive}"></div>

          <router-link to="/informations">
              <span :class="{'appear': !isBurgerActive}" class="menuIndex information">Infos</span>
          </router-link>
    </div>
</template>

<script>
import { store, mutations} from '@/store'
import gsap from 'gsap'

  export default {
    computed: {
      isBurgerActive() {
        return store.isNavOpen
      }
    },
    methods: {
     toggle() {
        mutations.toggleNav()

        let tl = new gsap.timeline()

        if (store.isNavOpen == true) {
          tl.to(this.$refs.labelIndex, 0.2, {
            opacity: '1'
          })
          tl.to(this.$refs.dotOne, 0.2, {
            width: '24px',
            height: '4px',
            top: 0,
            left: '4px'
          }, 0.1)
          tl.to(this.$refs.dotTwo, 0.2, {
            width: '24px',
            height: '4px',
            top: 0,
            right: '4px'
          }, 0.1)
          tl.to(this.$refs.dotThree, 0.2, {
            width: '24px',
            height: '4px',
            left: '4px',
            bottom: '2px'
          }, 0.1)
          tl.to(this.$refs.dotFour, 0.2, {
            width: '24px',
            height: '4px',
            bottom: '2px',
            right: '4px'
          }, 0.1)

          // ELSE IF
        } else if (store.isNavOpen == false) {
          tl.to(this.$refs.dotOne, 0.2, {
          width: '8px',
          height: '8px'
          }, 0.1)
          tl.to(this.$refs.dotTwo, 0.2, {
            width: '8px',
            height: '8px'
          }, 0.1)
          tl.to(this.$refs.dotThree, 0.2, {
            width: '8px',
            height: '8px',
            bottom: '-2px'
          }, 0.1)
          tl.to(this.$refs.dotFour, 0.2, {
            width: '8px',
            height: '8px',
            bottom: '-2px'
          }, 0.1)
        }
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
  flex-flow: row nowrap;
  cursor: pointer;

  img {
    margin-right: 30px;
    transition: all 0.4s ease-in-out;
  }

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      top: 30px;
      left: 30px;
  }
}

.menuIndex {
  position: relative;
  top: 1px;
  @include desktop--subtitle--1($--color--02);
  opacity: 0;
}

.burgerButton {
  display: flex;
  flex-flow: row nowrap;
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

/*------ ICON MENU ------*/
.iconToggle {
  position: relative;
  top: -2px;
  display: flex;
  flex-flow: row wrap;
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
  margin-right: 24px;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      margin-right: 12px;
  }

  .dotOne {
    top: 0;
    left: 4px;
    transform: rotate(45deg);
    transform-origin: top left;
  }

  .dotTwo {
    top: 0;
    right: 4px;
    transform: rotate(-45deg);
    transform-origin: top right;
  }

  .dotThree {
    left: 4px;
    bottom: -2px;
    transform: rotate(-45deg);
    transform-origin: bottom left;
  }

  .dotFour {
    bottom: -2px;
    right: 4px;
    transform: rotate(45deg);
    transform-origin: bottom right;
  }
}

.dotOne, .dotTwo, .dotThree, .dotFour {
  position: absolute;
  width: 8px;
  height: 8px;
  background: $--color--02;
  border-radius: 4px;

  transition: all ease-in-out 0.4s;
}

.index {
  display: none;
}

.close {
  display: none;
}

.appear {
  display: visible;
  opacity: 1;
  transition: all ease 0.8s;
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

.mobileVisibility {
  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      display: none;
  }
}

</style>