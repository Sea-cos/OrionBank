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
                TipoChave: tipoChave,
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
}