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

function Catalog() {
  const [searchKey, setSearchKey] = useState(null);
  const [items, setItems] = useState([]);
  const [reachedPage, setReachedPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reachedPageIsLast, setReachedPageIsLast] = useState(false);
  const [choosedItem, setChoosedItem] = useState(null);
  const loadingBlockRef = useRef(null);
  const [gender, setGender] = useState(genders.all);

  useUpdateCatalog(
    setLoading,
    reachedPage,
    setReachedPageIsLast,
    setItems,
    searchKey,
    items,
    gender
  );

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    const id = searchParams.get("productId");
    if (id) {
      setChoosedItem({
        productId: id,
        title: null,
        img: null,
      });
    }
  }, []);

  const shouldShowLoading = loading && reachedPage === 0;
  useSetLoadingHeight(shouldShowLoading, loadingBlockRef);

  let shouldShowSearch = true
  eval(`
    if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "search" in CATALOG_PARAMS) shouldShowSearch = CATALOG_PARAMS.search
  `)

  let shouldShowFilters = true
  eval(`
    if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "filters" in CATALOG_PARAMS) shouldShowFilters = CATALOG_PARAMS.filters
  `)
  console.log(loading)
  console.log(shouldShowLoading)

  return (
    <div
      ref={loadingBlockRef}
      className={styles.catalogMainBlock}
    >
      {shouldShowSearch && <Search
        setSearchKey={(key) => {
          setSearchKey(key);
          setReachedPage(0);
        }}
        searchKey={searchKey}
      />}
      { shouldShowFilters && 
      <Genders
        gender={gender}
        setGender={(str) => {
          setReachedPage(0);
          setGender(str);
        }}
      />}
      {shouldShowLoading && (
        <div className={styles.catalog}>
          <p className={styles.catalogLoading}>Загрузка...</p>
        </div>
      )}
      <ItemPopup
        product={choosedItem}
        setProduct={setChoosedItem}
        closePopup={() => {
          setChoosedItem(null);
        }}
        hidden={choosedItem == null}
      />
      {!shouldShowLoading && (
        <div className={styles.catalog}>
          <div className={styles.catalogItems}>
            {items.map((product, index) => {
              if (!product.title) return null;
              return (
                <Item key={index} product={product} setPopup={setChoosedItem} />
              );
            })}
          </div>
        </div>
      )}
      {!shouldShowLoading && (
        <LoadMore
          show={!reachedPageIsLast && items}
          inActive={loading && items.length}
          reachedPage={reachedPage}
          setReachedPage={setReachedPage}
        />
      )}
    </div>
  );
}

export default Catalog;
