const puppeteer = require('puppeteer');
const reddit = require('./reddit');

const SetSelected = async (options) => {

    // Generierung eines Node Elementes um die Selected Property auf True zu setzten
    const handleOptionEvents = await options.asElement()

    await handleOptionEvents.evaluate( async (option) => {
        option.selected = true;        
    })

}


(async () => {
    try{
        if(true){
            try{
                reddit()
            }catch(e){
                console.log(e.message)
            }
            

        } else {
        // Lounch sichtbaren Browser über Chromium
        const browser = await puppeteer.launch({
            headless: false,
            product: 'chrome'
        });
        const page = await browser.newPage();
        await page.setViewport({width: 1280, height: 800});
        await page.goto('https://www.instagram.com/accounts/emailsignup');

        // Cookiebanner bestätigen
        const consentCookies = await page.waitForSelector('._a9--._a9_0');
        consentCookies.click()

        // Warten bis Content geladen ist
        await page.waitForSelector('._aa4b._add6._ac4d')
        const emailOrPhone = await page.$("[name=\"emailOrPhone\"]")
        const fullName = await page.$("[name=\"fullName\"]")
        const username = await page.$("[name=\"username\"]")
        const password = await page.$("[name=\"password\"]")
        
        // Tippt die Strings in die Input Felder
        if( emailOrPhone !== null ){
            await emailOrPhone.type('don.reply.456@gmail.com')
        
            if( fullName !== null ){
                await fullName.type('Marian Bubatz')
            
                if( username !== null ){
                    await username.type('marian_bubatz_36')
                
                    if( password !== null ){
                        await password.type('#default_sett_pass_x1q3')
                        const inter_0 = setInterval( async () => {
                            const submit_btn = await page.$("[type=\"submit\"]")
                            if(submit_btn!==null){
                                clearInterval(inter_0)
                                // Submit des Formulars mit Nutzerdaten
                                await submit_btn.click()   
                                
                                // Abwarten bis der Content der nächsten Seite geladen ist
                                try{
                                    await page.waitForSelector('select._aau-');
                                }catch(e){
                                    await submit_btn.click()
                                    await page.waitForSelector('select._aau-');
                                }
                                const selectElm = await page.$$('select._aau-')
                                // Iteration durch die 3 Select-Elems
                                var worked = false
                                Array.from(selectElm).forEach( async (selec) => {
                                    
                                    // Deklarierung der Ziel Optionen
                                    var options = null, year = false
                                    try{
                                        // Ersten beiden optionenen für den Monat und Tag 
                                        // können mit jeweils value=3 angesprochen werden  
                                        options = await selec.waitForSelector('option[value="3"]')
                                        console.log('options element with value 3 is running')
                                    }catch(e){
                                        // Geht value=3 ist das Feld für Jahr fokusiert und kann mit value=1995 gewählt werden  
                                        options = await selec.waitForSelector('option[value="1995"]')
                                        console.log('options element with value 1955 is running')
                                        year = true
                                    }
                                    // Trigger des Dropdown Menus
                                    // await selec.click()

                                    await SetSelected(options)
                                    
                                    if(year){
                                        var inter = setInterval(async()=>{
                                            const testHandle = await options.asElement()
                                            const check = await testHandle.evaluate( el => el.selected )
                                            if( check === true ){
                                                // l
                                                // Trigger Dropdown Menu
                                                setTimeout(async()=>{
                                                    if(worked) return;
                                                    await new Promise( async (resolve, reject) => {
                                                        await selec.click()
                                                        console.log('select is clicked')
                                                        resolve()
                                                    })

                                                    // Selected Option ist automatisch ausgewählt, muss aber durch ein Event getriggert werden.
                                                    await new Promise( async (resolve, reject) => {
                                                        setTimeout( async () => {
                                                            if(worked) return resolve();
                                                            await selec.press('Enter') 
                                                            console.log('on selected element is Enter pressed')  
                                                            await page.mouse.move(10, 10)
                                                            await page.mouse.click(10, 10)  
                                                            clearInterval(inter)
                                                            worked = true
                                                            await handleNextBtn(page)
                                                            resolve()
                                                        },1000)    
                                                    })
                                                },1000)
                                            }
                                        },1000)
                                    }                                    
                                })
                                
                                // _acan _acap _acaq _acas _aj1-


                            }
                        },500)


                    }    
                }    
            }                
        }
    }
    }catch(e){
        console.log(e)
    }
})();
const handleNextBtn = async ( page ) => {
    console.log('handle next btn is runs')
    const nextBtn = await page.waitForSelector(FormatStr('_acan _acap _acaq _acas _aj1-'))
    await nextBtn.click()
}
const FormatStr = (str) => {
    str = str.replaceAll(' ', '.')
    str = '.'+str
    return str
}


/*
(async()=>{
    try{
        const browser = await puppeteer.launch({
            headless: false,
            product: 'chrome'
        });
        const page = await browser.newPage();
        await page.setViewport({width: 1280, height: 800});
        await page.goto('https://twitter.com/i/flow/signup');
        let str_class = 'css-18t94o4 css-1dbjc4n r-1sw30gj r-sdzlij r-1phboty r-rs99b7 r-ywje51 r-usiww2 r-2yi16 r-1qi8awa r-1ny4l3l r-ymttw5 r-o7ynqc r-6416eg r-lrvibr r-13qz1uu'.replaceAll(' ','.')


        const reg_account_btn = await page.waitForSelector(FormatStr(str_class))
        reg_account_btn.click()
        await page.waitForSelector(FormatStr('r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-1dz5y72 r-fdjqy7 r-13qz1uu'))
        const input_name = await page.$("[name=\"name\"]")
        const input_mail = await page.$("[name=\"email\"]")
        
        if(input_name!==null){
            await input_name.type('Marlin Bubatz')
            if(input_mail!==null){
                await input_mail.type('don.reply.456@gmail.com')
                
                
                await page.waitForSelector('#SELECTOR_1')
                setTimeout(async()=>{
                    const option = await page.$('#SELECTOR_1 option[value="3"]');
                    const optionHandle = option.asElement()
                    await optionHandle.evaluate((option) => {
                        option.selected = true;
                    });
                },500)
                setTimeout(async()=>{
                    const option = await page.$('#SELECTOR_2 option[value="16"]')
                    const optionHandle = option.asElement()
                    await optionHandle.evaluate((option)=>{
                        option.selected = true;
                    })
                },500)
                setTimeout(async()=>{
                    await page.waitForSelector('#SELECTOR_3')
                    const option = await page.$('#SELECTOR_3 option[value="1989"]')
                    const optionHandle = option.asElement()
                    await optionHandle.evaluate((option)=>{
                        option.selected = true;
                        var xx = setInterval(()=>{
                            if(!option.selected){
                                option.selected=true
                            }else{
                                clearInterval(xx)
                            }
                        },500)
                    })
                },500)



            }
        }

    }catch(e){
        console.log(e)
    }

})()*/













/*        
        await page.evaluate(() => {
            localStorage.setItem('previous_product_list_offer_count619965317', '2543');
        });

        await page.setCookie(
        {
            name: '__Secure-3PSIDCC',
            value: 'AFvIBn9z3ijVuJ0qe1bmtFtqMSNLJBEmO-cdwBPYQoYyn2I6rnoRaZzsL-YtV9aqmedqYAuZsLQ',
            domain: '.google.com',
            path: '/',
            expires: '2024-03-29T12:44:02.283Z',
            httpOnly: 'true',
            secure: 'true',
            sameSite: 'None'
        },
        {
            name: '__Secure-1PSIDCC',
            value: 'AFvIBn_4PKjDZ32OoRopWNTYXJtbHCNwE9WvX1ctuj8fnIbywV3icQX4QhAMVk1NUNa-ZVW32g0',
            domain: '.google.com',
            path: '/',
            expires: '2024-03-29T12:44:02.283Z',
            httpOnly: 'true',
            secure: 'true',
        },
        {
            name: 'SIDCC',
            value: 'AFvIBn8W-414ZNlvyQbhcVaa1ffJBKojUC8WFZsX2ZON_dhakZSyNjQtbaggYjkiZFutiRY0lq0',
            domain: '.google.com',
            path: '/',
            expires: '2024-03-29T12:44:02.283Z'
        },        {
            name: '__Secure-3PAPISID',
            value: 'UJm6AMTcTNlc2X9Z/AfG15Gnkk8bor4gNY',
            domain: '.google.com',
            path: '/',
            expires: '2024-04-24T05:20:12.353Z',
            secure: 'true',
            sameSite: 'None'
        },        {
            name: 'SSID',
            value: 'AnfdfFGdaQaNzjLkh',
            domain: '.google.com',
            path: '/',
            expires: '2024-04-24T05:20:12.352Z',
            httpOnly: 'true',
            secure: 'true'
        },        {
            name: '__Secure-1PAPISID',
            value: 'UJm6AMTcTNlc2X9Z/AfG15Gnkk8bor4gNY',
            domain: '.google.com',
            path: '/',
            expires: '2024-04-24T05:20:12.352Z',
            secure: 'true',
        },
        {
            name: 'HSID',
            value: 'AyW-5J0lwaJBarAqp',
            domain: '.google.com',
            path: '/',
            expires: '2024-04-24T05:20:12.352Z',
            httpOnly: 'true'
        },{
            name: '__Secure-3PSID',
            value: 'UggBnMAz-Zq8llaJjiIFLUOpzURWYsTO2ur8iLIRf6zFF4bETI6YNno0OLCepiM2fb1v9A.',
            domain: '.google.com',
            path: '/',
            expires: '2024-04-24T05:20:12.352Z',
            httpOnly: 'true',
            secure: 'true',
            sameSite: 'None'
        },{
            name: '__Secure-1PSID',
            value: 'UggBnMAz-Zq8llaJjiIFLUOpzURWYsTO2ur8iLIRf6zFF4bELfVsXUrrFg9NwaqK7SYNrg.',
            domain: '.google.com',
            path: '/',
            expires: '2024-04-24T05:20:12.352Z',
            httpOnly: 'true',
            secure: 'true',
        },{
            name: 'SID',
            value: 'UggBnMAz-Zq8llaJjiIFLUOpzURWYsTO2ur8iLIRf6zFF4bEq2BSkaNvjjgKyR9bfOKEvQ.',
            domain: '.google.com',
            path: '/',
            expires: '2024-04-24T05:20:12.352Z'
        },{
            name: 'SAPISID',
            value: 'UJm6AMTcTNlc2X9Z/AfG15Gnkk8bor4gNY',
            domain: '.google.com',
            path: '/',
            expires: '2024-04-24T05:20:12.352Z',
            secure: 'true'
        },{
            name: 'APISID',
            value: '_DBXwSlv6NhkSnTo/AJT6sDFqpxhoFW_FD',
            domain: '.google.com',
            path: '/',
            expires: '2024-04-24T05:20:12.352Z'
        },
        {
            name: 'MCN_CLTKN',
            value: 'AJ5u9SOCMGU7Nx0C3E8ySRCbjri1Nqgw1tlfgmn3zq2EogUJWNvidEHwBcHUr9BNMZDFwrYg',
            domain: '.merchants.google.com',
            path: '/',
            expires: '2023-06-28T12:43:45.123Z',
            httpOnly: 'true',
            secure: 'true'
        },{
            name: 'OTZ',
            value: '6948694_52_52_123900_48_436380',
            domain: 'www.google.com',
            path: '/',
            expires: '2023-04-18T11:34:11.000Z',
            secure: 'true'
        },{
            name: 'NID',
            value: '511=tBO0Tp3giy4XoMr0MLdbzO-RH93B96O4xEIoQlkoyd5TV51rY7SmIB8VayIIJGMu67eIDCSGKCYICAbGKcTB6ZXRY3-ivq3BWKKLHn0o5gKoJ8yy8Atklr34C7ZBBHfKc95csWSWC6d1rYazss4FS1qs3ciO8KsNfyFHNw0CsSxQr8iMSPi0rHy9SiqeP28ZbMnimyyOF8L8',
            domain: '.google.com',
            path: '/',
            expires: '2023-09-29T12:28:30.659Z',
            httpOnly: 'true',
            secure: 'true',
            sameSite: 'None'
        },{
            name: '1P_JAR',
            value: '2023-3-30-12',
            domain: '.google.com',
            path: '/',
            expires: '2023-04-29T12:29:37.000Z'
        },{
            name: 'AEC',
            value: 'AUEFqZdkmFA0AAMAIMxOtrJjIFJyPZtau8nkj22q9XQvp2KL19Tn7EZUbIc',
            domain: '.google.com',
            path: '/',
            expires: '2023-09-15T11:30:56.293Z',
            httpOnly: 'true',
            secure: 'true',
            sameSite: 'Lax'
        },{
            name: 'CONSENT',
            value: 'PENDING+404',
            domain: '.google.com',
            path: '/',
            expires: '2024-04-22T11:25:55.971Z',
            httpOnly: '',
            secure: 'true'
        },{
            name: '__Secure-ENID',
            value: '11.SE=dRuqLi1It2ORaYzBQO0E9LXypb438SrXg1Ne5ld8sK29BpKNic0Y7YvfacBG4PL_jXC-bOn_ISQ0YJ_X8Bs08ulR4X5d-OUVp2wJDeeaUELVTIrW5PV3eMFbak_D9XzcSdrDGQyxWZEYTlVimTqxWg9yxRKYuPXGgS-tJiomYx4EG3nFKnXEk6izLc40nysiYLM3kqP_9dSOstJwgrz7XmDdpaP0xd4jdN7Mcsle01_M25XGJSecPNQji4nT3kOBsZwtCPU',
            domain: '.google.com',
            path: '/',
            expires: '2024-04-18T03:44:48.289Z',
            httpOnly: 'true',
            secure: 'true',
            sameSite: 'Lax'
        }
        );
        */
/*
(async () => {previous_product_list_offer_count619965317
    try{
        const browser = await puppeteer.connect({
            browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser'
          });
        const page = await browser.newPage();
        await page.goto('https://callipson.com/');        
    }catch(e){
        console.log(e.message)
    }
  // ...
})();


    <!-- Google Tag Manager (noscript) -->
    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-NPXS6FC"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe
    ></noscript>
    <!-- End Google Tag Manager (noscript) -->
*/
// google-chrome-stable --remote-debugging-port=9222