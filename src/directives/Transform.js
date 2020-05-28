import Vue from 'vue';

/* DIRETIVA CRIADA*/

//1º parametro: nome da diretiva (usa a diretiva com o v- na frente do nome)
//2º parametro: objeto js com as configuracoes da diretiva
Vue.directive('meu-transform', {

    //eh um hook/gancho chamado toda vez que a diretiva se prende/eh associada ao elemento do DOM
    bind(el, binding, vnode) {
        //el eh  uma referencia ao elemento do DOM o qual a diretiva foi associada
        //o binding.value recupera o parametro passado para a diretiva em sua declaracao
        //nao se pode passar mais de um parametro, mas pode passar um objeto js com propriedades7
        //o binding.modifiers recupera os modificadores (declarado depois do ponto. Ex: v-meu-transform.animate sendo o animate o modificador)
        let current = 0;
        el.addEventListener('dblclick', function () {
            let incremento = binding.value || 90;

            //eh possivel acessar mais de um modificador
            if (binding.modifiers.reverse) current -= incremento;
            else current += incremento;


            if (binding.modifiers.animate)
                el.style.transition = 'transform 0.5s';

            el.style.transform = `rotate(${current}deg)`;
        });

    }

});