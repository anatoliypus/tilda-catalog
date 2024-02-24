import styles from './Price.module.css'

function Price({ isMinimal, value }) {
    if (!value) return null
    if (! (typeof value === "number")) value = Math.min(...Object.values(value))

    return <p className={styles.price}>{(isMinimal ? 'от ' : '') + value} рублей</p>
}

export default Price;