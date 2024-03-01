import styles from "./ItemPopupSizeTable.module.css";
import '../ItemPopupScrollbars.css'
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

function mapSizeName(name) {
  const mappings = {
    "适合脚长": "Внутренняя длина",
    "欧码EU": "EU",
    "US美码": "US",
    "UK英码": "UK",
    "内长（MM）": "Внутренняя длина (мм)",
    "适合脚长": "Длина стопы"
  }
  if (mappings[name]) return mappings[name]
  return name.split('').filter(char => /[a-zA-Z]/.test(char)).join('')
}

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
                    <td>{mapSizeName(size.name)}</td>
                    {size.value.split(size.delimiter).map((sizeValue, index) => {
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
