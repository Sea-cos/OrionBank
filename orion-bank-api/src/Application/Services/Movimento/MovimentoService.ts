import { Movimento } from "../../../Domain/Entities/Movimento";
import { MovimentoPixDto } from "../../DTOs/MovimentoDto";
import { IMovimentoService } from "../../Interfaces/Movimento/IMovimentoService";
import { MovimentoRepository } from "../../../Data/Repositories/Movimento/MovimentoRepository";
import { AbrirContaRepository } from "../../../Data/Repositories/CriarConta/AbrirContaRepository";
import { SaldoRepository } from "../../../Data/Repositories/Saldo/SaldoRepository";
import { ChavePixRepository } from "../../../Data/Repositories/ChavePix/ChavePixRepository";
import { TipoTransacao } from "../../../Enums/TipoTransacao";
import { v4 as uuidv4 } from 'uuid';

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
        if(saldoFinal < 0) {
            throw new Error("Saldo insulficiente para realizar a trasação.");
        }

        const chave = await chavePixRepository.ObterChavePixPorChave(movimento.chavePix);
        if(!chave) {
            throw new Error("Chave pix inexistente.");
        }

        movimento.descTransacao = TipoTransacao.PixString;
        movimento.tipoTransacao = TipoTransacao.Pix;

        await movimentoRepository.RealizarTransacaoPixViaChave(th.DtoParaDomainPix(movimento))

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

    private ValidarCPF(cpf: string) {
        cpf = cpf.replace(/[\s.-]*/igm, '')
        if (
            !cpf ||
            cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999" 
        ) {
            return false
        }
        var soma = 0
        var resto
        for (var i = 1; i <= 9; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0
        if (resto != parseInt(cpf.substring(9, 10)) ) return false
        soma = 0
        for (var i = 1; i <= 10; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0
        if (resto != parseInt(cpf.substring(10, 11) ) ) return false
        return true
    }

}