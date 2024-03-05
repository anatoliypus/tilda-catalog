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
                            if (el) {
                                const elChilds = document.querySelector(
                                    `[data-parentid='${el.dataset.id}']`
                                );
                                elChilds &&
                                    !elChilds.contains(e.target) &&
                                    elChilds.remove();
                            }
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
                    categories={children}
                    categoriesRef={categoriesRef}
                    setReachedPage={setReachedPage}
                    setChoosedCategory={setChoosedCategory}
                />
            )}
        </>
    );
}

export default Category;
