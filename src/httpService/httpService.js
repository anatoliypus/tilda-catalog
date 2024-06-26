import { useEffect } from "react";

// export const baseUrl = "http://localhost:5555";
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

export async function searchItems(key, page, gender, category = "") {
    let pageSize = "";
    eval(`
        if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "pageSize" in CATALOG_PARAMS) pageSize = CATALOG_PARAMS.pageSize
    `);

    let brand = "";
    eval(`
        if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "brand" in CATALOG_PARAMS) brand = CATALOG_PARAMS.brand
    `);

    const data = await makeRequest(
        `${baseUrl}/search?key=${key}&page=${page}&gender=${gender}&pageSize=${pageSize}&category=${
            category ? category : ""
        }&brand=${brand}`
    );
    return data;
}

export async function getCatalog(
    page,
    gender,
    category = "",
    shouldShowCategoriesFilter = true
) {
    let pageSize = "";
    eval(`
        if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "pageSize" in CATALOG_PARAMS) pageSize = CATALOG_PARAMS.pageSize
    `);

    let brand = "";
    eval(`
        if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "brand" in CATALOG_PARAMS) brand = CATALOG_PARAMS.brand
    `);

    const data = await makeRequest(
        `${baseUrl}/catalog?&page=${page}&gender=${gender}&pageSize=${pageSize}&category=${
            category ? category : ""
        }&brand=${brand}${
            !shouldShowCategoriesFilter ? "&loadCategories=0" : ""
        }`
    );
    return data;
}

export async function getProductInfo(id) {
    const data = await makeRequest(`${baseUrl}/product?id=${id}`);
    return data;
}

export async function getProductPriceRange(id) {
    const data = await makeRequest(
        `${baseUrl}/getProductPriceRange?id=${id}`
    );
    return data;
}

export async function getProductPrice(id) {
    const data = await makeRequest(
        `${baseUrl}/getPriceById?id=${id}`
    );
    return data;
}

export async function getPrice(priceYuan) {
    const data = await makeRequest(
        `${baseUrl}/calculatePrice?price=${priceYuan}`
    );
    return data;
}

export async function getHints(key) {
    const data = await makeRequest(`${baseUrl}/hints?key=${key}`);
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
