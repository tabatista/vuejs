const Cadastro = () => System.import('./components/cadastro/Cadastro.vue'); //carregamento assincrono
import Home from './components/home/Home.vue';

//uma rota eh um objeto js com duas propriedades
//o path vazio '' equivale a localhost:3000/#/
export const routes = [
    { path: '', name: 'home', component: Home, titulo: 'Home', menu: true },
    { path: '/cadastro', name: 'cadastro', component: Cadastro, titulo: 'Cadastro', menu: true },
    { path: '/cadastro/:id', name: 'altera', component: Cadastro, titulo: 'Cadastro', menu: false },
    { path: '*', component: Home, menu: false }
];