import { Request, Response } from "express";
import { GerarPDF } from "../../Application/PDF/GerarPDF";


export class ExtratoController {

    async ImportarExtrato(request: Request, response: Response) {

        try {

            const { codigoConta } = request.params

            await GerarPDF(codigoConta);
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

}