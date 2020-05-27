<!-- Single file template -->
<template>
  <!--apresentacao do componente-->
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="(foto, index) in fotos" v-bind:key="index">
        <div class="painel">
          <h2 class="painel-titulo">{{ foto.titulo }}</h2>
          <div class="painel-conteudo">
            <img class="imagem-responsiva"  :src="foto.url" :alt="foto.titulo" />
          </div>
        </div>
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
    let promise = this.$http.get("http://localhost:3000/v1/fotos");

    //ao transformar os dados da resposta (res) em json, temos outra promise retornada
    promise
      .then(res => res.json())
      .then(
        fotosRes => (this.fotos = fotosRes),
        err => console.error(err)
      );
  }
};
</script>

<style>
.corpo {
  font-family: Helvetica, sans-serif;
  width: 96%;
  margin: 0 auto;
}

.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.imagem-responsiva {
    width: 100%;
  }

/* estilo do painel */

.painel {
  padding: 0 auto;
  border: solid 2px grey;
  display: inline-block;
  margin: 5px;
  box-shadow: 5px 5px 10px grey;
  width: 200px;
  height: 100%;
  vertical-align: top;
  text-align: center;
}

.painel .painel-titulo {
  text-align: center;
  border: solid 2px;
  background: lightblue;
  margin: 0 0 15px 0;
  padding: 10px;
  text-transform: uppercase;
}
</style>
