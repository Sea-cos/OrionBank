

class QrCode {

    public ID: number;
    public Codigo: string;
    public CodigoConta: string;
    public Chave_Pix: string;
    public Valor: number;
    public EMV: string;
    public DtInclusao: Date;

    constructor (id: number, codigo: string, codigoConta: string, 
            chavePix: string, valor: number, emv: string, dtInclusao: Date) {

        this.ID = id;
        this.Codigo = codigo;
        this.CodigoConta = codigoConta;
        this.Chave_Pix = chavePix;
        this.Valor = valor;
        this.EMV = emv;
        this.DtInclusao = dtInclusao;
    }
}


export {
    QrCode
}