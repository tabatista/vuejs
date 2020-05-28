<!-- Single file template -->
<template>
  <!--apresentacao do componente-->
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>
    <input
      type="search"
      class="filtro"
      v-on:input="filtro = $event.target.value"
      placeholder="Filtre por parte do titulo"
    />
    {{ filtro }}
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="(foto, index) in fotosComFiltro" v-bind:key="index">
        <meu-painel :titulo="foto.titulo">
          <img class="imagem-responsiva" :src="foto.url" :alt="foto.titulo" />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
//comportamento e dados do componente

//onde importamos outros componentes
import Painel from "./components/shared/painel/Painel";

export default {
  //onde declaramos como o componente sera utilizado
  components: {
    "meu-painel": Painel //se fosse uma string sem o hifen poderia ser declarado sem aspas, mas eh uma boa pratica utilizar um prefixo
  },

  //os dados do componente
  data() {
    return {
      titulo: "VueStudy",
      fotos: [],
      filtro: ""
    };
  },

  computed: {
    //toda computed property eh escrita como um metodo, mas na view/template utilizamos como uma propriedade, sem o ()
    fotosComFiltro() {
      //assim como no template/view podemos acessar uma propriedade da funcao data() acima, podemos acessar aqui
      if (this.filtro) {
        //filtrar
        let exp = new RegExp(this.filtro.trim(), "i"); //o i eh de insensitive, tanto faz caixa alta ou baixa
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
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

.filtro {
  display: block;
  width: 100%;
}
</style>
