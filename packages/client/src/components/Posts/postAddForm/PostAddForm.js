import React, { useState } from "react";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createPost, fetchPosts } from "../posts/postsSlice";
import { useDispatch } from "react-redux";
import "./postAddForm.css";

export default function PostAddForm({ languageId }) {
  const [post, setPost] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  async function submitBtnClicked() {
    try {
      await Yup.string().required().validate(post);
      const temp = post.replace(/<[^>]*>/g, "");
      console.log(temp);
      await Yup.string()
        .min(5, "Коментар повине складатась хочаб з 5 символів")
        .required()
        .validate(temp);
      await dispatch(createPost({ post, id: languageId }));
      await dispatch(fetchPosts({ languageId, page: 1, pageSize: 3 }));
      setPost("");
    } catch (e) {
      console.log(e);
      setStatus("Поле не може бути порожнім!");
      setTimeout(() => {
        setStatus("");
      }, 2000);
    }
  }

  return (
    <div>
      <button
        className="btn absolute top-[10px] left-[900px]"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Add post
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 h-96 max-w-5xl">
          <h3 className="font-bold text-lg">Post add form</h3>
          <div className="modal-action flex-col">
            <ReactQuill
              className="w-full"
              method="dialog"
              theme="snow"
              value={post}
              onChange={setPost}
            />
            <button className="btn mt-4" onClick={submitBtnClicked}>
              Add post
            </button>
            <div>{status}</div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
