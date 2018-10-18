import config from '../infrastructure/config'

export async function setTitle(title = null) {
    if (title !== null) {
        document.title = `${title} - ${config.name}`
    } else {
        document.title = config.name
    }
}
