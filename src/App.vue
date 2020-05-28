<template>
<!-- ora exibe um componente, ora exibe outro -->
  <div class="corpo">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
.corpo {
  font-family: Helvetica, sans-serif;
  width: 96%;
  margin: 0 auto;
}
</style>
