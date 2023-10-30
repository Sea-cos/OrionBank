import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";
dotenv.config();

function ConfigurarEmail() : nodemailer.Transporter<SMTPTransport.SentMessageInfo> {

    const email = process.env.EMAIL;
    const senhaEmail = process.env.SENHA_EMAIL;

    return nodemailer.createTransport({
        host: "outlook.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: email,
            pass: senhaEmail
        }
    })
}

export async function EnviarEmail(emailConta: string, nome: string, senha: string) : Promise<void> {
    const smtp = ConfigurarEmail()
    
    const email = process.env.EMAIL;
    const contaAprovada = `<h3>
                    <strong>PARABÉNS ${nome}</strong>,
                    sua conta foi aprovada!
                </h3>
                <p>
                    Para dar continuidade com sua conta, peço que acesse o link abaixo para alterar sua senha de acesso!
                </p>
                <p>
                    Senha para primeiro acesso: ${senha}
                </p>
                <a href="https://www.google.com.br">Clique aqui!</a>`;

    const configEmail = {
        from: email,
        to: emailConta,
        subject: "OrionBank - CONTA APROVADA",
        html: contaAprovada
    }

   await smtp.sendMail(configEmail)
}