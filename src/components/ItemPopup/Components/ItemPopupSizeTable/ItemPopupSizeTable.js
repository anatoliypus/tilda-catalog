import styles from "./ItemPopupSizeTable.module.css";
import '../ItemPopupScrollbars.css'
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

function ItemPopupSizeTable({ sizeTable }) {
  if (!sizeTable) return null;

  return (
    <div className={styles.sizeTable}>
      <p className={styles.heading}>Таблица размеров</p>
      <OverlayScrollbarsComponent
        defer
        options={{
          overflow: {
            x: "scroll",
          },
          scrollbars: {
            theme: "itemPopupScrollbars",
            autoHide: "never",
          },
        }}
      >
          <table className={styles.table}>
            <tbody>
              {sizeTable.map((size, index) => {
                return (
                  <tr key={index}>
                    <td>{size.sizeKey}</td>
                    {size.sizeValue.split(",").map((sizeValue, index) => {
                      return <td key={index}>{sizeValue}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
      </OverlayScrollbarsComponent>
    </div>
  );
}

export default ItemPopupSizeTable;
