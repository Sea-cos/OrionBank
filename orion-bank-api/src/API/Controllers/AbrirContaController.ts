import { Request, Response } from "express";
import { ContaDto } from "../../Application/DTOs/ContaDto";
import { AbrirContaService } from "../../Application/Services/CriarConta/AbrirContaService";

export class AbrirContaController {

    /* rote: /abrirConta/solicitacao */
    async SolicitarAberturaDeConta(request: Request, response: Response) {

        try {

            const {
                DocumentoFederal,
                NomeCompleto,
                Senha,
                Email,
                DtNasc,
                TelefoneCelular,
                CEP,

                Logradouro,
                NumeroResidencial,
            } = request.body

            const contaDto = {
                DocumentoFederal: DocumentoFederal,
                NomeCompleto: NomeCompleto,
                Senha: Senha,
                Email: Email,
                DtNasc: DtNasc,
                TelefoneCelular: TelefoneCelular,
                CEP: CEP,
                Logradouro: Logradouro,
                NumeroResidencial: NumeroResidencial
            } as ContaDto

            const abrirContaService = new AbrirContaService()
            await abrirContaService.SolicitacaoAberturaDeConta(contaDto);
            return response.status(201).send();

        } catch(error: any) {
            return response.status(400).json({
                status: "Error",
                message: error.message
            })
        }
    }

    async ObterRegistrosSolicitacaoAberturaConta(request: Request, response: Response) {
        
        try {

            const {
                take,
                skip
            } = request.query
            
            if(take === undefined || skip === undefined) {
                return response.status(400).json({
                    status: "Error",
                    message: "Informações faltantes."
                })
            }

            const abrirContaService = new AbrirContaService()
            const registros = await abrirContaService.ObterSolicitacoesAberturaDeConta(parseInt(take.toString()), parseInt(skip.toString()));

            return response.status(200).send(registros)

        } catch(error: any) {
            return response.status(400).json({
                status: "Error",
                message: error.message
            })
        }
    }
}
