import { useEffect, useState } from "react";
import { searchItems, getCatalog } from "../../../httpService/httpService";
import { findNode } from "../../../utils/findNode";
import genders from "../Components/Genders/gendersTypes";

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
    shouldShowCategoriesFilter
) {
    let [checkedVars, setCheckedVars] = useState(false);

    const setCategoriesHandler = (cats, newCats, choosedCategory) => {
        if (cats.length == 0) {
            setCategories(newCats);
            return;
        }
        const choosedCategoryData = findNode(choosedCategory, cats);
        if (choosedCategoryData) {
            choosedCategoryData.children = newCats;
            const newCategories = cats.map((v) => ({ ...v }));
            setCategories(newCategories);
        }
    };

    const mainHandler = async () => {
        if (!checkedVars) {
            setCheckedVars(true);
            let category = null;
            eval(`
            if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "category" in CATALOG_PARAMS) category = CATALOG_PARAMS.category
            `);
            if (!category) {
                const urlParams = new URLSearchParams(window.location.search);
                const categoryURL = urlParams.get("category");
                if (/^[0-9]+[.]{0,1}[0-9]*$/.test(categoryURL)) {
                    category = parseInt(categoryURL);
                }
            }
            if (category) {
                const initialData = await getCatalog(reachedPage, genders.all);
                setCategories(initialData.categories);
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
            const data = await getCatalog(
                reachedPage,
                gender,
                choosedCategory,
                shouldShowCategoriesFilter
            );
            if (data) {
                if (reachedPage === 1) {
                    setItems(data.products);

                    setCategoriesHandler(
                        categories,
                        data.categories,
                        choosedCategory
                    );
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
    }, [reachedPage, searchKey, gender, choosedCategory]);
}

export default useUpdateCatalog;
