/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { uniqueId } from "lodash";
import styles from "./ArticleHeader.module.scss";
import heart from "../../assets/heart 1.png";
import { favouriteArticle } from "../../store/dataSlice";

function ArticleHeader(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { slug, title, description, tagList, createdAt, favorited, favoritesCount, author } = props;
  const tags = tagList.map((tag) => (
    tag && <span key={uniqueId()}>{tag}</span>
  ));
  const date = format(new Date(createdAt), "PP");

  const likeArticle = () => {
    dispatch(favouriteArticle(slug));
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <Link to={`/articles/${slug}`} className={styles.title}>{title}</Link>
          <div className={styles.likeWrapper}>
            {user && <input className={`${favorited && styles.liked} ${styles.likeBtn}`} type="button" onClick={likeArticle} />}
            {!user && <img className={styles.likeImage} src={heart} alt="Like button" />}
            <span>{favoritesCount}</span>
          </div>
        </div>
        <div className={styles.tagsWrapper}>{tags}</div>
        <p>{description}</p>
      </div>
      <div className={styles.authorInfo}>
        <div>
          <h6 className={styles.authorName}>{author.username}</h6>
          <span className={styles.date}>{date}</span>
        </div>
        <img className={styles.authorImage} src={author.image} alt="Avatar" />
      </div>
    </>
  );
}

export default ArticleHeader;
