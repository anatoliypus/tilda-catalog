export function findNode(id, array) {
    for (const node of array) {
        if (node.id === id) return node;
        if (node.children) {
            const child = findNode(id, node.children);
            if (child) return child;
        }
    }
}