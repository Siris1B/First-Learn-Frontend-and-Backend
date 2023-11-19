import dayjs from "dayjs";
import React from "react";

export default function PostElement({ post }) {
  function createMarkup() {
    return { __html: post.description };
  }
  return (
    <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
      <div className="relative flex gap-4">
        <img
          src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
          className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
          alt=""
          loading="lazy"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
              {post.User.user_name}
            </p>
          </div>
          <p className="text-gray-400 text-sm">
            {dayjs(post.created_at).format("MMMM D YYYY[, at] hh:mm A")}
          </p>
        </div>
      </div>
      <div className="ml-5" dangerouslySetInnerHTML={createMarkup()}></div>
    </div>
  );
}
