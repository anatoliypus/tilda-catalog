import styles from "../Catalog.module.css";
import Categories from "./Categories";

const activeStyles = {
    backgroundColor: '#000',
    color: '#fff'
}

const defaultStyles = {
    backgroundColor: '',
    color: ''
}

function setStyle( elem, propertyObject )
{
 for (var property in propertyObject)
    elem.style[property] = propertyObject[property];
}

function Category({
    level,
    id,
    categoriesRef,
    toggledCategories,
    setToggledCategories,
    setReachedPage,
    name,
    setChoosedCategory,
    children,
}) {
    return (
        <>
            <button
                className={styles.categoryButton}
                data-level={0}
                data-id={id}
                onClick={(e) => {
                    if (categoriesRef && categoriesRef.current) {
                        const el = document.querySelector(`.${styles.categoryButtonActive}`)
                        el && el.classList.remove(styles.categoryButtonActive)
                        if (el) {
                            const elChilds = document.querySelector(`[data-parentid='${el.dataset.id}']`)
                            elChilds && !elChilds.contains(e.target) && elChilds.remove()
                        }
                    }
                    e.target.classList.add(styles.categoryButtonActive)
                    setChoosedCategory(id);
                    if (level == 0) setToggledCategories([id]);
                    else setToggledCategories(toggledCategories + [id]);
                    setReachedPage(1);
                }}
            >
                {name}
            </button>
            {children && (
                <Categories
                    parentId={id}
                    categories={children}
                    categoriesRef={categoriesRef}
                    toggledCategories={toggledCategories}
                    setToggledCategories={setToggledCategories}
                    setReachedPage={setReachedPage}
                    setChoosedCategory={setChoosedCategory}
                />
            )}
        </>
    );
}

export default Category;
