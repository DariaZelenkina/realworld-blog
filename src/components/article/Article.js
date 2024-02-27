/* eslint-disable react/prop-types */
import Markdown from "markdown-to-jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { deleteArticle } from "../../store/dataSlice";
import styles from "./Article.module.scss";
import ArticleHeader from "../article-header/ArticleHeader";

function Article(props) {
  const { slug } = props;
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = () => {
    dispatch(deleteArticle(slug))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((rejectValue) => {
        toast(rejectValue);
      });
  };

  return (
    <div className={styles.articleCard}>
      <div className={styles.header}>
        <ArticleHeader {...props} />
      </div>
      {user
        && (
        <div className={styles.buttonWrap}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => {
              Modal.confirm({
                content: "Are you sure to delete this article?",
                onOk() { onDelete(); },
              });
            }}
          >
            Delete
          </button>
          <Link to={`/articles/${slug}/edit`}>
            <button type="button" className={styles.editButton}>Edit</button>
          </Link>
        </div>
        )}
      <Markdown className={styles.articleBody}>{props.body}</Markdown>
    </div>
  );
}

export default Article;
