import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routers';
import './directives/Transform'; //ao importar assim, ele eh registrado automaticamente no global view object
import VeeValidate from 'vee-validate';
import msg from './pt_BR';

//import css dentro de um modulo
import 'bootstrap/dist/css/bootstrap.css';

//registrando o modulo/plugin global view object, alguns artefatos do vue-resource vao estar disponiveis em todos os componentes da aplicacao
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';

//registrando para o uso de rotas
Vue.use(VueRouter);

//criando um roteador
const router = new VueRouter({
  routes: routes,
  mode: 'history'
});
//o mode remove a # da url para acessarmos as rotas

//em js quando a propriedade e o valor tem o mesmo nome, eh possivel emitir o nome da propriedade
//exemplo
//const router = new VueRouter({routes});

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

//view instance - a cola entre o componente e o vue
//el: elemento do index.html para ser o alvo do componente
//propriedade com a funcao render: recebe um parametro (chamado de h pelo Vue cli), passamos o componente que queremos renderizar (no caso, o App)
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
