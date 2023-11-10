import puppeteer from "puppeteer"

export async function GerarPDF() {

    const htmlContent = `
    <html>
    <head>
        <title>Exemplo de PDF</title>
    </head>
    <body>
        <h1>Meu PDF</h1>
        <p>Este é um exemplo de PDF gerado a partir de HTML usando Node.js e Puppeteer.</p>
    </body>
    </html>`;
 
    const outputPath = `C:\\Users\\gustavo_santo\\Documents\\SA\\output.pdf`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    await page.pdf({ path: outputPath, format: 'A4' });

    await browser.close();

    console.log(`PDF gerado com sucesso em: ${outputPath}`);

}