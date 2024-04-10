import { getPrice } from "../httpService/httpService";

export default async function getPriceFromProperties(properties) {
    const prop = properties.find(
        (v) => v.key == "Цена предложения"
    );
    
    if (prop && prop.value) {
        const yuan = parseInt(prop.value.replace(/\D/g, ""));
        const finalPriceRub = await getPrice(yuan * 100);
        if (finalPriceRub && finalPriceRub.price)
            return finalPriceRub.price
    }
    return 0
}