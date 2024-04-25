import { useEffect, useRef, useState } from "react";
import { findNode } from "../../../utils/findNode";
import styles from "../Catalog.module.css";
import Categories from "./Categories";

function Category({
    level,
    categoriesRef,
    setReachedPage,
    setChoosedCategory,
    categories,
    setCategories,
    node,
    choosedCategory
}) {
    const [active, setActive] = useState(false)
    const btnRef = useRef(null)

    const clearCategories = (node) => {
        node.children = undefined
        const newCategories = categories.map((v) => ({...v}))
        setCategories(newCategories)
    }

    useEffect(() => {
        setActive(node.id == choosedCategory)
        if ((node.id != choosedCategory || !choosedCategory) && node.children && categoriesRef && categoriesRef.current && btnRef && btnRef.current) {
            console.log(1)
            const btn = btnRef.current
            let activeInside = false
                document
                    .querySelectorAll(
                        `[data-parentid='${node.id}']>[data-id]`
                    )
                    .forEach((el) => {
                        const id = parseInt(el.dataset.id)
                        console.log(el, id, choosedCategory)
                        if (choosedCategory == id) {
                            activeInside = true
                            return
                        }
                    });
            if (!activeInside) {
                clearCategories(node)
            }
        }
    }, [categoriesRef, categories, node, choosedCategory])

    return (
        <>
            <button
                className={`${styles.categoryButton} ${active ? styles.categoryButtonActive: ''}`}
                data-level={level}
                data-id={node.id}
                ref={btnRef}
                onClick={(e) => {
                    if (node.id == choosedCategory) {
                        setChoosedCategory(null);
                    } else {
                        setChoosedCategory(node.id);
                        e.target.classList.add(styles.categoryButtonActive);
                    }
                    setReachedPage(1);
                }}
            >
                {node.name}
            </button>
            {node.children && (
                <Categories
                    level={level + 1}
                    parentId={node.id}
                    categories={categories}
                    categoriesRef={categoriesRef}
                    setReachedPage={setReachedPage}
                    setChoosedCategory={setChoosedCategory}
                    children={node.children}
                    setCategories={setCategories}
                    choosedCategory={choosedCategory}
                />
            )}
        </>
    );
}

export default Category;
