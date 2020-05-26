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
      fotos: []
    };
  },
  created() {
    //assim que o componente eh criado, vamos buscar a principio os dados da nossa API
    //this eh referente ao proprio componente, o vue.js consegue acessar facilmente as propriedades do objeto da funcao data
    //$http eh o artefato do modulo vue-resource

    //invocamos o servico get passando sua url, temos como retorno uma promise
    let promise = this.$http.get('http://localhost:3000/v1/fotos');

  //ao transformar os dados da resposta (res) em json, temos outra promise retornada
    promise
    .then(res => res.json())
    .then(fotosRes => this.fotos = fotosRes, err => console.error(err));
  }
};
</script>

<style>
</style>
