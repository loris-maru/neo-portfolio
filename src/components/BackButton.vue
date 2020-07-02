<template>
  <div class="backButtonCore">
    <router-link to="/informations">
      <!--<img src="../assets/images/icn_back.svg" width="6" height="10" alt="Chevron back button" />-->
      <span class="labelButton">Infos</span>
    </router-link>

  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

.backButtonCore {
    background: rgba(255, 255, 255, 0.72);
    padding: 10px 24px;
  }

.labelButton {
  @include desktop--subtitle--1($--color--02);

  @media only screen
    and (min-device-width: 1900px) {
      @include title--super-desktop--2($--color--02);
    }
}


img {
  position: relative;
  top: -2px;
  margin-right: 20px;
}

a {
  text-decoration: none;
}

</style>