
class ChaveFavorita {

    public ID: number;
    public Codigo: string;
    public CodigoConta: string;
    public Chave: string;
    public TipoChave: number;

    constructor (id: number, codigo: string, codigoConta: string, chave: string, tipoChave: number){
        this.ID = id;
        this.Codigo = codigo;
        this.CodigoConta = codigoConta;
        this.Chave = chave;
        this.TipoChave = tipoChave;
    }
}

export {
    ChaveFavorita
}