const {crawl} = require('./crawl')
const colors = require('colors')
function main(){
    if (process.argv.length > 3) {
        console.error('too many arguments / one url at a time please'.yellow)
        process.exit(1)
    }
    if (process.argv.length < 3) {
        console.log('no argument provided / please provide a url'.red)
        process.exit(1)
    }
    const URL = process.argv[2]
    crawl(URL)
}

main()