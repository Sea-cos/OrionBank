import { Request, Response } from "express";
import { ExtratoService } from "../../Application/PDF/ExtratoService";
import { GerarPDF } from "../../Application/PDF/GerarPDF";

const extratoService = new ExtratoService()
export class ExtratoController {

    async ImportarExtrato(request: Request, response: Response) {

        try {

            const { 
                codigoConta,
                dataInicio,
                dataFim
            } = request.body

            await GerarPDF(codigoConta, dataInicio, dataFim);
            const nomeArquivo = `${codigoConta}.pdf`
            const dir = __dirname

            const path = `${dir.replace("\\src\\API\\Controllers", "\\ImportarExtrato")}\\${nomeArquivo}`

            return response.status(200).sendFile(path);

        }  catch(error: any) {
            return response.status(400).json({
                status: "Error",
                message: error.message
            })
        }

    }

    async Extrato(request: Request, response: Response) {

        try {

            const { 
                codigoConta,
                dataInicio,
                dataFim
            } = request.body

            const extrato = await extratoService.FormatarDadosExtrato(codigoConta, dataInicio, dataFim)

            return response.status(200).send(extrato)

        } catch(error: any) {
            return response.status(400).json({
                status: "Error",
                message: error.message
            })
        }

    }

}