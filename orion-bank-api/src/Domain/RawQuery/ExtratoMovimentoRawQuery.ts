

export interface ExtratoMovimentoRawQuery {
    Data: Date
    TipoTransacao: string
    Lancamento: string
    Descricao: string
    Valor: string
    CodigoContaDestino: string
    CodigoContaOrigem: string
    NomeDestino: string
    NomeOrigem: string
}