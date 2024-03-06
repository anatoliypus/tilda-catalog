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
    return (
        <>
            <button
                className={`${styles.categoryButton} ${node.id == choosedCategory ? styles.categoryButtonActive: ''}`}
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
                />
            )}
        </>
    );
}

export default Category;
