import { findNode } from "../../../utils/findNode";
import styles from "../Catalog.module.css";
import Categories from "./Categories";

function Category({
    level,
    id,
    categoriesRef,
    setReachedPage,
    name,
    setChoosedCategory,
    children,
    categories,
    setCategories,
}) {
    return (
        <>
            <button
                className={styles.categoryButton}
                data-level={level}
                data-id={id}
                onClick={(e) => {
                    if (
                        e.target.classList.contains(styles.categoryButtonActive)
                    ) {
                        e.target.classList.remove(styles.categoryButtonActive);
                        setChoosedCategory(null);
                    } else {
                        if (categoriesRef && categoriesRef.current) {
                            const el = document.querySelector(
                                `.${styles.categoryButtonActive}`
                            );
                            el &&
                                el.classList.remove(
                                    styles.categoryButtonActive
                                );
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
                        setChoosedCategory(id);
                    }
                    setReachedPage(1);
                }}
            >
                {name}
            </button>
            {children && (
                <Categories
                    level={level + 1}
                    parentId={id}
                    categories={categories}
                    categoriesRef={categoriesRef}
                    setReachedPage={setReachedPage}
                    setChoosedCategory={setChoosedCategory}
                    children={children}
                    setCategories={setCategories}
                />
            )}
        </>
    );
}

export default Category;
