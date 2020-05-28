import Vue from 'vue';

/* DIRETIVA CRIADA*/

//1º parametro: nome da diretiva (usa a diretiva com o v- na frente do nome)
//2º parametro: objeto js com as configuracoes da diretiva
Vue.directive('meu-transform', {

    //eh um hook/gancho chamado toda vez que a diretiva se prende/eh associada ao elemento do DOM
    bind(el, binding, vnode) {
        //el eh  uma referencia ao elemento do DOM o qual a diretiva foi associada
        //o binding recupera o parametro passado para a diretiva em sua declaracao
        //nao se pode passar mais de um parametro, mas pode passar um objeto js com propriedades
        let current = 0;
        el.addEventListener('dblclick', function () {
            let incremento = 90;
            let animate = false;

            if (binding.value) {
                incremento = binding.value.incremento;
                animate = binding.value.animate;
            }
            current += incremento;
            if (animate)
                el.style.transition = 'transform 0.5s';

            el.style.transform = `rotate(${current}deg)`;
        });

    }

});