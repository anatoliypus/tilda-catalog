import styles from "../Catalog.module.css";
import Category from "./Category";

function Categories({
    categories,
    categoriesRef,
    toggledCategories,
    setToggledCategories,
    setReachedPage,
    setChoosedCategory,
    parentId
}) {
    return (
        <div ref={categoriesRef} className={styles.catalogCategories} data-parentid={parentId ? parentId : undefined}>
            {categories &&
                categories.map((c, index) => {
                    return (
                        <Category
                            key={index}
                            level={0}
                            id={c.id}
                            categoriesRef={categoriesRef}
                            toggledCategories={toggledCategories}
                            setToggledCategories={setToggledCategories}
                            setReachedPage={setReachedPage}
                            name={c.name}
                            setChoosedCategory={setChoosedCategory}
                            children={c.children}
                        />
                    );
                })}
        </div>
    );
}

export default Categories;
