import { useSelector } from "react-redux";
import ArticleForm from "../components/article-form/ArticleForm";

function EditArticlePage() {
  const article = useSelector((state) => state.data.article);
  return (<ArticleForm mode="edit" article={article} />);
}

export default EditArticlePage;
