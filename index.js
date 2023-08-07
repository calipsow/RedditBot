const puppeteer = require('puppeteer');
const reddit = require('./reddit');
require('dotenv').config()

const SetSelected = async (options) => {

    // Generation of a node element to set the selected property to true
    const handleOptionEvents = await options.asElement()

    await handleOptionEvents.evaluate( async (option) => {
        option.selected = true;        
    })

}



(async () => {
    try{
        if(true){
            try{
                
                await reddit({
                    type: 'PHOTO',
                    community: 'iphone',
                    title: 'Are you ready to bring your iPhone up on the next level? :) Then get your iPhone a new hard cover from https://callipson.com/en-us/collections/iphone-hullen-und-schutzfolien. Browse from a range of awesome cases and find the perfect fit for you! <:D',
                    photoPath: [
                        'c:/users/user/onedrive/bilder/Shopify Bilder/produkte/bd0c2658-5ca3-4c0c-a2f5-07ccdbbe298b.jpg',
                        'c:/users/user/onedrive/bilder/Shopify Bilder/produkte/image_cef3243a-a961-4620-90c0-4d5e8f1ab9c7.jpg',
                        'c:/users/user/onedrive/bilder/Shopify Bilder/produkte/image_34868a75-06bd-4f24-a0ca-0987462bfdef.jpg'
                    ], 
                    shopUrl: [
                        'https://callipson.com/en-us/products/happy-planet-soft-shell-silicone-phone-case',
                        'https://callipson.com/en-us/products/astronaut-phone-case-doodle-moon-cartoon-eye-protection?variant=43781856133348',
                        'https://callipson.com/en-us/products/mobile-phone-shell-astronaut-silicone-all-inclusive-edge-drop-protection'
                    ],
                    photoDescription: [
                        'Happy Planet Soft Shell Case - New in Stock, Secure yours Too! Only - 27.70 USD',
                        'Moon Cartoon Astronaut Case - Get Yours While it\'s in Stock! - 19.94 USD',
                        'iPhone Case Flying Astronaut - Now on Sale! Only - 22.16 USD'
                    ]
                })
            }catch(e){
                console.log(e)
            }
            

        } else {
        // Lounch visible browser via Chromium Instagram
        const browser = await puppeteer.launch({
            headless: false,
            product: 'chrome'
        });
        const page = await browser.newPage();
        await page.setViewport({width: 1280, height: 800});
        await page.goto('https://www.instagram.com/accounts/emailsignup');

        // Confirm Cookiebanner
        const consentCookies = await page.waitForSelector('._a9--._a9_0');
        consentCookies.click()

        // Wait until content is loaded
        await page.waitForSelector('._aa4b._add6._ac4d')
        const emailOrPhone = await page.$("[name=\"emailOrPhone\"]")
        const fullName = await page.$("[name=\"fullName\"]")
        const username = await page.$("[name=\"username\"]")
        const password = await page.$("[name=\"password\"]")
        
        // Types the strings into the input fields
        if( emailOrPhone !== null ){
            await emailOrPhone.type(process.env.INSTAACC)
        
            if( fullName !== null ){
                await fullName.type('Marian Bubatz')
            
                if( username !== null ){
                    await username.type(process.env.INSTAPASS)
                
                    if( password !== null ){
                        await password.type('#default_sett_pass_x1q3')
                        const inter_0 = setInterval( async () => {
                            const submit_btn = await page.$("[type=\"submit\"]")
                            if(submit_btn!==null){
                                clearInterval(inter_0)
                                // Submit the form with user data
                                await submit_btn.click()   
                                
                                // Wait until the content of the next page is loaded
                                try{
                                    await page.waitForSelector('select._aau-');
                                }catch(e){
                                    await submit_btn.click()
                                    await page.waitForSelector('select._aau-');
                                }
                                const selectElm = await page.$$('select._aau-')
                                // Iteration through the 3 Select-Elems
                                var worked = false
                                Array.from(selectElm).forEach( async (selec) => {
                                    
                                    // Declaration of the target options
                                    var options = null, year = false
                                    try{
                                        // First two options for the month and day 
                                        // can be addressed with value=3 each  
                                        options = await selec.waitForSelector('option[value="3"]')
                                        console.log('options element with value 3 is running')
                                    }catch(e){
                                        // If value=3 the field is focused for year and can be selected with value=1995  
                                        options = await selec.waitForSelector('option[value="1995"]')
                                        console.log('options element with value 1955 is running')
                                        year = true
                                    }
                                    // Trigger Dropdown Menu
                                    // await selec.click()

                                    await SetSelected(options)
                                    
                                    if(year){
                                        var inter = setInterval(async()=>{
                                            const testHandle = await options.asElement()
                                            const check = await testHandle.evaluate( el => el.selected )
                                            if( check === true ){
                                                
                                                // Trigger Dropdown Menu
                                                setTimeout(async()=>{
                                                    if(worked) return;
                                                    await new Promise( async (resolve, reject) => {
                                                        await selec.click()
                                                        console.log('select is clicked')
                                                        resolve()
                                                    })

                                                    // Selected Option is automatically selected, but must be triggered by an event.
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

