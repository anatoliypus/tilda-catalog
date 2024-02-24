import heic2any from "heic2any";

async function addImageParameters(url) {
    if (url) {
        const cdnPosition = url.indexOf('cdn')
        const newUrl = url.slice(0, cdnPosition) + 'imagex-' + url.slice(cdnPosition) + '~tplv-bn0zs46wqh-heic:1080:1080.heic'
        const response = await fetch(`http://127.0.0.1:5555/?link=${newUrl}`)
        if (response.ok) {
            try {
                const blob = await response.blob()
                const conversionResult = await heic2any({ blob, toType: "image/jpeg" })
                const jpgUrl = URL.createObjectURL(conversionResult)
                return jpgUrl
            } catch (e) {
                console.error(e)
            }
        }
    }
    return null;
}

export default addImageParameters;