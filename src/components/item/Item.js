import ArticleHeader from "../article-header";
import styles from "./Item.module.scss";

function Item(props) {
  return (
    <div className={styles.card}>
      <ArticleHeader {...props} />
    </div>
  );
}

export default Item;
