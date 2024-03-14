import styles from "./Item.module.css";
import { productType } from "../../types/types";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Price from "../Price/Price";
import { Title } from "../Title/Title";
import { getPrice } from "../../httpService/httpService";

function Item({ product, setPopup }) {
    const itemRef = useRef(null);

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

    return (
        <div className={styles.catalogItem} ref={itemRef}>
            {product.images && product.images.length && (
                <div
                    className={styles.catalogItemPhoto}
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                ></div>
            )}
            <Title title={product.title} className={styles.catalogItemTitle} />
            <Price isMinimal={true} value={product.apiPrices} />
        </div>
    );
}

Item.propTypes = {
    product: productType,
    setPopup: PropTypes.func,
};

export default Item;
