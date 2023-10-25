import { AbrirContaRepository } from "../../../Data/Repositories/CriarConta/AbrirContaRepository";
import { Conta } from "../../../Domain/Entities/Conta";
import { ContaDto } from "../../DTOs/ContaDto";
import { SolicitacaoAberturaContaDto } from "../../DTOs/SolicitacaoAberturaContaDto";
import { IAbrirContaService } from "../../Interfaces/CriarConta/IAbrirContaService";


export class AbrirContaService implements IAbrirContaService {

    async ObterSolicitacoesAberturaDeConta(take: number, skip: number): Promise<Array<SolicitacaoAberturaContaDto>> {
        
        if(take.toString() === "NaN" || take === 0) {
            throw new Error("Valor de (take) inválido")
        }
        
        if(skip.toString() === "NaN") {
            throw new Error("Valor de (skip) inválido")
        }

        const abrirContaRepository = new AbrirContaRepository()
        const registrosSolicitacao = await abrirContaRepository.ObterSolicitacoesAberturaDeConta(take, skip)

        let registros: Array<SolicitacaoAberturaContaDto> = [];

        if(registrosSolicitacao.length != 0) {
            for(let cont = 0; cont < registrosSolicitacao.length; cont++) {
                const conta = JSON.parse(
                    registrosSolicitacao[cont].MensagemSolicitacao
                ) as Conta

                registros.push({
                    ID: registrosSolicitacao[cont].ID,
                    Codigo: registrosSolicitacao[cont].Codigo,
                    DtInclusao: registrosSolicitacao[cont].DtInclusao,
                    DtSituacao: registrosSolicitacao[cont].DtInclusao,
                    Situacao: registrosSolicitacao[cont].Situacao,
                    conta: conta
                })
            }
        }

        return registros;
    }

    async EfetuarAberturaDeConta(contaDto: ContaDto, codigoSolicitacao: string): Promise<void> {
        let th = this

        th.ValidarCriacaoDeConta(contaDto)

        if(codigoSolicitacao === null || codigoSolicitacao.trim() === "") {
            throw new Error("Codigo solicitação inválido.")
        }

        const abrirContaRepository = new AbrirContaRepository()
        let conta = th.DtoToDomain(contaDto)
        
        await abrirContaRepository.EfetuarAberturaDeConta(conta, codigoSolicitacao)
    }

    async SolicitacaoAberturaDeConta(contaDto: ContaDto): Promise<void> {
        let th = this
        th.ValidarCriacaoDeConta(contaDto)

        const abrirContaRepository = new AbrirContaRepository()
        const conta = th.DtoToDomain(contaDto)

        await abrirContaRepository.SolicitacaoAberturaDeConta(JSON.stringify(conta));
    }
    
    private ValidarCriacaoDeConta(contaDto: ContaDto) : void {
        
        if(this.ValidarDocumentoFederal(contaDto.DocumentoFederal) != true) {
            throw new Error("Documento federal inválido.")
        }

        if(contaDto.NomeCompleto === null || contaDto.NomeCompleto.trim() === "" ||
        contaDto.NomeCompleto.length > 200 || contaDto.NomeCompleto.length < 5) {
            throw new Error("Nome é obrigatório. Nome tem que estar entre 5 e 200 caracteres.")
        }

        if(contaDto.Senha === null || contaDto.Senha.trim() === "") {
            throw new Error("Senha é obrigatória.")
        }

        if(contaDto.Email === null || contaDto.Email.trim() === "" || 
        contaDto.Email.length > 100) {
            throw new Error("Email é obrigatório. Email tem que conter no máximo 100 caracteres.")
        }

        if(contaDto.TelefoneCelular === null || contaDto.TelefoneCelular.trim() === "" ||
        contaDto.TelefoneCelular.length != 11) {
            throw new Error("Número de telefone é obrigatório.")
        }

        if(contaDto.CEP === null || contaDto.CEP.trim() === "" ||
        contaDto.CEP.length != 8) {
            throw new Error("CEP é obrigatório.")
        }

        if(contaDto.Logradouro === null || contaDto.Email.trim() === "" || 
        contaDto.Logradouro.length > 60) {
            throw new Error("Logradouro é obrigatório. Logradouro tem que conter no máximo 60 caracteres.")
        }

        if(contaDto.NumeroResidencial === null || contaDto.NumeroResidencial.toString().trim() === "") {
            throw new Error("Número residencial é obrigatório.")
        }
    }

    private ValidarDocumentoFederal(documentoFederal: string) : boolean {
        if(documentoFederal === null) return false
        if(documentoFederal.length != 11 && documentoFederal.length != 14) return false
        return true
    }

    private DtoToDomain(contaDto: ContaDto) : Conta {
        return {
            DocumentoFederal: contaDto.DocumentoFederal,
            NomeCompleto: contaDto.NomeCompleto,
            Senha: contaDto.Senha,
            Email: contaDto.Email,
            DtNasc: contaDto.DtNasc,
            TelefoneCelular: contaDto.TelefoneCelular,
            CEP: contaDto.CEP,
            Logradouro: contaDto.Logradouro,
            NumeroResidencial: contaDto.NumeroResidencial,
            DtInclusao: new Date(),
            Situacao: 0,
            DtSituacao: new Date()  
        } as Conta
    }
}