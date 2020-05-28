import Cadastro from './components/cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';

//uma rota eh um objeto js com duas propriedades
//o path vazio '' equivale a localhost:3000/#/
export const routes = [
    { path: '', component: Home },
    { path: '/cadastro', component: Cadastro }
];