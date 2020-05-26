<!-- Single file template -->
<template>
  <!--apresentacao do componente-->

  <div>
    <h1>{{titulo}}</h1>

    <ul>
      <li v-for="(foto, index) in fotos" v-bind:key="index">
        <img :src="foto.url" :alt="foto.titulo" />
      </li>
    </ul>
  </div>
</template>

<script>
//comportamento e dados do componente

export default {
  data() {
    return {
      titulo: "VueStudy",
      fotos: [
        {
          url:
            "https://www.catlicious.com.br/img/blog/0426d2d89e6b935a7ec8dfebd8e3cb044f34edd0.jpeg?w=750&h=425&fit=crop",
          titulo: "gato"
        },
        {
          url:
            "https://www.catlicious.com.br/img/blog/0426d2d89e6b935a7ec8dfebd8e3cb044f34edd0.jpeg?w=750&h=425&fit=crop",
          titulo: "gato2"
        }
      ]
    };
  }
};
</script>

<style>
</style>
