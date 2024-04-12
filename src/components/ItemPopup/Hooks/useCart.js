import { useEffect } from "react";
import getPriceFromProperties from "../../../utils/getPriceFromProperties";

function useCart(choosedSize, product, addToCartRef, hidden, data) {
    useEffect(() => {
        const handler = async () => {
            if ((choosedSize || (data && (!data.apiPrices || Object.keys(data.apiPrices).length == 0))) && data) {
                const p = {
                    name: data.title.slice(0, 20) + "... | " + data.vendorCode + (choosedSize ? " | " + choosedSize.size : ''),
                    img: data.images[0],
                    recid: "709992588",
                    lid: "6144261803880",
                    pack_label: "",
                    pack_m: "",
                    pack_x: "",
                    pack_y: "",
                    pack_z: "",
                    part_uids: [""],
                    gen_uid: "",
                    url: "https://poizontest.tilda.ws/",
                };
                if (choosedSize) p.price = choosedSize.price
                else {
                    const finalPriceRub = await getPriceFromProperties(data.properties)
                    p.price = finalPriceRub
                }
                try {
                    eval("tcart__addProduct(p)");
                }
                catch (e) {}

                //       const code =
                //           " \
                //   const link = document.querySelector(`${buyButtonBlockId} a`); \
                //   link.href = `#order:${product.title.slice(0, 20)}... | ${data.vendorCode} | ${choosedSize.size} =${choosedSize.price}:::image=${data.images[0]}`; \
                //   link.click(); \
                // ";
                //       eval(code);
            }
        };
        if ((choosedSize || (data && (!data.apiPrices || Object.keys(data.apiPrices).length == 0))) && addToCartRef.current && data) {
            addToCartRef.current.addEventListener("click", handler);
        } else if (addToCartRef.current) {
            addToCartRef.current.removeEventListener("click", handler);
        }
        return () => {
            if (addToCartRef.current) {
                addToCartRef.current.removeEventListener("click", handler);
            }
        };
    }, [addToCartRef, addToCartRef.current, hidden, choosedSize, data, product]);
}

export default useCart;
