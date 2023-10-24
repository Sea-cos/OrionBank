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
}