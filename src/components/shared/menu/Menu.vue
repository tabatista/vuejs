<template>
  <!-- maneira manual de criar um link para o menu

 <li><router-link to="/cadastro">Cadastro</router-link></li>
 
  -->
  <nav>
    <ul>
      <!-- criar o menu dinamicamente com base nas nossas rotas declaradas -->
      <li v-for="(route, index) in rotas" v-bind:key="index">
        <router-link :to="route.path ? route.path : '/'">{{ route.titulo }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
      //validacao de propriedade
      rotas: {
          type: Array,
          required: true
      }
  }
};
</script>

<style scoped>
</style>