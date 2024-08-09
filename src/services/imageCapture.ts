import puppeteer, { Browser, Page } from "puppeteer";
import fs from "fs"

const captureImage = async (url:string, filename:string, selector?: string, width?:number, height?:number) => {
    try{
        const browser:Browser = await puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
        const page:Page = await browser.newPage()
    
        await page.goto(url, {
            waitUntil: 'networkidle0'
        })
        await page.setViewport({width: width ?? 1280, height: height ?? 720, deviceScaleFactor: 1})
        const path = `./imagescache/${filename}.jpeg`
    
        fs.mkdirSync('./imagescache/', {recursive: true})
    
        let img
        if(!selector)img = await page.screenshot({type: "jpeg", fullPage: false, path: path, quality: 100})
        else{
            await page.waitForSelector(selector)
            const elem = await page.$(selector)
            if(elem)img = await elem.screenshot({type: "jpeg", fullPage: false, path: path, quality: 90})
            else throw new Error(`Element with selector '${selector}' does not exists in the page`)
        }
        return img
    }catch(e){
        console.error(e)
    }
}

export {captureImage}