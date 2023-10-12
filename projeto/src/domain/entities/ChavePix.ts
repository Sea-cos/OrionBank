

class ChavePix {

    public ID: number;
    public Codigo: string;
    public CodigoConta: string;
    public Chave_Pix: string;
    public TipoChave: number;
    public Situacao: number;
    public DtSituacao: Date;
    public DtInclusao: Date;

    constructor(id: number, codigo: string, codigoConta: string, chavePix: string,
            tipoChave: number, situacao: number, dtSituacao: Date, dtInclusao: Date) {

        this.ID = id;
        this.Codigo = codigo;
        this.CodigoConta = codigoConta;
        this.Chave_Pix = chavePix;
        this.TipoChave = tipoChave;
        this.Situacao = situacao;
        this.DtSituacao = dtSituacao;
        this.DtInclusao = dtInclusao;
    }

}


export {
    ChavePix
}