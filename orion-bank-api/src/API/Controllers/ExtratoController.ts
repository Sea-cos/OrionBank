import { Request, Response } from "express";
import path from "path";
import { ExtratoService } from "../../Application/PDF/ExtratoService";
import { GerarPDF } from "../../Application/PDF/GerarPDF";
import fs from "fs";

const extratoService = new ExtratoService()
export class ExtratoController {

    async ExportarExtrato(request: Request, response: Response) {

        try {

            const { 
                codigoConta,
                dataInicio,
                dataFim
            } = request.body
           
            await GerarPDF(codigoConta, dataInicio, dataFim);
            const nomeArquivo = `${codigoConta}.pdf`
            const dir = __dirname

            const ds = `${dir.replace("\\src\\API\\Controllers", "\\ImportarExtrato")}\\${nomeArquivo}`
            const tes = path.join(dir, ds);

            var data = fs.readFileSync(ds);
            response.contentType("application/pdf");

            return response.status(200).send(data);

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