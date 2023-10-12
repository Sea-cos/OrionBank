

class SolicitacaoAberturaConta {

    public ID: number;
    public Codigo: string;
    public MensagemSolicitacao: string;
    public Situacao: number;
    public DtSituacao: Date;
    public DtInclusao: Date

    constructor(id: number, codigo: string, mensagemSolicitacao: string,
            situacao: number, dtSituacao: Date, dtInclusao: Date) {

        this.ID = id;
        this.Codigo = codigo;
        this.MensagemSolicitacao = mensagemSolicitacao;
        this.Situacao = situacao;
        this.DtInclusao = dtInclusao;
        this.DtSituacao = dtSituacao;
    }
}

export {
    SolicitacaoAberturaConta
}