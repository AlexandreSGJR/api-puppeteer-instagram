exports.get = async (req, res, next) => {

    let isValid = false;
    let message = "Erro ao coletar os dados.";

    let instagramAccount = {
        username: 'alexandre_sgjr',
        password: 'xandy_bya'
    } 

    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({headless: false});
    var page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
            
    await page.goto('https://www.instagram.com/rafanildsz/');

    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', instagramAccount.username);
    await page.type('input[name="password"]', instagramAccount.password);

    await Promise.all([
        page.waitForNavigation(),
        page.click('button[type="submit"]')
    ]);

    await page.close();
    page = await browser.newPage();
    await page.goto('https://www.instagram.com/rafanildsz/');

    const imgList = await page.evaluate(() => {
        // funcao executada no browser

        //pegar as imagens
        const nodeList = document.querySelectorAll('article img');
        // passar nodeList para array
        const imgArray = [...nodeList];

        //transformar os elementos em objetos js
        const list = imgArray.map( ({ src }) => ({
            src
        }));

        return list;
    });

    //fechar navegador
    await browser.close();

    //envia resposta
    res.send({
        "Message": message,
        "IsValid": isValid,
        "Data": imgList,
    });    
};