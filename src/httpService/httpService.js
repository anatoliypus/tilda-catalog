import { useEffect } from "react";

// export const baseUrl = "https://api.ademarket.ru";
export const baseUrl = "https://poizonapi.ru";

async function makeRequest(url) {
    let success = false;
    const response = await fetch(url);
    if (response.ok) {
        const json = await response.json();
        if (json && json.hasOwnProperty("error") && !json.error) {
            success = true;
            return json.body;
        } else {
            console.error(
                `Error in response to ${url}. Message: "${json.msg}". Trying again.`
            );
        }
    } else {
        console.error(
            `Error while trying to make a request to ${url}. Trying again.`
        );
    }
}

export async function searchItems(key, page, gender) {
    const data = await makeRequest(
        `${baseUrl}/search?key=${key}&page=${page}&gender=${gender}`
    );
    return data.products;
}

export async function getCatalog(page, gender) {
    const data = await makeRequest(
        `${baseUrl}/catalog?&page=${page}&gender=${gender}`
    );
    return data.products;
}

export async function getProductInfo(id) {
    const data = await makeRequest(`${baseUrl}/product?id=${id}`);
    return data;
}

export function useGetProductInfo(product, setData) {
    useEffect(() => {
        const handler = async () => {
            if (product) {
                const data = await getProductInfo(product.productId);
                if (data) {
                    setData(data);
                }
            } else {
                setData(null);
            }
        };
        handler();
    }, [product]);
}
