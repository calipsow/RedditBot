const puppeteer = require('puppeteer')


const FormatStr = (str) => {
    str = str.replaceAll(' ', '.')
    str = '.'+str
    return str
}
const HandleLogin = async (page) =>  {

    await page.goto('https://www.reddit.com/')
        
    // COOKIEBANNER PREVENTION
    const cookiebanner = await page.waitForSelector('.trdUvQxqQHHqQKOUBcgnr._3RhWPJfjpsEoBw52x0fQp2.n4AaEF3hCCYK665NCiJr8')
    const accept = await cookiebanner.$(FormatStr('_1tI68pPnLBjR1iHcL7vsee _2iuoyPiKHN3kfOoeIQalDT _10BQ7pjWbeYP63SAPNS8Ts HNozj_dKjQZ59ZsfEegz8'))
    if(accept!==null){
        await accept.click()
    }
    
    // EXTRACT SIGN IN LINK AND FOLLOW THEM
    const signIn = await page.$(FormatStr('_3Wg53T10KuuPmyWOMWsY2F Z_HUY3BUsGOBOtdmH94ZS _2iuoyPiKHN3kfOoeIQalDT _10BQ7pjWbeYP63SAPNS8Ts HNozj_dKjQZ59ZsfEegz8 _2nelDm85zKKmuD94NequP0'))
    const signInHandle = signIn.asElement()
    const link = await signInHandle.evaluate( sign => sign.href )
    
    page.goto(link)
    // NAVIGIERT ZUM LOGIN

    const loginForm = await page.waitForSelector('form.AnimatedForm')
    const username = await loginForm.waitForSelector('input#loginUsername')
    const passw = await loginForm.waitForSelector('input#loginPassword')
    
    // TYPE LOGIN DATA AND LOGGING IN
    await username.type('Difficult-Mix-BT')
    await passw.type('#Mvemjwun9587')

    const submitBtn = await loginForm.waitForSelector('button.AnimatedForm__submitButton.m-full-width')

    await submitBtn.click()
}
const SetUpPost = async (page, community = 'iphone') => {

    // REDIRECT TO MAIN APP        
    await page.waitForSelector('button._1x6pySZ2CoUnAfsFhGe7J1')
    await page.goto('https://www.reddit.com/submit')
    
    // HANDLE REDDIT COMMUNITY DROPDOWN MENU
    const chooseComunity = await page.waitForSelector('div._3cWzf-usAKfGV1Ay7h2zM_')
    const menuTrigger = Array.from( await chooseComunity.$$('div') ).pop()
    await menuTrigger.click()
    const searchInput = await chooseComunity.waitForSelector('input._1MHSX9NVr4C2QxH2dMcg4M')

    // SELECT REDDIT COMMUNITY
    await searchInput.type(community)
    await searchInput.press('ArrowDown')
    await searchInput.press('Enter')
}
const CreateUrlPost = async (
    page, 
    title = 'I had never such an awesome iPhone case like this! The case levels my iPhone directly 10 miles up! :D Check out the link and see by yourself! :)', 
    url = 'https://callipson.com/en-us/products/astronaut-phone-case-doodle-moon-cartoon-eye-protection'
    ) => {

    // NAVIGATE TO URL POST BUTTON
    const btnContainer = await page.waitForSelector('div._3fd4Ceu6mb8NI6WVk0Yv5c')
    const btns = Array.from(await btnContainer.$$('button'))
    const linkBtn = btns[2]
    await linkBtn.click()
    
    // WRITE TITLE FOR POST
    const textareaContainer = await page.waitForSelector('div._2wyvfFW3oNcCs5GVkmcJ8z')
    const textarea = await textareaContainer.waitForSelector('textarea')
    await textarea.type(title)        
    
    // WRITE URL IN MAIN POST
    const textareaUrlCon = await page.waitForSelector('div._1zq6UabIEJJ-z9grsiCJY7')
    const textareaUrl = await textareaUrlCon.waitForSelector('textarea.PqYQ3WC15KaceZuKcFI02._3zY6b4QJpSz1067ahq73_K')
    await textareaUrl.type(url)

    // ADD FLAIR TO POST
    const buttonCon = await page.waitForSelector('div.XZK-LTFT5CgGo9MvPQQsy._2_rA2mCdhHc1Lr7Ff1ygvH')
    const flairBtn = await buttonCon.waitForSelector('button'+FormatStr('_1LD2Xsr3fioSkWZ13vMORC _5x1WjCc4HQF6tqnODOql0 _2iuoyPiKHN3kfOoeIQalDT _2tU8R9NTqhvBrhoNAXWWcP HNozj_dKjQZ59ZsfEegz8'))
    await flairBtn.click()

    // PICK THE FLAIR
    const flairOptionsCon = await page.waitForSelector('div[aria-label="flair_picker"]')
    const flairOptions = await flairOptionsCon.$$('div[aria-checked="false"]')

    // SELECT AND CLICK THE FLAIR-OPTIONS
    for (const option of flairOptions) {
        const span = await option.waitForSelector('span')
        const spanHandle = span.asElement()

        var checked = await spanHandle.evaluate( async (spn) => {
            return await new Promise( (resolve, reject) => {
                
                if (spn.textContent === 'Tip/PSA') {
                    return resolve(true)                
                
                }else return resolve(false)    
            })
        })

        checked ? await option.click() : null
    }
                    
    // SUBMIT BUTTON FOR FLAIR-OPTIONS
    const submitBtnCon = await page.waitForSelector('div.cF9DU_4WDAKS4gs43ct2_')
    const subBtn = await submitBtnCon.waitForSelector('button._2iuoyPiKHN3kfOoeIQalDT._10BQ7pjWbeYP63SAPNS8Ts.HNozj_dKjQZ59ZsfEegz8')
    await subBtn.click()
    
}
const SubmitPost = async (page) => {
    // SELECT POST BUTTON AND POST IT
    const postBtnCon = await page.waitForSelector('div._1T0P_YQg7fOYLCRoKl_xxO')
    const postBtn = await postBtnCon.waitForSelector('button')

    // await postBtn.click()
    console.log('\x1b[32mPOST CONTENT!')
}

module.exports = async () => {
    try{
        const browser = await puppeteer.launch({
            headless: false, 
            product: 'chrome'
        })

        const page = await browser.newPage()
        await page.setViewport({width: 1280, height: 800});

        // DISMISS WINDOW PROMPTS
        page.on('dialog', async dialog => {
            console.log(dialog.message)
            await dialog.dismiss()
        })

        await HandleLogin(page)
        await SetUpPost(page, 'iphone')
        await CreateUrlPost(page)
        await SubmitPost(page)


    }catch(e){
        console.log(e)
    }

}