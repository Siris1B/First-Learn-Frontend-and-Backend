import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';

import 'react-quill/dist/quill.snow.css';
import { createPost, fetchPosts } from '../posts/postsSlice';
import Loading from '../../UI/loading/Loading';

import './PostAddForm.css';

export default function PostAddForm({ languageId, setNewItemCreated }) {
  const [post, setPost] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function submitBtnClicked() {
    try {
      await Yup.string().required().validate(post);
      const temp = post.replace(/<[^>]*>/g, '');
      await Yup.string()
        .min(5, 'Коментар повине складатась хочаб з 5 символів')
        .required()
        .validate(temp);
      setLoading(true);
      await dispatch(createPost({ post, id: languageId }));
      await dispatch(fetchPosts({ languageId, page: 1, pageSize: 3 }));
      setLoading(false);
      setNewItemCreated(true);
      setPost('');
    } catch (e) {
      setLoading(false);
      setStatus('Поле не може бути порожнім!');
      setTimeout(() => {
        setStatus('');
      }, 2000);
    }
  }
  // duration-0 translate-y-[-57px]
  return (
    <div>
      <button
        className="btn block mx-auto "
        onClick={() => document.getElementById('my_modal_1').showModal()}
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
            <button className="btn mt-4 relative" onClick={submitBtnClicked}>
              {loading ? <Loading /> : 'Add post'}
            </button>
            <div>{status}</div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
