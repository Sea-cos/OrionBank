import { Movimento } from "../../../Domain/Entities/Movimento";
import { MovimentoPixDto } from "../../DTOs/MovimentoDto";
import { IMovimentoService } from "../../Interfaces/Movimento/IMovimentoService";
import { MovimentoRepository } from "../../../Data/Repositories/Movimento/MovimentoRepository";
import { AbrirContaRepository } from "../../../Data/Repositories/CriarConta/AbrirContaRepository";
import { SaldoRepository } from "../../../Data/Repositories/Saldo/SaldoRepository";


const movimentoRepository = new MovimentoRepository()
const contaRepository = new AbrirContaRepository()
const saldoRepository = new SaldoRepository()

export class MovimentoService implements IMovimentoService {

    async RealizarTransacaoPixViaChave(movimento: MovimentoPixDto): Promise<void> {
        
        let th = this;

        await th.ValidarParametros(movimento)

        const saldoOrigem = await saldoRepository.ObterSaldoPorCodigo(movimento.codigoContaOrigem)
        let teste = saldoOrigem.Saldo - movimento.valor
        if(teste < 0) {
            throw new Error("Saldo insulficiente para realizar a trasação.");
        }

    }

    async ObterUltimasTransacoes(codigoConta: string): Promise<Movimento> {
        
        if(codigoConta === null || codigoConta.trim() === "" || codigoConta.trim().length != 36) {
            throw new Error("Erro interno.")
        }

        return await movimentoRepository.ObterUltimasTransacoes(codigoConta);

    }

    private async ValidarParametros(moviDto: MovimentoPixDto) : Promise<void> {

        if(moviDto.codigoContaOrigem === undefined || 
        moviDto.codigoContaOrigem === null || 
        moviDto.codigoContaOrigem.trim() === "" || 
        moviDto.codigoContaOrigem.trim().length != 36) {
            throw new Error("Erro interno.")
        }

        if(moviDto.codigoContaDestino === undefined || 
        moviDto.codigoContaDestino === null || 
        moviDto.codigoContaDestino.trim() === "" || 
        moviDto.codigoContaDestino.trim().length != 36) {
            throw new Error("Erro interno.")
        }

        if(moviDto.valor === undefined || moviDto.valor === null || moviDto.valor < 0) {
            throw new Error("Valor da transação inválido.")
        }

        if(moviDto.chavePix === undefined || 
        moviDto.chavePix === null || 
        moviDto.chavePix.trim() === "" ||
        moviDto.chavePix.trim().length > 100) {
            throw new Error("Chave pix inválida.")
        }

        if(moviDto.infoAdicional === undefined || 
        moviDto.infoAdicional === null || 
        moviDto.infoAdicional.trim() === "" ||
        moviDto.infoAdicional.trim().length > 255) {
            throw new Error("Informação adicional inválida.")
        }

        if(!await contaRepository.BuscarContaPorCodigo(moviDto.codigoContaOrigem)) {
            throw new Error("Erro interno.")
        }

        if(!await contaRepository.BuscarContaPorCodigo(moviDto.codigoContaDestino)) {
            throw new Error("Erro interno.")
        }

    }

    private DtoParaDomainPix(moviDto: MovimentoPixDto) : Movimento {
        return {
            CodigoContaOrigem: moviDto.codigoContaOrigem,
            CodigoContaDestino: moviDto.codigoContaDestino,
            Valor: moviDto.valor,
            Chave_Pix: moviDto.chavePix,
            InfoAdicional: moviDto.infoAdicional,
            DescMovimento: moviDto.descTransacao,
            TipoTransacao: moviDto.tipoTransacao,
            DtMovimento: moviDto.dtMovimento
        } as Movimento
    }

}