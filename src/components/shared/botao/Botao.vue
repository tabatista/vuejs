<template>
  <button @click="dispararAcao()" class="botao" :class="estiloBotao" :type="tipo">{{rotulo}}</button>
</template>

<script>
export default {
  props: ["tipo", "rotulo", "confirmacao", "estilo"],
  methods: {
    dispararAcao() {
      //quando usamos um data-binding com : ou v-bind em outro componente ao importar este aqui, ele avalia a expressao passada...
      //nesse caso, nossa string confirmacao se torna um boolean se passarmos true ou false ao declarar :confirmacao ao inves de confirmacao
      if (this.confirmacao) {
        if (confirm("Confirma opercao?")) 
            this.$emit("botaoAtivado"); //dispara o evento "botaoAtivado"
      } else {
        this.$emit("botaoAtivado");
      }
    }
  },

  computed: {
    estiloBotao() {
      if (this.estilo == "padrao" || !this.estilo) return "botao-padrao";

      if (this.estilo == "perigo") return "botao-perigo";
    }
  }
};
</script>

<style scoped>
.botao {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2em;
}

.botao-perigo {
  background: firebrick;
  color: white;
}

.botao-padrao {
  background: darkcyan;
  color: white;
}
</style>