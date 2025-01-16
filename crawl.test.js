const { normalizeURL, getUrlsFromHtml } = require("./crawl");
const { test, expect } = require('@jest/globals');

test('normalize url', () => {
    const actual = normalizeURL('https://bOot.dev/test/')
    const expected = 'boot.dev/test/'
    expect(actual).toEqual(expected)
})


test('get urls from html body', () => {
    const htmlBody = `
    <html>
        <body>
            <a href="https://boot.dev/about">
                about
            </a>
            <a href="./test">
                about 
            </a>
            <a href="./contact">
                contact 
            </a>
                 <a href="./links">
                contact 
            </a>


        </body>
    </html>
    `
    const baseURL = "https://boot.dev/"
    const actual = getUrlsFromHtml(htmlBody, baseURL)
    const expected = ["https://boot.dev/about", "https://boot.dev/test" , "https://boot.dev/contact" , "https://boot.dev/links"]
    expect(actual).toEqual(expected)

    console.log(actual)

})
