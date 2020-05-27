<template>
  <div class="painel">
    <h2 class="painel-titulo"> {{ titulo }} </h2>
    <!-- o slot eh o local onde inserimos outros elementos html quando um componente utiliza o nosso-->
    <slot class="painel-conteudo"></slot>
  </div>
</template>

<script>
export default {
    
    //propriedade props eh um array onde declaramos as propriedades do componente para serem reutilizadas em bind por outros componentes
    //onde declaramos por interpolacao dentro do nosso proprio componente para serem preenchidas
    props: ['titulo']
};
</script>

<style scoped>
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

* {
    box-shadow: 5px 5px 5px black;
}
</style>
