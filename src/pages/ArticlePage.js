/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../store/dataSlice";
import Article from "../components/article/Article";

function ArticlePage() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getArticle(slug));
  }, [dispatch, slug]);

  const article = useSelector((state) => state.data.article);

  return (
    article && <Article {...article} />
  );
}

export default ArticlePage;
