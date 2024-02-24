import { useEffect } from "react";
import { searchItems, getCatalog } from "../../../httpService/httpService";

function useUpdateCatalog(
  setLoading,
  reachedPage,
  setReachedPageIsLast,
  setItems,
  searchKey,
  items,
  gender
) {
  useEffect(() => {
    const func = async () => {
      setLoading(true);
      if (searchKey) {
        const data = await searchItems(searchKey, reachedPage, gender);
        if (data) {
          if (reachedPage === 0) {
            setItems(data);
          } else {
            setItems(items.concat(data));
          }
          setLoading(false);
          setReachedPageIsLast(false);
        }
      } else {
        const data = await getCatalog(reachedPage, gender);
        if (data) {
          if (reachedPage === 0) {
            setItems(data);
          } else {
            setItems(items.concat(data));
          }
          setLoading(false);
          setReachedPageIsLast(false);
        }
      }
    };
    func();
  }, [reachedPage, searchKey, gender]);
}

export default useUpdateCatalog;
