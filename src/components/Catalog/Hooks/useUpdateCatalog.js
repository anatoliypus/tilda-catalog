import { useEffect, useState } from "react";
import { searchItems, getCatalog } from "../../../httpService/httpService";
import { findNode } from "../../../utils/findNode";

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
    setChoosedCategory
) {
    let [checkedVars, setCheckedVars] = useState(false);

    const mainHandler = async () => {
        if (!checkedVars) {
            setCheckedVars(true);
            let category = null;
            eval(`
            if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "category" in CATALOG_PARAMS) category = CATALOG_PARAMS.category
            `);
            if (category) {
                setChoosedCategory(category);
                return;
            }
        }

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

                    if (!categories.length) {
                        setCategories(data.categories);
                    }
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
                setCategories(
                    categories.map((v) => {
                        return {
                            ...v,
                            children: undefined,
                        };
                    })
                );
                mainHandler();
                return;
            }
            if (!(choosedCategory && items && categories)) return;
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
                    if (choosedCategoryData) {
                        choosedCategoryData.children = data.categories;
                        const newCategories = categories.map((v) => ({ ...v }));
                        setCategories(newCategories);
                    }
                }

                setLoading(false);
                setReachedPageIsLast(false);
            }
        };
        func();
    }, [choosedCategory]);
}

export default useUpdateCatalog;
