import { useEffect, useState } from "react";
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

    useEffect(() => {
        if ((node.id == choosedCategory) != active) console.log('change in', node.id)
        setActive(node.id == choosedCategory)
    }, [categoriesRef, categories, node, choosedCategory])

    return (
        <>
            <button
                className={`${styles.categoryButton} ${active ? styles.categoryButtonActive: ''}`}
                data-level={level}
                data-id={node.id}
                onClick={(e) => {
                    if (node.id == choosedCategory) {
                        setChoosedCategory(null);
                    } else {
                        if (categoriesRef && categoriesRef.current) {
                            document
                                .querySelectorAll(
                                    `[data-parentid]`
                                )
                                .forEach((el) => {
                                    const parentId = parseInt(el.dataset.parentid)
                                    const node = findNode(parentId, categories)
                                    if (node && el && !el.contains(e.target)) {
                                        node.children = undefined
                                        const newCategories = categories.map((v) => ({...v}))
                                        setCategories(newCategories)
                                    }
                                });
                        }
                        e.target.classList.add(styles.categoryButtonActive);
                        setChoosedCategory(node.id);
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
