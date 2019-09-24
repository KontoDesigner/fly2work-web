function getKeys() {
    const hostName = window.location.hostname

    const res = {
        api: '',
        env: '',
        name: process.env.REACT_APP_NAME
    }

    //LOCAL
    if (hostName === 'localhost') {
        res.api = 'http://localhost:5000/'
        res.env = 'LOCALHOST'
    }
    //DEV
    else if (hostName === 'fly2work-web.dev.tuinordic.com') {
        res.api = 'http://fly2work-api.dev.tuinordic.com/'
        res.env = 'DEV'
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
    }
    //AWS DEV
    else if (hostName === 'fly2work-web.test.tui-dx.com') {
        res.api = 'http://fly2work-api.test.tui-dx.com/'
        res.env = 'DEV'
    }
    //AWS UAT
    else if (hostName === 'fly2work-web.pre.tui-dx.com') {
        res.api = 'http://fly2work-api.pre.tui-dx.com/'
        res.env = 'UAT'
    }
    //AWS PROD
    else if (hostName === 'fly2work-web.tui-dx.com') {
        res.api = 'https://fly2work-api.tui-dx.com/'
        res.env = 'PROD'
    } else {
        console.warn(`could not identify hostname: ${hostName}.`)
    }

    console.log('config', res)

    return res
}

export default getKeys()
