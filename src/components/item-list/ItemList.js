import { useSelector } from "react-redux";
import Item from "../item/Item";
import styles from "./ItemList.module.scss";

function ItemList() {
  const data = useSelector((state) => state.data.articles);
  const items = data.map((item) => (
    <Item key={item.slug} {...item} />
  ));
  return (
    <ul className={styles.cardList}>{items}</ul>
  );
}

export default ItemList;
