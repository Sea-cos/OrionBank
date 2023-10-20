import { Request, Response } from "express";
import { AutenticacaoDto } from "../../Application/DTOs/AutenticacaoDto";
import { AutenticacaoService } from "../../Application/Services/AutenticacaoService";

export class AutenticacaoController {   

    /* Rota: /autenticacao */
    async EfetuarAutenticacao(request: Request, response: Response) {
        try {

            const {
                login,
                senha
            } = request.body;

            const teste = { Login: login, Senha: senha } as AutenticacaoDto
            const _autenticacaoServices = new AutenticacaoService();

            const autorizado = await _autenticacaoServices.EfetuarLogin(teste);
            
            return response.status(200).send(autorizado);

        } catch(e) {
            console.log(e)
            return response.status(400).send(e)
        }
    }
}
