<template>
  <div class="scrollSymbolCore">
    <img src="../assets/images/triangle_color_Up.svg" alt="Triangle Icon Top" />
      <div class="coreMessage">
        <h4>Scroll</h4>
      </div>
    <img src="../assets/images/triangle_color_Down.svg" alt="Triangle Icon Top" />
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .scrollSymbolCore {
    width: 65px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }

  .coreMessage {
    width: 100%;
    padding: 10px 0 54px 0;
    margin: 10px 0;

    font: {
      family: 'McQueen';
      weight: 700;
      size: 16px;
    }
    color: $--color--02;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
  }

  h4 {
    position: relative;
    top: 0;
    left: -43px;
    transform-origin: top right;
    transform: rotate(-90deg);
    }

</style>