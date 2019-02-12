function getKeys() {
    const hostName = window.location.hostname

    const res = {
        api: '',
        env: ''
    }

    //LOCAL
    if (hostName === 'localhost') {
        res.api = 'http://localhost:5000/'
        res.env = 'LOCALHOST'
    }
    //UAT
    else if (hostName === 'fly2work-web-uat.tuinordic.net' || hostName === 'fly2work-web.uat.tuinordic.net') {
        res.api = 'https://fly2work-api-uat.tuinordic.net/'
        res.env = 'UAT'
    }
    //PROD
    else if (hostName === 'fly2work-web.tuinordic.net') {
        res.api = 'https://fly2work-api.tuinordic.net/'
        res.env = 'PROD'
    } else {
        console.warn(`could not identify hostname: ${hostName}.`)
    }

    return res
}

// const keys = getKeys()

const Config = {
    name: process.env.REACT_APP_NAME,
    api: getKeys().api,
    env: getKeys().env
}

export default Config
