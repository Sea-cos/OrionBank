

class Movimento {

    public ID: number;
    public Codigo: string;
    public CodigoContaOrigem: string;
    public CodigoContaDestino: string;
    public Valor: number;
    public Chave_Pix: string;
    public EMV: string;
    public InfoAdicional: string;
    public DescMovimento: string;
    public TipoTransacao: number;
    public DtMovimento: Date;

    constructor(id: number, codigo: string, codigoContaOrigem: string, codigoContaDestino: string,
            valor: number, chavePix: string, emv: string, infoAdicional: string, descMovimento: string,
            tipoTransacao: number, dtMovimento: Date) {

        this.ID = id;
        this.Codigo = codigo;
        this.CodigoContaOrigem = codigoContaOrigem;
        this.CodigoContaDestino = codigoContaDestino;
        this.Valor = valor;
        this.Chave_Pix = chavePix;
        this.EMV = emv;
        this.InfoAdicional = infoAdicional;
        this.DescMovimento = descMovimento;
        this.TipoTransacao = tipoTransacao;
        this.DtMovimento = dtMovimento;
    }
}

export {
    Movimento
}