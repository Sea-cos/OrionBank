import { Movimento } from "../../../Domain/Entities/Movimento";
import { MovimentoPixDto } from "../../DTOs/MovimentoDto";
import { IMovimentoService } from "../../Interfaces/Movimento/IMovimentoService";
import { MovimentoRepository } from "../../../Data/Repositories/Movimento/MovimentoRepository";
import { AbrirContaRepository } from "../../../Data/Repositories/CriarConta/AbrirContaRepository";
import { SaldoRepository } from "../../../Data/Repositories/Saldo/SaldoRepository";
import { ChavePixRepository } from "../../../Data/Repositories/ChavePix/ChavePixRepository";
import { TipoTransacao } from "../../../Enums/TipoTransacao";
import { v4 as uuidv4 } from 'uuid';
import { MovimentoDadosBancariosDto } from "../../DTOs/MovimentoDadosBancariosDto";

const movimentoRepository = new MovimentoRepository()
const contaRepository = new AbrirContaRepository()
const saldoRepository = new SaldoRepository()
const chavePixRepository = new ChavePixRepository()

export class MovimentoService implements IMovimentoService {

    async RealizarTransacaoPixViaChave(movimento: MovimentoPixDto): Promise<void> {

        let th = this;
        await th.ValidarParametros(movimento)

        const saldoOrigem = await saldoRepository.ObterSaldoPorCodigo(movimento.codigoContaOrigem)
        let saldoFinal = saldoOrigem.Saldo - movimento.valor
        if (saldoFinal < 0) {
            throw new Error("Saldo insulficiente para realizar a transação.");
        }

        const chave = await chavePixRepository.ObterChavePixPorChave(movimento.chavePix);
        if (!chave) {
            throw new Error("Chave pix inexistente.");
        }

        movimento.descTransacao = TipoTransacao.PixString;
        movimento.tipoTransacao = TipoTransacao.Pix;

        await movimentoRepository.RealizarTransacaoPixViaChave(th.DtoParaDomainPix(movimento))
    }

    async ObterUltimasTransacoes(codigoConta: string): Promise<Array<Movimento>> {

        if (codigoConta === null || codigoConta.trim() === "" || codigoConta.trim().length != 36) {
            throw new Error("Erro interno.")
        }

        return await movimentoRepository.ObterUltimasTransacoes(codigoConta);
    }
    
    async RealizarTransacaoPorDadosBancarios(movimento: MovimentoDadosBancariosDto): Promise<void> {

        let th = this;
        await th.ValidarParametrosDadosBancarios(movimento);

        const contaDestino = await contaRepository.BuscarContaPorDadosContaPagamento(`${movimento.conta}${movimento.contaDigito}`);
        if (!contaDestino) {
            throw new Error("Conta destino inexistente.");
        }

        movimento.codigoContaDestino = contaDestino.Codigo;

        const saldo = await saldoRepository.ObterSaldoPorCodigo(movimento.codigoContaOrigem);
        if(!saldo || saldo.Saldo < parseFloat(movimento.valor)) {
            throw new Error("Saldo insulficiente para realizar a transação.");
        }

        const movimentoDomain = th.DtoParaDomainTransf(movimento);
        await movimentoRepository.RealizarTransacaoPorDadosBancarios(movimentoDomain);
    }

    private async ValidarParametros(moviDto: MovimentoPixDto): Promise<void> {

        if (moviDto.codigoContaOrigem === undefined ||
            moviDto.codigoContaOrigem === null ||
            moviDto.codigoContaOrigem.trim() === "" ||
            moviDto.codigoContaOrigem.trim().length != 36) {
            throw new Error("Erro interno.")
        }

        if (moviDto.codigoContaDestino === undefined ||
            moviDto.codigoContaDestino === null ||
            moviDto.codigoContaDestino.trim() === "" ||
            moviDto.codigoContaDestino.trim().length != 36) {
            throw new Error("Erro interno.")
        }

        if (moviDto.valor === undefined || moviDto.valor === null || moviDto.valor < 0) {
            throw new Error("Valor da transação inválido.")
        }

        if (moviDto.chavePix === undefined ||
            moviDto.chavePix === null ||
            moviDto.chavePix.trim() === "" ||
            moviDto.chavePix.trim().length > 100) {
            throw new Error("Chave pix inválida.")
        }

        if (!await contaRepository.BuscarContaPorCodigo(moviDto.codigoContaOrigem)) {
            throw new Error("Erro interno.")
        }

        if (!await contaRepository.BuscarContaPorCodigo(moviDto.codigoContaDestino)) {
            throw new Error("Erro interno.")
        }

        if (moviDto.codigoContaOrigem === moviDto.codigoContaDestino) {
            throw new Error("Não é possível realizar uma transação para duas contas iguais.")
        }
    }

    private async ValidarParametrosDadosBancarios(movi: MovimentoDadosBancariosDto) : Promise<void> {

        if (movi.agencia === undefined ||
            movi.agencia === null ||
            movi.agencia.trim() === ""
        ) {
            throw new Error("Agência é obrigatória.");
        }

        if (movi.agencia.trim() != "0001") {
            throw new Error("Agência inexistente.");
        }

        if (movi.conta === undefined ||
            movi.conta === null ||
            movi.conta.trim() === ""            
        ) {
            throw new Error("Conta é obrigatória.");
        }

        if (movi.conta.trim().length != 8 || parseInt(movi.conta).toString() === "NaN") {
            throw new Error("A conta tem que conter 8 dígitos.");
        }

        if (movi.contaDigito != "8") {
            throw new Error("O dígito da conta não pode ser diferente de '8'")
        }

        const contaOrigem = await contaRepository.BuscarContaPorCodigo(movi.codigoContaOrigem);
        if (!contaOrigem) {
            throw new Error("Erro interno.");
        }

        if (`${movi.conta}${movi.contaDigito}` === contaOrigem.ContaPgto) {
            throw new Error("Não pode ser feita uma tranferência para si mesmo.");
        }

    } 

    private DtoParaDomainPix(moviDto: MovimentoPixDto): Movimento {

        return {
            Codigo: uuidv4(),
            CodigoContaOrigem: moviDto.codigoContaOrigem,
            CodigoContaDestino: moviDto.codigoContaDestino,
            Valor: moviDto.valor,
            Chave_Pix: moviDto.chavePix,
            InfoAdicional: moviDto.infoAdicional,
            DescTransacao: moviDto.descTransacao,
            TipoTransacao: TipoTransacao[moviDto.tipoTransacao === 1 ? "Pix" :
                moviDto.tipoTransacao === 2 ? "Ted" : "QrCode"],
            DtMovimento: new Date()
        } as Movimento
    }

    private DtoParaDomainTransf(moviDto: MovimentoDadosBancariosDto) : Movimento{
        
        return {
            CodigoContaOrigem: moviDto.codigoContaOrigem,
            CodigoContaDestino: moviDto.codigoContaDestino,
            InfoAdicional: moviDto.descricao,
            TipoTransacao: TipoTransacao.Transferencia,
            DtMovimento: new Date(),
            Valor: moviDto.valor,
            DescTransacao: TipoTransacao.TransferenciaString
        } as unknown as Movimento

    }

}