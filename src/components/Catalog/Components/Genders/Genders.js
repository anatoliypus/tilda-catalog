import { useEffect } from 'react';
import styles from '../../Catalog.module.css'
import genders from './gendersTypes';

function Genders({gender, setGender}) {

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    const queryGender = searchParams.get("gender");
    queryGender === genders.man && setGender(genders.man)
    queryGender === genders.woman && setGender(genders.woman)
  }, [])
  
  return (
    <div className={styles.catalogGenderBlock}>
      <div
        onClick={() => {
            gender !== genders.all && setGender(genders.all)
        }}
        className={`${styles.catalogGender} ${
          gender === genders.all ? styles.catalogGenderChoosed : ""
        }`}
      >
        Все
      </div>
      <div
        onClick={() => {
            gender !== genders.man && setGender(genders.man)
        }}
        className={`${styles.catalogGender} ${
          gender === genders.man ? styles.catalogGenderChoosed : ""
        }`}
      >
        Мужчины
      </div>
      <div
        onClick={() => {
            gender !== genders.woman && setGender(genders.woman)
        }}
        className={`${styles.catalogGender} ${
          gender === genders.woman ? styles.catalogGenderChoosed : ""
        }`}
      >
        Женщины
      </div>
    </div>
  );
}

export default Genders;
