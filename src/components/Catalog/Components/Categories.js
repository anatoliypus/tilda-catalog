import styles from "../Catalog.module.css";
import Category from "./Category";

function Categories({
    categories,
    categoriesRef,
    setReachedPage,
    setChoosedCategory,
    parentId,
    level,
    setCategories,
    children,
    choosedCategory
}) {
    return (
        <div ref={categoriesRef} className={styles.catalogCategories} data-parentid={parentId ? parentId : undefined}>
            {children &&
                children.map((c, index) => {
                    return (
                        <Category
                            setCategories={setCategories}
                            key={index}
                            level={level}
                            categoriesRef={categoriesRef}
                            setReachedPage={setReachedPage}
                            node={c}
                            setChoosedCategory={setChoosedCategory}
                            categories={categories}
                            choosedCategory={choosedCategory}
                        />
                    );
                })}
        </div>
    );
}

export default Categories;
