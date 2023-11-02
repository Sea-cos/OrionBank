import { Request, Response } from "express";
import { ChavePixService } from "../../Application/Services/ChavePix/ChavePixService";
import { ChavePixDto } from '../../Application/DTOs/ChavePixDto'

export class ChavePixController {

    async CriarChave(request: Request, response: Response) {

        try {

            const {
                codigoConta,
                chavePix,
                tipoChave,
            } = request.body

            const chavePixDto = {
                CodigoConta: codigoConta,
                Chave_Pix: chavePix,
                TipoChave: parseInt(tipoChave),
            } as ChavePixDto

            const criarChaveService = new ChavePixService()
            await criarChaveService.CriarChavePix(chavePixDto)

            return response.status(200).send()

        } catch(error: any) {
            return response.status(400).send({
                status: "Error",
                message: error.message
            })
        }
    }

    async ObterChavesPixPorCodigoConta(request: Request, response: Response) {

        try {

            const {
                codigoConta
            } = request.query

            const criarChaveService = new ChavePixService()
            const chavesPix = await criarChaveService.ObterChavePixPorCodigoConta(codigoConta === undefined ? "" : codigoConta.toString())

            return response.status(200).send(chavesPix)

        } catch(error: any) {
            return response.status(400).send({
                status: "Error",
                message: error.message
            })
        }

    }

    async InativarChavePix(request: Request, response: Response) {

        try {

            const {
                codigoChave
            } = request.query

            const criarChaveService = new ChavePixService()
            await criarChaveService.InativarChavePix(codigoChave === undefined ? "" : codigoChave.toString())

            return response.status(200).send()

        } catch(error: any) {
            return response.status(400).send({
                status: "Error",
                message: error.message
            })
        }

    }
}