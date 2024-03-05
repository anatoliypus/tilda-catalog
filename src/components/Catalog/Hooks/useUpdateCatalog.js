import { useEffect } from "react";
import { searchItems, getCatalog } from "../../../httpService/httpService";
import Category from "../Components/Category";
import styles from "../Catalog.module.css";

function findNode(id, array) {
    for (const node of array) {
        if (node.id === id) return node;
        if (node.children) {
            const child = findNode(id, node.children);
            if (child) return child;
        }
    }
}

function useUpdateCatalog(
    setLoading,
    reachedPage,
    setReachedPageIsLast,
    setReachedPage,
    setItems,
    searchKey,
    items,
    gender,
    categories,
    setCategories,
    choosedCategory,
    setChoosedCategory,
) {
    const mainHandler = async () => {
        setLoading(true);
        if (searchKey) {
            const data = await searchItems(
                searchKey,
                reachedPage,
                gender,
                choosedCategory
            );
            if (data) {
                if (reachedPage === 1) {
                    setItems(data.products);
                } else {
                    setItems(items.concat(data.products));
                }
                setLoading(false);
                setReachedPageIsLast(false);
            }
        } else {
            const data = await getCatalog(reachedPage, gender, choosedCategory);
            if (data) {
                if (reachedPage === 1) {
                    setItems(data.products);
                    setCategories(data.categories);
                } else {
                    setItems(items.concat(data.products));
                }
                setLoading(false);
                setReachedPageIsLast(false);
            }
        }
    };
    useEffect(() => {
        mainHandler();
    }, [reachedPage, searchKey, gender]);

    useEffect(() => {
        const func = async () => {
            if (!choosedCategory) {
                mainHandler()
                return
            }
            if (
                !(
                    choosedCategory &&
                    items &&
                    categories
                )
            )
                return;
            setLoading(true);
            let data;
            if (searchKey) {
                data = await searchItems(
                    searchKey,
                    reachedPage,
                    gender,
                    choosedCategory
                );
            } else {
                data = await getCatalog(reachedPage, gender, choosedCategory);
            }
            if (data) {
                setItems(data.products);

                if (data.categories && data.categories.length) {
                    const choosedCategoryData = findNode(
                        choosedCategory,
                        categories
                    );
                    choosedCategoryData.children = data.categories;
                    setCategories(categories.map((v) => v));
                }

                setLoading(false);
                setReachedPageIsLast(false);
            }
        };
        func();
    }, [choosedCategory]);

    useEffect(() => {
        let category = null;
        eval(`
        if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "category" in CATALOG_PARAMS) category = CATALOG_PARAMS.category
    `);
        if (category) setChoosedCategory(category);
    }, []);
}

export default useUpdateCatalog;
