import Price from "../../../../Price/Price";
import styles from "../ItemPopupRelatives.module.css";
import { Title } from "../../../../Title/Title"

function ItemPopupRelativesItem({ item, onClick }) {
  return (
    <div className={styles.relativesItem} onClick={() => {
        onClick(item)
    }}>
      <img src={item.image} alt="" className={styles.relativesItemImg} />
      <Title title={item.title} className={styles.relativesItemTitle} />
      <Price isMinimal={true} value={item.minPrice} />
    </div>
  );
}

export default ItemPopupRelativesItem;
