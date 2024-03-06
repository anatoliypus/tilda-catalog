import { findNode } from "./findNode";

export function clearSubCategories(categories, setCategories) {
    document.querySelectorAll(`[data-parentid]`).forEach((el) => {
        const parentId = parseInt(el.dataset.parentid);
        const node = findNode(parentId, categories);
        if (node) {
            node.children = undefined;
        }
        const newCategories = categories.map((v) => ({
            ...v,
        }));
        setCategories(newCategories);
    });
}
