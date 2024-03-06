import styles from "../ItemPopup.module.css";
import ItemPopupSizesLoader from "./ItemPopupSizesLoader";

export function checkSize(str) {
  // const allowed = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890., `
  // const filtered = str.split('').filter((ch) => allowed.indexOf(ch) !== -1).join('')
  // return filtered === str
  return true
}

function ItemPopupSizes({hidden, prices, choosedSize, setChoosedSize}) {
  return (
    <div className={styles.itemPopupSizes}>
      {!hidden &&
        prices &&
        Object.keys(prices).sort().map((size, index) => {
          const price = prices[size]
          if (size && price) {
            return (
              <button
                key={index}
                className={`${styles.itemPopupSize} ${
                  choosedSize && size === choosedSize.size ? styles.itemPopupSizeChoosed : ""
                }`}
                onClick={() => {
                  setChoosedSize({ size, price });
                }}
              >
                {prices.length == 1 ? 'Одна опция' : size}
              </button>
            );
          }
          return null
        })}
      {!hidden && !prices && <ItemPopupSizesLoader />}
    </div>
  );
}

export default ItemPopupSizes