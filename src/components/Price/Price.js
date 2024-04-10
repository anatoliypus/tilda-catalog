import { useEffect, useState } from "react";
import styles from "./Price.module.css";
import getPriceFromProperties from "../../utils/getPriceFromProperties";

function Price({ isMinimal, product }) {
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const func = async () => {
            if (!product) return;
            if (typeof product === "number") {
                setPrice(product);
            } else if (
                product.apiPrices &&
                Object.keys(product.apiPrices).length
            ) {
                setPrice(Math.min(...Object.values(product.apiPrices)));
            } else if (product.properties) {
                const finalPriceRub = await getPriceFromProperties(
                    product.properties
                );
                if (finalPriceRub) setPrice(finalPriceRub);
            }
        };
        func();
    }, [product, isMinimal]);

    return (
        <p className={styles.price}>
            {(isMinimal ? " примерно от " : "") + price} рублей
        </p>
    );
}

export default Price;
