const {JSDOM} = require('jsdom')
const colors = require('colors')


async function crawl(URL){
    try{
    console.log(`crawling  ${URL} ` .blue)
    const response = await fetch(URL)

    if(response.status > 399){
        console.log("the website's server is being a bitch..." .bgRed)
        return
    }
    if(!response.headers.get('content-type').includes("text/html")){
        console.log("the website's server is not responding with what you want..." .bgYellow )
        return
    }


    const pageHtml = await response.text()
    const dom = new JSDOM(pageHtml)
    console.log(dom.window.document.title .rainbow)
    process.exit(0)
    }catch(err){
        console.log(err.message)
    }
}


function normalizeURL(url){
    return (new URL(url).host + new URL(url).pathname).toLocaleLowerCase()
}

function getUrlsFromHtml(htmlBody , baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const document = dom.window.document
    let urlsCollection = document.querySelectorAll('a')
    urlsCollection = Array.from(urlsCollection)
    urlsCollection.map((url)=>{
        if(url.href.includes(baseURL
            
        )){
            urls.push(url.href)
        }
        else{
            urls.push(baseURL + url.href.slice(2, url.href.length))
        }
    })
    return urls
}



module.exports = {
    normalizeURL, getUrlsFromHtml , crawl
}