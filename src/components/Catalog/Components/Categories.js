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
    children
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
                            id={c.id}
                            categoriesRef={categoriesRef}
                            setReachedPage={setReachedPage}
                            name={c.name}
                            setChoosedCategory={setChoosedCategory}
                            children={c.children}
                            categories={categories}
                        />
                    );
                })}
        </div>
    );
}

export default Categories;
