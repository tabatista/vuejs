import Vue from 'vue';

//1º parametro: nome da diretiva (usa a diretiva com o v- na frente do nome)
//2º parametro: objeto js com as configuracoes da diretiva
Vue.directive('meu-transform', {

    //eh um hook/gancho chamado toda vez que a diretiva se prende/eh associada ao elemento do DOM
    bind(el, binding, vnode) {
        //el eh  uma referencia ao elemento do DOM o qual a diretiva foi associada
        let current = 0;
        el.addEventListener('dblclick', function(){
            current+=90;
            el.style.transform = `rotate(${current}deg)`;
        });
        
    }

});