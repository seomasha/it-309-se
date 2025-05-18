import React from "react";
import blankImage from "../assets/blank-profile.png";
import { FaCloud, FaHeart } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const Post = () => {
  return (
    <div className="bg-white border rounded-4 my-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img src={blankImage} width={50} className="rounded-circle mx-3" />
          <div className="mt-2 lh-sm">
            <h6 className="mt-3 primary-color">
              Sead Masetic
              <br />
              <span className="text-secondary">@seadmasetic</span>
            </h6>
            <p>3h</p>
          </div>
        </div>
        <button className="btn btn-outline-primary mx-3">Follow</button>
      </div>

      <p className="mx-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque autem
        nobis deserunt eius rem facere, in aspernatur itaque minima quos maiores
        aliquid repudiandae sapiente officia enim laudantium labore assumenda
        quisquam.
      </p>
      <div className="p-3">
        <div
          className="rounded"
          style={{
            backgroundImage: `url(${blankImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
          }}
        />
      </div>

      <div className="d-flex justify-content-between my-5">
        <button className="btn btn-outline-primary mx-3 d-flex gap-2 align-items-center">
          <FaHeart />
          Like
        </button>
        <button className="btn btn-outline-primary mx-3 d-flex gap-2 align-items-center">
          <FaCloud />
          Comment
        </button>
        <button className="btn btn-outline-primary mx-3 d-flex gap-2 align-items-center">
          <IoIosSend />
          Share
        </button>
      </div>
    </div>
  );
};

export default Post;
