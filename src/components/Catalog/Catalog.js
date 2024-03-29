import { useEffect, useRef, useState } from "react";
import Item from "../Item/Item";
import ItemPopup from "../ItemPopup/ItemPopup";
import Search from "../Search/Search";
import styles from "./Catalog.module.css";
import Genders from "./Components/Genders/Genders";
import genders from "./Components/Genders/gendersTypes";
import LoadMore from "./Components/LoadMore";
import useSetLoadingHeight from "./Hooks/useSetLoadingHeight";
import useUpdateCatalog from "./Hooks/useUpdateCatalog";
import Categories from "./Components/Categories";
import { findNode } from "../../utils/findNode";
import { clearSubCategories } from "../../utils/clearSubCategories";

function Catalog() {
    const [searchKey, setSearchKey] = useState(null);
    const [items, setItems] = useState([]);
    const [reachedPage, setReachedPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [reachedPageIsLast, setReachedPageIsLast] = useState(false);
    const [choosedItem, setChoosedItem] = useState(null);
    const loadingBlockRef = useRef(null);
    const [gender, setGender] = useState(genders.all);
    const [categories, setCategories] = useState([]);
    const [choosedCategory, setChoosedCategory] = useState(null);
    const categoriesRef = useRef(null);

    useEffect(() => {
        document
            .querySelectorAll(`.${styles.catalogCategories}`)
            .forEach((v) => {
                v.scrollLeft = 0;
                if (v.querySelector(`.${styles.catalogCategories}`))
                    v.style.overflowX = "hidden";
                else v.style.overflowX = "scroll";
            });
    }, [categories]);

    const shouldShowLoading = loading && reachedPage === 1;
    useSetLoadingHeight(shouldShowLoading, loadingBlockRef);

    let shouldShowSearch = true;
    eval(`
    if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "search" in CATALOG_PARAMS) shouldShowSearch = CATALOG_PARAMS.search
  `);

    let shouldShowFilters = true;
    eval(`
    if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "filters" in CATALOG_PARAMS) shouldShowFilters = CATALOG_PARAMS.filters
  `);

    let shouldShowCategoriesFilter = true;
    eval(`
    if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "categoriesFilters" in CATALOG_PARAMS) shouldShowCategoriesFilter = CATALOG_PARAMS.categoriesFilters
  `);

    useUpdateCatalog(
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
    );

    return (
        <div ref={loadingBlockRef} className={styles.catalogMainBlock}>
            {shouldShowSearch && (
                <Search
                    setSearchKey={(key) => {
                        setSearchKey(key);
                        setReachedPage(1);
                    }}
                    setChoosedCategory={(id) => {
                        clearSubCategories(categories, setCategories);
                        setChoosedCategory(id);
                        setReachedPage(1);
                    }}
                    searchKey={searchKey}
                />
            )}
            {shouldShowFilters && (
                <Genders
                    gender={gender}
                    setGender={(str) => {
                        setReachedPage(1);
                        setGender(str);
                    }}
                />
            )}
            <ItemPopup
                product={choosedItem}
                setProduct={setChoosedItem}
                closePopup={() => {
                    setChoosedItem(null);
                }}
                hidden={choosedItem == null}
            />
            {shouldShowCategoriesFilter && choosedCategory != null && (
                <button
                    onClick={() => {
                        setChoosedCategory(null);
                        setReachedPage(1);
                    }}
                    className={styles.clearCategory}
                >
                    Сброс категории
                </button>
            )}
            <div className={styles.catalog}>
                {shouldShowCategoriesFilter && (
                    <Categories
                        choosedCategory={choosedCategory}
                        setCategories={setCategories}
                        level={0}
                        categories={categories}
                        children={categories}
                        categoriesRef={categoriesRef}
                        setReachedPage={setReachedPage}
                        setChoosedCategory={setChoosedCategory}
                    />
                )}
                <div
                    style={{ width: shouldShowCategoriesFilter ? "" : "100%" }}
                    className={styles.catalogItemsBlock}
                >
                    {shouldShowLoading && (
                        <div className={styles.catalog}>
                            <p className={styles.catalogLoading}>Загрузка...</p>
                        </div>
                    )}
                    {!shouldShowLoading && (
                        <div className={styles.catalogItems}>
                            {items.map((product, index) => {
                                if (!product.title) return null;
                                return (
                                    <Item
                                        key={index}
                                        product={product}
                                        setPopup={setChoosedItem}
                                    />
                                );
                            })}
                        </div>
                    )}

                    {!shouldShowLoading && items && items.length == 0 && <p>По вашему запросу ничего не найдено. <br />Если вы ищите товары по запросу на русском языке, пожалуйста, воспользуйтесь поисковыми подсказками по категориям.</p>}
                    {!shouldShowLoading && (
                        <LoadMore
                            show={!reachedPageIsLast && items}
                            inActive={loading && items.length}
                            reachedPage={reachedPage}
                            setReachedPage={setReachedPage}
                        />
                    )}
                </div>
            </div>

            {/* {!shouldShowLoading && (
                <LoadMore
                    show={!reachedPageIsLast && items}
                    inActive={loading && items.length}
                    reachedPage={reachedPage}
                    setReachedPage={setReachedPage}
                />
            )} */}
        </div>
    );
}

export default Catalog;
