import { useEffect, useRef, useState } from "react";
import styles from "./Search.module.css";

function processCategoryTitle(str) {
  return str.toUpperCase()
}

function addParam(str) {
  var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + `?key=${str}`;
  window.history.replaceState({ path: refresh }, '', refresh);
}

function Search({ setSearchKey, searchKey }) {
  const inputRef = useRef(null);

  const searchParams = new URL(window.location.href).searchParams;

  const queryKey = searchParams.get("key");
  const categoryKey = searchParams.get("category");
  const categoryTitleKey = searchParams.get("categoryTitle");

  const [shouldUseKey, setShouldUseKey] = useState(false)
  const [shouldUseCategory, setShouldUseCategory] = useState(false)

  useEffect(() => {
    const shouldUseKey = queryKey && queryKey.length && !categoryKey;
    const shouldUseCategory =
      categoryKey &&
      categoryKey.length &&
      categoryTitleKey &&
      categoryTitleKey.length &&
      !queryKey;

    setShouldUseKey(shouldUseKey)
    setShouldUseCategory(shouldUseCategory)

    // if (shouldUseKey) {
    //   setSearchKey(queryKey)
    // } else if (shouldUseCategory) {
    //   setSearchKey(categoryKey)
    // } else {
    //   setSearchKey("sneakers")
    // }
  }, [])

  useEffect(() => {
    shouldUseKey && setSearchKey(queryKey);
    shouldUseCategory && setSearchKey(categoryKey);
  }, [queryKey, categoryKey, categoryTitleKey]);

  const clickHandler = () => {
    setShouldUseCategory(false)
    setShouldUseKey(false)
    if (inputRef && inputRef.current) {
      const link = inputRef.current;
      if (link.value) {
        setSearchKey(link.value);
        addParam(link.value)
      } else {
        // setSearchKey("sneakers");
      }
    }
  };

  const keyUpHandler = (e) => {
    if (e.key == "Enter" || e.keyCode === 13) {
      setShouldUseCategory(false)
      setShouldUseKey(false)
      const link = e.target;
      if (link.value) {
        setSearchKey(link.value);
        addParam(link.value)
      } else {
        // setSearchKey("sneakers");
      }
      e.target.blur();
    }
  };

  useEffect(() => {
    if (searchKey && inputRef && inputRef.current && !categoryKey) {
      inputRef.current.value = searchKey;
    }
  }, [searchKey]);

  return (
    <div className={styles.container}>
      <div className={styles.searchBlock}>
        <input
          type="text"
          className={styles.search}
          placeholder="Что будем искать?"
          ref={inputRef}
          onKeyUp={keyUpHandler}
        />
        <button className={styles.searchButton} onClick={clickHandler} />
      </div>
      {shouldUseCategory && (
        <p className={styles.categoryTitle}>
          {processCategoryTitle(categoryTitleKey)}
        </p>
      )}
    </div>
  );
}

export default Search;
