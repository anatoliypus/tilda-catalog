import { useEffect } from "react";

function useCart(choosedSize, product, addToCartRef, hidden, data) {
    useEffect(() => {
        const handler = () => {
            if (choosedSize && data) {
                const p = {
                    name: data.title.slice(0, 20) + "... | " + data.vendorCode + " | " + choosedSize.size,
                    price: choosedSize.price,
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
                eval("tcart__addProduct(p)");

                //       const code =
                //           " \
                //   const link = document.querySelector(`${buyButtonBlockId} a`); \
                //   link.href = `#order:${product.title.slice(0, 20)}... | ${data.vendorCode} | ${choosedSize.size} =${choosedSize.price}:::image=${data.images[0]}`; \
                //   link.click(); \
                // ";
                //       eval(code);
            }
        };
        if (choosedSize && addToCartRef.current && data) {
            addToCartRef.current.addEventListener("click", handler);
        } else if (addToCartRef.current) {
            addToCartRef.current.removeEventListener("click", handler);
        }
        return () => {
            if (addToCartRef.current) {
                addToCartRef.current.removeEventListener("click", handler);
            }
        };
    }, [addToCartRef, hidden, choosedSize, data]);
}

export default useCart;
