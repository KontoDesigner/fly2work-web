import { AuthenticationContext, adalFetch } from 'react-adal'

export const adalConfig = {
    tenant: 'e3e1f65b-b973-440d-b61c-bc895fc98e28',
    clientId: '6e01c747-cb4c-4a1e-985c-708dc1a8943f',
    endpoints: {
        api: '6e01c747-cb4c-4a1e-985c-708dc1a8943f'
    },
    cacheLocation: 'localStorage'
}

export const authContext = new AuthenticationContext(adalConfig)

export const adalApiFetch = (fetch, url, options) => adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options)
