

export interface ISaldoRepository {
    IniciarSaldoInicialConta(codigoConta: string) : Promise<void>
}