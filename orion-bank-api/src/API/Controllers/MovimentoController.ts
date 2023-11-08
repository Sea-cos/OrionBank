import { Request, Response } from "express";
import { MovimentoPixDto } from "../../Application/DTOs/MovimentoDto";
import { MovimentoService } from "../../Application/Services/Movimento/MovimentoService";

const movimentoService = new MovimentoService()

export class MovimentoController {

    async RealizarTransacaoPixViaChave(request: Request, response: Response) {

        try {

            const {
                valor,
                chavePix,
                infoAdicional
            } = request.body

            const {
                codigoContaDestino,
                codigoContaOrigem
            } = request.query

            const movimento = {
                codigoContaOrigem: codigoContaOrigem,
                codigoContaDestino: codigoContaDestino,
                valor: valor,
                chavePix: chavePix,
                infoAdicional: infoAdicional
            } as MovimentoPixDto

            await movimentoService.RealizarTransacaoPixViaChave(movimento)
            return response.status(200).send()

        } catch(error: any) {
            return response.status(400).json({
                status: "Error",
                message: error.message
            })
        }

    }

}