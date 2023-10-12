

class SaldoData {

    public ID: number;
    public Codigo: string;
    public CodigoConta: string;
    public SaldoInicial: number;
    public SaldoFinal: number;
    public DtInclusao: Date;

    constructor(id: number, codigo: string, codigoConta: string,
            saldoInicial: number, saldoFinal: number, dtInclusao: Date) {

        this.ID = id;
        this.Codigo = codigo;
        this.CodigoConta = codigoConta;
        this.SaldoInicial = saldoInicial;
        this.SaldoFinal = saldoFinal;
        this.DtInclusao = dtInclusao;
    }
}

export {
    SaldoData
}