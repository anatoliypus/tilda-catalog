import ItemPopupRelativesItem from './components/ItemPopupRelativesItem';
import styles from './ItemPopupRelatives.module.css'
import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import '../ItemPopupScrollbars.css'

function ItemPopupRelatives({ relatives, onClick }) {
    if (!relatives) return null;
    return (<div className={styles.itemPopupRelatives}>
            <p className={styles.itemPopupRelativesHeading}>Вам могут понравиться</p>
            <OverlayScrollbarsComponent defer options={{
                overflow: {
                    x: 'scroll',
                },
                scrollbars: {
                    theme: 'itemPopupScrollbars',
                    autoHide: 'never'
                }
            }}>
                <div className={styles.itemPopupRelativesBlock}>
                    {relatives.map((el, index) => <ItemPopupRelativesItem key={index} item={el} onClick={onClick} />)}
                </div>
            </OverlayScrollbarsComponent>
        </div>
    )
}

export default ItemPopupRelatives;