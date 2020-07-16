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
            <span v-if="showIndex" class="menuIndex mobileVisibility" :class="{'appear': !isBurgerActive, 'index': isBurgerActive}">Index</span>
            <span class="menuIndex" :class="{'appear': isBurgerActive, 'close': !isBurgerActive}">Close</span>
      
          <!--</button>-->
          </div>

          <span v-if="showButtonBack" class="menuIndex imgNav" :class="{'appear': !isBurgerActive, 'index': isBurgerActive}">
              <router-link to="/"><img src="../assets/images/icn_back.svg" alt="image chevron" />Back</router-link>
          </span>

          <div v-if="!showButtonBack" class="optionalBlock">
            <div v-if="showBurger" class="divider mobileVisibility"
            :class="{'appear': !isBurgerActive, 'index': isBurgerActive, 'disappear': showButtonBack}">
            </div>

            <router-link to="/information">
                  <span v-if="showBurger" :class="{'appear': !isBurgerActive}" class="menuIndex information">Infos</span>
            </router-link>
          </div>
    </div>
</template>

<script>
import gsap from 'gsap'

  export default {
    created() {
      console.log('route', this.$route)
    },
    computed: {
      isBurgerActive() {
        return this.$store.state.isNavOpen
      },
      showBurger() {
        const routesToHideOn = ['/information']
        if (routesToHideOn.includes(this.$route.fullPath)) return false
        return true
      },
      showIndex() {
        const routeHomeOn = ['/']
        if (routeHomeOn.includes(this.$route.fullPath)) return true
        return false
      },
      showButtonBack() {
        const routeProject = ['Project', 'information']
        if (routeProject.includes(this.$route.name)) return true
        return false
      }
    },
    watch: {
      isBurgerActive: 'animateBurger'
    },
    methods: {
     toggle() {
        this.$store.commit('toggleNav')
     },
     animateBurger() {
       let tl = new gsap.timeline()

        if (this.$store.state.isNavOpen == true) {
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
        } else if (this.$store.state.isNavOpen == false) {
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
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 20px;
  left: $--spacer--S;
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

.imgNav {
  width: 150px;
  display: flex;
  flex-flow: row nowrap;
  margin-left: 12px;

  a {
    color: $--color--02;
    font-weight: 700;
  }

  img {
    position: relative;
    width: 9px;
    top: -1px;
  }
}

.menuIndex {
  @include desktop--subtitle--1($--color--02);
  opacity: 0;

  @media only screen
    and (min-device-width: 1900px) {
      @include title--super-desktop--2($--color--02);
    }
}

.optionalBlock {
  display: flex;
}

.burgerButton {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border: none;
  background: transparent;
}

/*----- CLASS BINDING -----*/

.index {
  display: none;
}

.close {
  display: none;
}


.appear {
  display: block;
  opacity: 1;
  transition: all ease 0.8s;
}

.disappear {
  opacity: 0;
}

a {
  text-decoration: none;
}

.divider {
  position: relative;
  background: $--color--02;
  width: 1px;
  height: 24px;
  margin: 0 26px;

  @media only screen
    and (min-device-width: 1900px) {
      background: rgba(42, 102, 131, 0.3);
      top: 2px;
      height: 26px;
      margin: 0 30px;
    }
}

/*------ ICON MENU ------*/
.iconToggle {
  position: absolute;
  top: -2px;
  display: flex;
  flex-flow: row wrap;
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
  margin-right: 32px;

  @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 736px) 
    and (orientation: portrait) { 
      margin-right: 12px;
  }

  @media only screen
    and (min-device-width: 1900px) {
      width: 26px;
      height: 26px;
      top: -1px;
      margin-right: 40px;
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