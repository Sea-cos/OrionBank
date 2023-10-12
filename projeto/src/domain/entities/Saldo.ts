

class Saldo {

    public ID: number;
    public Codigo: string;
    public CodigoConta: string;
    public DtAtualizacao: Date;
    public Saldo: number;

    constructor(id: number, codigo: string, codigoConta: string, dtAtualizacao: Date, saldo: number) {

        this.ID = id;
        this.Codigo = codigo;
        this.CodigoConta = codigoConta;
        this.DtAtualizacao = dtAtualizacao;
        this.Saldo = saldo;
    }
}


export {
    Saldo
}