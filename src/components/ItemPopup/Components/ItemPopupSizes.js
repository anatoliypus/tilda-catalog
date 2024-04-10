import { useEffect, useState } from "react";
import styles from "../ItemPopup.module.css";
import ItemPopupSizesLoader from "./ItemPopupSizesLoader";
import getPriceFromProperties from "../../../utils/getPriceFromProperties";
import { getProductPriceRange } from "../../../httpService/httpService";

export function checkSize(str) {
    // const allowed = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890., `
    // const filtered = str.split('').filter((ch) => allowed.indexOf(ch) !== -1).join('')
    // return filtered === str
    return true;
}

function ItemPopupSizes({
    hidden,
    prices,
    choosedSize,
    setChoosedSize,
    setPriceValue,
    data,
}) {
    useEffect(() => {
        const priceFunc = async () => {
            const priceRange = await getProductPriceRange(data.productId);
            if (
                priceRange.prices &&
                priceRange.prices.minPrice &&
                priceRange.prices.maxPrice
            )
                setPriceRange(priceRange.prices);
            else {
                const propPriceRub = await getPriceFromProperties(
                    data.properties
                );
                setPropPrice(propPriceRub);
            }
        };

        if (!prices || Object.keys(prices).length == 0) {
            setPriceValue(null);
            priceFunc();
        }
    }, [prices]);

    const [propPrice, setPropPrice] = useState(0);
    const [priceRange, setPriceRange] = useState(null);

    if (!prices || Object.keys(prices).length == 0) {
        if (priceRange) {
            return (
                <>
                    <p className={styles.itemPopupNoSizes}>
                        Нет информации о размерах 😢
                        <br />
                        Вы сможете узнать о размерах и стоимости товара после
                        оформления заказа.
                    </p>
                    <p
                        className={styles.itemPopupNoSizes}
                        style={{ marginTop: "15px" }}
                    >
                        Цена на товар в зависимости от размера составляет
                        примерно от <span>{priceRange.minPrice} рублей</span> до{" "}
                        <span>{priceRange.maxPrice} рублей</span> (данные могут быть неточными).
                    </p>
                </>
            );
        } else if (propPrice) {
            return (
                <>
                    <p className={styles.itemPopupNoSizes}>
                        Нет информации о размерах 😢
                        <br />
                        Вы сможете узнать о размерах и стоимости товара после
                        оформления заказа.
                    </p>
                    <p
                        className={styles.itemPopupNoSizes}
                        style={{ marginTop: "15px" }}
                    >
                        Цена на товар начинается примерно от {propPrice} рублей (данные могут быть неточными).
                    </p>
                </>
            );
        } else {
            return (
                <>
                    <p className={styles.itemPopupNoSizes}>
                        Нет информации о размерах 😢
                        <br />
                        Вы сможете узнать о размерах и стоимости товара после
                        оформления заказа.
                    </p>
                    <p
                        className={styles.itemPopupNoSizes}
                        style={{ marginTop: "15px" }}
                    >
                        Пробуем загрузить информацию по ценам ...
                    </p>
                </>
            );
        }
    }

    return (
        <>
            <p className={styles.itemPopupSizesHeading}>Доступные размеры:</p>
            <div className={styles.itemPopupSizes}>
                {!hidden &&
                    prices &&
                    Object.keys(prices)
                        .sort()
                        .map((size, index) => {
                            const price = prices[size];
                            if (size && price) {
                                return (
                                    <button
                                        key={index}
                                        className={`${styles.itemPopupSize} ${
                                            choosedSize &&
                                            size === choosedSize.size
                                                ? styles.itemPopupSizeChoosed
                                                : ""
                                        }`}
                                        onClick={() => {
                                            setChoosedSize({ size, price });
                                        }}
                                    >
                                        {prices.length == 1
                                            ? "Одна опция"
                                            : size}
                                    </button>
                                );
                            }
                            return null;
                        })}
                {!hidden && !prices && <ItemPopupSizesLoader />}
            </div>
        </>
    );
}

export default ItemPopupSizes;
