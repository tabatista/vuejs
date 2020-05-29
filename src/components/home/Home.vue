<!-- Single file template -->
<template>
  <!--apresentacao do componente-->
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
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
          <imagem-responsiva
            v-meu-transform:scale.animate="1.2"
            :url="foto.url"
            :titulo="foto.titulo"
          ></imagem-responsiva>
          <!-- se passamos uma string, nao precisa dos dois pontos porque nao ha data-bind -->
          <meu-botao
            tipo="button"
            rotulo="REMOVER"
            :confirmacao="true"
            estilo="perigo"
            @botaoAtivado="remover(foto, index)"
          ></meu-botao>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
//comportamento e dados do componente

//onde importamos outros componentes
import Painel from "../shared/painel/Painel";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva";
import Botao from "../shared/botao/Botao";

// importou  diretiva. Tem que adicionar na propriedade directives logo abaixo!
import transform from "../../directives/Transform";

export default {
  //onde declaramos como o componente sera utilizado
  components: {
    "meu-painel": Painel, //se fosse uma string sem o hifen poderia ser declarado sem aspas, mas eh uma boa pratica utilizar um prefixo
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  directives: {
    "meu-transform": transform
  },

  //os dados do componente
  data() {
    return {
      titulo: "VueStudy",
      fotos: [],
      filtro: "",
      mensagem: ""
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

  methods: {
    //aqui declaramos metodos que podemos invocar a partir da interacao dos componentes
    remover(foto, index) {
      //passamos a url da api com o id da foto
      this.$http.delete(`http://localhost:3000/v1/fotos/${foto._id}`).then(
        () => {
          this.fotos.splice(index, 1);
          this.mensagem = "Foto excluida com sucesso";

        },
        err => {
          console.error(err);
          this.mensagem = "Nao foi possivel excluir a foto";
        }
      );
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

<style scoped>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
