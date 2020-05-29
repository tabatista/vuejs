<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Incluindo</h2>

    <form @submit.prevent="gravar()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input
          data-vv-as="TITULO vv"
          name="titulo"
          id="titulo"
          autocomplete="off"
          v-model="foto.titulo"
          v-validate
          data-vv-rules="required|min:3|max:30"
        />
        <span class="error" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input
          name="url"
          id="url"
          autocomplete="off"
          v-model="foto.url"
          v-validate
          data-vv-rules="required"
        />
        <span class="error" v-show="errors.has('url')">{{ errors.first('url') }}</span>
        <!-- com o v-show so exibimos a imagem se a url tiver um valor - lembrando que ele recebe um boolean -->
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo" />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit" />
        <router-link :to="{name: 'home'}">
          <meu-botao rotulo="VOLTAR" tipo="button" />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import Foto from "../../domain/foto/Foto";
import FotoService from "../../domain/foto/FotoService";

export default {
  data() {
    //o nome id eh o coringa que declaramos na nossa rota 'altera'
    return {
      foto: new Foto(),
      id: this.$route.params.id
    };
  },
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },
  methods: {
    gravar() {
      this.$validator.validateAll().then(success => {
        if (success) {
          //enviar dados para a API
          this.service.cadastrar(this.foto).then(
            () => {
              if (this.id) {
                //redireciona para a pagina inicial se for alteracao
                this.$router.push({ name: "home" });
              }
              this.foto = new Foto();
            },
            err => console.error(err)
          );
        }
      });
    }
  },
  created() {
    this.service = new FotoService(this.$resource);

    if (this.id) {
      this.service.buscar(this.id).then(foto => (this.foto = foto));
    }
  }
};
</script>
<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}

.error {
  color: red;
}
</style>