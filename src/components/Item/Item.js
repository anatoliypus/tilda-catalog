import styles from "./Item.module.css";
import { productType } from "../../types/types";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Price from "../Price/Price";
import { Title } from "../Title/Title";
import { getPrice } from "../../httpService/httpService";

function Item({ product, setPopup }) {
    const itemRef = useRef(null);
    const [price, setPrice] = useState(null)

    useEffect(() => {
        const handler = () => {
            setPopup(product);
        };

        if (itemRef.current) {
            itemRef.current.addEventListener("click", handler);
        }

        return () => {
            if (itemRef.current) {
                itemRef.current.removeEventListener("click", handler);
            }
        };
    }, [itemRef.current]);

    useEffect(() => {
        const price = async (product) => {
            const param = product && product.properties.find((v) => {
                return v.key == "Цена предложения"
            })
            if (param && param.value && param.value.length > 0) {
                const priceYuan = parseInt(param.value.slice(1))
                const data = await getPrice(priceYuan * 100) // изначально в апи цены с двумя нолями в конце
                if (data && data.price) {
                    setPrice(data.price)
                }
            } else {
                return 0
            }
        }
        price(product)
    }, [])

    return (
        <div className={styles.catalogItem} ref={itemRef}>
            {product.images && product.images.length && (
                <div
                    className={styles.catalogItemPhoto}
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                ></div>
            )}
            <Title title={product.title} className={styles.catalogItemTitle} />
            <Price isMinimal={true} value={price} />
        </div>
    );
}

Item.propTypes = {
    product: productType,
    setPopup: PropTypes.func,
};

export default Item;
