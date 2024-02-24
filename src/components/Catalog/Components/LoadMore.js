import styles from "../Catalog.module.css";

function LoadMore({ show, setReachedPage, reachedPage, inActive }) {
  if (!show) return null;

  return (
    <div className={styles.loadMoreBlock}>
      <button
        className={`${styles.loadMore} ${
          inActive ? styles.loadMoreInactive : ""
        }`}
        onClick={() => {
          setReachedPage(reachedPage + 1);
        }}
      >
        Загрузить еще
      </button>
    </div>
  );
}

export default LoadMore;
