function getApi() {
    const hostName = window.location.hostname
    let base = ''

    //LOCAL
    if (hostName === 'localhost') {
        base = 'http://localhost:5000/'
    }
    //UAT
    else if (hostName === 'ctx-web-uat.tuinordic.net' || hostName === 'ctx-web.uat.tuinordic.net') {
        base = 'https://ctx-api-uat.tuinordic.net/'
    }
    //PROD
    else if (hostName === 'ctx-web.tuinordic.net') {
        base = 'https://ctx-api.tuinordic.net/'
    } else {
        console.warn(`could not identify hostname: ${hostName}.`)
    }

    return base
}

const Config = {
    name: process.env.REACT_APP_NAME,
    api: getApi()
}

export default Config
