export default class FotoService {

    constructor(resource) {
        //recebemos o resource para utilizar as requisicoes http para API
        //criamos esse coringa {/id} para utilizar o delete do resource criado
        //passando no corpo no momento da delecao com o mesmo nome, nesse caso "id"
        this._resource = resource('v1/fotos{/id}');
    }

    buscar(id) {
        return this._resource
            .get({ id })
            .then(res => res.json());
    }

    listar() {
        //query equivale ao metodo get
        //ao transformar os dados da resposta (res) em json, temos outra promise retornada
        return this._resource
            .query()
            .then(res => res.json())
    }

    cadastrar(foto) {

        if (foto._id)
            return this._resource.update({ id: foto._id }, foto);
        else
            return this._resource.save(foto);
    }

    apagar(id) {
        return this._resource.delete({ id });
    }
}