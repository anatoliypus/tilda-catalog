import { useEffect, useRef, useState } from "react";
import styles from "./Search.module.css";
import { getHints } from "../../httpService/httpService";

function processCategoryTitle(str) {
    return str.toUpperCase();
}

function addParam(str) {
    var refresh =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        `?key=${str}`;
    window.history.replaceState({ path: refresh }, "", refresh);
}

function Search({ setSearchKey, searchKey, setChoosedCategory }) {
    const inputRef = useRef(null);

    const searchParams = new URL(window.location.href).searchParams;

    const queryKey = searchParams.get("key");
    const categoryKey = searchParams.get("category");
    const categoryTitleKey = searchParams.get("categoryTitle");

    const [shouldUseKey, setShouldUseKey] = useState(false);
    const [shouldUseCategory, setShouldUseCategory] = useState(false);
    const [hints, setHints] = useState([]);

    useEffect(() => {
        const shouldUseKey = queryKey && queryKey.length && !categoryKey;
        const shouldUseCategory =
            categoryKey &&
            categoryKey.length &&
            categoryTitleKey &&
            categoryTitleKey.length &&
            !queryKey;

        setShouldUseKey(shouldUseKey);
        setShouldUseCategory(shouldUseCategory);
    }, []);

    useEffect(() => {
        shouldUseKey && setSearchKey(queryKey);
        shouldUseCategory && setSearchKey(categoryKey);
    }, [queryKey, categoryKey, categoryTitleKey]);

    const clickHandler = () => {
        setShouldUseCategory(false);
        setShouldUseKey(false);
        if (inputRef && inputRef.current) {
            const link = inputRef.current;
            if (link.value) {
                setSearchKey(link.value);
                addParam(link.value);
            } else {
                setHints([]);
                setSearchKey(null);
            }
        }
    };

    let timeout;

    const keyUpHandler = (e) => {
        if (timeout) clearTimeout(timeout);

        if (e.key == "Enter" || e.keyCode === 13) {
            setShouldUseCategory(false);
            setShouldUseKey(false);
            const link = e.target;
            if (link.value) {
                setSearchKey(link.value);
                addParam(link.value);
            } else {
                setHints([]);
                setSearchKey(null);
            }
            e.target.blur();
        } else {
            timeout = setTimeout(async () => {
                const key = e.target.value;
                if (key) {
                    const hints = await getHints(key);
                    setHints(hints);
                } else {
                  setHints([]);
                }
            }, 600);
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
                <button
                    className={styles.searchButton}
                    onClick={clickHandler}
                />
            </div>
            {hints && hints.length > 0 && (
                <div className={styles.searchHints}>
                  {hints.sort((a, b) => {
                    if (a.name.length > b.name.length) return 1
                    if (a.name.length < b.name.length) return -1
                    return 0
                  }).map((hint, index) => {
                    if (hint.type == 'category') {
                      return <button onClick={() => {
                        setChoosedCategory(hint.id)
                        if (inputRef && inputRef.current) {
                          inputRef.current.value = ''
                        }
                        setHints([])
                      }} key={index} className={styles.hintButton}><span>Категория:</span> {hint.name.toLowerCase()}</button>
                    } else {
                      return null
                    }
                  })}
                </div>
            )}
            {shouldUseCategory && (
                <p className={styles.categoryTitle}>
                    {processCategoryTitle(categoryTitleKey)}
                </p>
            )}
        </div>
    );
}

export default Search;
