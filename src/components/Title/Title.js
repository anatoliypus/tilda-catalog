export function Title({title, className}) {
    const maxLen = 40
    if (title.length > maxLen) {
        title = title.slice(0, maxLen) + '...'
    }
    return <p className={className}>{title}</p>
}
