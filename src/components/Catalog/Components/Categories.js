import styles from "../Catalog.module.css";
import Category from "./Category";

function Categories({
    categories,
    categoriesRef,
    setReachedPage,
    setChoosedCategory,
    parentId,
    level
}) {
    return (
        <div ref={categoriesRef} className={styles.catalogCategories} data-parentid={parentId ? parentId : undefined}>
            {categories &&
                categories.map((c, index) => {
                    return (
                        <Category
                            key={index}
                            level={level}
                            id={c.id}
                            categoriesRef={categoriesRef}
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
