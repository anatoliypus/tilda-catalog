import { useEffect, useRef, useState } from "react";
import { productType } from "../../types/types";
import useDisableScrolling from "./Hooks/useDisableScrolling";
import styles from "./ItemPopup.module.css";
import PropTypes from "prop-types";
import {
    getProductPrice,
    useGetProductInfo,
} from "../../httpService/httpService";
import ItemPopupSizes from "./Components/ItemPopupSizes";
import ItemPopupImages from "./Components/ItemPopupImages";
import ItemPopupRelatives from "./Components/ItemPopupRelatives/ItemPopupRelatives";
import ItemPopupSizeTable from "./Components/ItemPopupSizeTable/ItemPopupSizeTable";
import Price from "../Price/Price";
import { Title } from "../Title/Title";
import useCart from "./Hooks/useCart";

function ItemPopup({ product, closePopup, hidden, setProduct }) {
    const defaultPrice = (
        <p className={styles.itemPopupPrice}>
            Выберите размер, чтобы узнать цену!
        </p>
    );
    const popupRef = useRef(null);
    const addToCartRef = useRef(null);

    const [choosedSize, setChoosedSize] = useState(null);
    const [loading, setLoading] = useState(true);
    const [priceValue, setPriceValue] = useState(defaultPrice);
    const [data, setData] = useState(null);
    const [loadingPrices, setLoadingPrices] = useState(false);
    const [prevSearch, setPrevSearch] = useState("");

    useDisableScrolling(hidden, popupRef);

    useGetProductInfo(product, setData);

    useEffect(() => {
        const nav = document.querySelector(".tmenu-mobile_positionfixed");
        if (nav && !hidden) {
            nav.style.display = "none";
            return () => {
                nav.style.display = null;
            };
        }
    }, [hidden]);

    useEffect(() => {
        if (!hidden && data && product && loading) {
            if (!product.title) {
                product.title = data.title;
            }
            setLoading(false);
        }
    }, [data, product, loading, hidden]);

    const closePopupHandler = () => {
        closePopup();
        setLoading(true);
        setChoosedSize(null);
        setPriceValue(defaultPrice);
        const url = new URL(window.location);
        url.searchParams.has("productId") &&
            url.searchParams.delete("productId");
        prevSearch && url.searchParams.set("key", prevSearch);
        window.history.replaceState({}, "", url);
    };

    useEffect(() => {
        const popups = document.querySelectorAll(".itemPopup_common");
        if (
            popups.length > 1 &&
            popupRef &&
            popupRef.current &&
            popups[0] != popupRef.current
        )
            return;

        const searchParams = new URL(window.location.href).searchParams;
        const id = searchParams.get("productId");
        if (id) {
            setProduct({
                productId: id,
                title: null,
                img: null,
            });
        }
    }, []);

    useEffect(() => {
        if (!hidden && data && product) {
            const url = new URL(window.location);
            const pushedAlready = url.searchParams.has("productId");

            if (url.searchParams.has("key")) {
                setPrevSearch(url.searchParams.get("key"));
                url.searchParams.delete("key");
            }

            url.searchParams.set("productId", product.productId);

            if (pushedAlready) {
                // window.history.replaceState({}, '', url)
            } else {
                window.history.pushState({}, "", url);
            }
        }
    }, [data, product, hidden]);

    useEffect(() => {
        const popStateHandlerNotHidden = (e) => {
            e.preventDefault();
            closePopupHandler();
        };

        if (!hidden) {
            window.addEventListener("popstate", popStateHandlerNotHidden);
            return () => {
                window.removeEventListener(
                    "popstate",
                    popStateHandlerNotHidden
                );
            };
        }
    }, [hidden]);

    useCart(choosedSize, product, addToCartRef, hidden, data);

    useEffect(() => {
        if (choosedSize) {
            setPriceValue(
                <Price isMinimal={false} product={choosedSize.price} />
            );
        }
    }, [choosedSize]);

    if (loading || !data) {
        return (
            <div
                className={`itemPopup_common ${styles.itemPopup} ${
                    hidden ? styles.itemPopupHidden : ""
                } ${styles.ItemPopupCenter}`}
                ref={popupRef}
            >
                <div className={styles.mainLoader}>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`itemPopup_common ${styles.itemPopup} ${
                hidden ? styles.itemPopupHidden : ""
            }`}
            ref={popupRef}
        >
            <button
                className={styles.itemPopupClose}
                onClick={closePopupHandler}
            >
                &larr; Закрыть
            </button>
            <div className={styles.split}>
                <ItemPopupImages hidden={hidden} images={data.images} />
                <div className={styles.itemPopupMainBlock}>
                    <Title
                        title={hidden ? "" : data.title}
                        className={styles.itemPopupHeading}
                    />
                    {priceValue}
                    <ItemPopupSizes
                        data={data}
                        setPriceValue={setPriceValue}
                        hidden={hidden}
                        prices={data.apiPrices}
                        choosedSize={choosedSize}
                        setChoosedSize={setChoosedSize}
                    />
                    <div className={styles.itemPopupButtons}>
                        <button
                            className={`${styles.itemPopupAddToCart} ${
                                !choosedSize &&
                                data.apiPrices &&
                                Object.keys(data.apiPrices).length != 0
                                    ? styles.itemPopupAddToCartInactive
                                    : ""
                            }`}
                            ref={addToCartRef}
                        >
                            Добавить в корзину
                        </button>
                        {!data.updatedPrices && (
                            <button
                                className={`${styles.itemPopupGetSizes} ${
                                    loadingPrices
                                        ? styles.itemPopupGetSizesInactive
                                        : ""
                                }`}
                                onClick={async () => {
                                    if (loadingPrices || !data || !data.productId) return;
                                    setLoadingPrices(true);
                                    const prices = await getProductPrice(data.productId);
                                    if (prices && prices.prices) {
                                        setData({
                                            ...data,
                                            apiPrices: prices.prices,
                                            apiPricesUpdated: Date.now(),
                                            updatedPrices: true,
                                        });
                                        setLoadingPrices(false);
                                        setChoosedSize(null)
                                    }
                                }}
                            >
                                Узнать актуальные цены и размеры (5-20 секунд)
                            </button>
                        )}
                    </div>

                    <p className={styles.itemPopupArticle}>
                        Артикул: {data.vendorCode}
                    </p>
                </div>
            </div>
            <div className={styles.descriptionBlock}>
                {false && !hidden && data && (
                    <p className={styles.description}>{data.description}</p>
                )}
            </div>
            <ItemPopupSizeTable sizeTable={data.sizes} />
            {/* <ItemPopupRelatives relatives={data ? data.relatedProducts : null} onClick={(product) => {
        setProduct(product)
        setPriceValue(defaultPrice)
        setLoading(true)
        setData(null)
      }} /> */}
        </div>
    );
}

ItemPopup.propTypes = {
    product: productType,
    closePopup: PropTypes.func,
    hidden: PropTypes.bool,
};

export default ItemPopup;
