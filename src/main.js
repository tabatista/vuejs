import Vue from 'vue'
import App from './App.vue'

//view instance - a cola entre o componente e o vue
//el: elemento do index.html para ser o alvo do componente
//propriedade com a funcao render: recebe um parametro (chamado de h pelo Vue cli), passamos o componente que queremos renderizar (no caso, o App)
new Vue({
  el: '#app',
  render: h => h(App)
})
