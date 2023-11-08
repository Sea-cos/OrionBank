


export interface MovimentoDto {
    codigoContaOrigem: string;
    codigoContaDestino: string;
    valor: number;
    chavePix: string;
    EMV: string;
    infoAdicional: string;
    descMovimento: string;
    tipoTransacao: number;
    dtMovimento: Date;
}
