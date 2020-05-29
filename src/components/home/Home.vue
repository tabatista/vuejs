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

          <router-link :to="{name: 'altera', params: {id: foto._id}}">
            <meu-botao tipo="button" rotulo="ALTERAR"></meu-botao>
          </router-link>
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

//para usarmos os servicos da API
import FotoService from "../../domain/foto/FotoService";

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
      this.service.apagar(foto._id).then(
        () => {
          this.fotos.splice(index, 1);
          this.mensagem = "Foto excluida com sucesso";
        },
        err => 
          this.mensagem = err.message
        
      );
    }
  },
  created() {
    this.service = new FotoService(this.$resource);
    //assim que o componente eh criado, vamos buscar a principio os dados da nossa API
    //this eh referente ao proprio componente, o vue.js consegue acessar facilmente as propriedades do objeto da funcao data

    this.service.listar().then(
      fotosRes => (this.fotos = fotosRes),
      err => this.mensagem = err.message
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
