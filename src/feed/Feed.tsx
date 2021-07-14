import React, { useEffect, useState } from "react";
import { User } from "../common/App";
import { FeedObjExtended } from "./FeedList";
import { dbService } from "../fbase";
import "./Feed.css";
import img from "../image/free-icon-user-picture.png";

interface AppProps {
  feed: FeedObjExtended;
  userInfo: User;
  isOwner: boolean;
}

const Feed = ({ feed, userInfo, isOwner }: AppProps) => {
  const onDeleteClick = () => {
    try {
      dbService.collection("feeds").doc(feed.id).delete();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="feed">
      <div className="feed-header">
        <img draggable={false} className="creator-img" src={img} alt="user" />
        <div className="creator-info">
          <span className="creator">User</span>
          <br />
          <span className="create-date">
            {new Date(feed.createdAt).toString().substr(4, 11)}
          </span>
        </div>
      </div>
      <div className="feed-form">
        <p className="feed-content">{feed.content}</p>
        {feed.photoUrl && (
          <img
            draggable={false}
            className="feed-img"
            src={feed.photoUrl}
            alt="feedimg"
          />
        )}
        {isOwner && (
          <>
            <div className="line"></div>
            <button className="feed-delete" onClick={onDeleteClick}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
