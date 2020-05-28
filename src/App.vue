<template>
  <!-- ora exibe um componente, ora exibe outro -->
  <div class="corpo">
    <!-- maneira manual de criar um link para o menu

 <li><router-link to="/cadastro">Cadastro</router-link></li>
 
    -->
    <nav>
      <ul>
        <!-- criar o menu dinamicamente com base nas nossas rotas declaradas -->
        <li v-for="(route, index) in routes" v-bind:key="index">
          <router-link :to="route.path ? route.path : '/'">{{ route.titulo }}</router-link>
        </li>
      </ul>
    </nav>
    <transition name="pagina">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { routes } from "./routers";
export default {
  data() {
    return {
      routes
    };
  }
};
</script>

<style>
.corpo {
  font-family: Helvetica, sans-serif;
  width: 96%;
  margin: 0 auto;
}
.pagina-enter,
.pagina-leave-active {
  opacity: 0;
}

.pagina-enter-active,
.pagina-leave-active {
  transition: opacity 0.4s;
}
</style>
