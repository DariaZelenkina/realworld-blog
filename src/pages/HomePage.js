import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Pagination } from "@mui/material";
import { getArticles, navigateToPage } from "../store/dataSlice";
import ItemList from "../components/item-list/ItemList";

function HomePage() {
  const dispatch = useDispatch();
  const { pagesCount, page } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getArticles(page));
  }, [dispatch, page]);

  return (
    <>
      <ItemList />
      {!!pagesCount && (
        <Pagination
          shape="rounded"
          color="primary"
          size="small"
          count={pagesCount}
          page={page}
          sx={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}
          onChange={(_, num) => dispatch(navigateToPage({ page: num }))}
        />
      )}
    </>
  );
}

export default HomePage;
