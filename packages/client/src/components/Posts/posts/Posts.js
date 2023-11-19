import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postsSlice";
import Warning from "../../../UI/warning/Warning";
import PostElement from "../postElement/PostElement";
import PostAddForm from "../postAddForm/PostAddForm";
import Pagination from "../../../UI/pagination/Pagination";
import { postsClear } from "../posts/postsSlice";

export default function Posts() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3);
  const { languageId } = useParams();
  const { posts, postsLoading, total } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        dispatch(fetchPosts({ languageId, page, pageSize }));
      } catch (e) {
        console.log(e);
      }
    })();
  }, [dispatch, languageId, page, pageSize]);

  useEffect(() => {
    setLoading(postsLoading);
  }, [postsLoading]);

  useEffect(() => {
    return () => {
      dispatch(postsClear());
    };
  }, []);

  const items = posts.map((post) => {
    console.log(post);
    const { id } = post;
    return <PostElement key={id} post={post} />;
  });

  if (loading)
    return <span className="loading loading-spinner loading-lg"></span>;

  console.log(posts);

  return (
    <div className="flex flex-col">
      <div className="mt-14">
        {items.length === 0 ? <Warning title="No post found!" /> : items}
      </div>
      <Pagination
        totalItems={total}
        setCurrentPage={setPage}
        currentPage={page}
        itemsPerPage={pageSize}
      />
      <PostAddForm languageId={languageId} />
    </div>
  );
}
