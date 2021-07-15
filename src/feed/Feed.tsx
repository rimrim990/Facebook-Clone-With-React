import React, { useState } from "react";
import { User } from "../common/App";
import { FeedObjExtended } from "./FeedList";
import { dbService } from "../fbase";
import "./Feed.css";

interface AppProps {
  feed: FeedObjExtended;
  isOwner: boolean;
}

const Feed = ({ feed, isOwner }: AppProps) => {
  const [creator, setCreator] = useState<User | null>(null);
  const getCreatorInfo = async () => {
    const querySnapshot = await dbService
      .collection("userInfo")
      .where("uid", "==", feed.creator)
      .get();
    querySnapshot.forEach((doc) => {
      const { uid, displayName, photoUrl } = doc.data();
      setCreator({
        uid: uid,
        displayName: displayName,
        photoUrl: photoUrl,
      });
    });
  };
  const onDeleteClick = () => {
    try {
      dbService.collection("feeds").doc(feed.id).delete();
    } catch (err) {
      console.log(err.message);
    }
  };
  getCreatorInfo();
  return (
    <div className="feed">
      {creator && (
        <div className="feed-header">
          <img
            draggable={false}
            className="creator-img"
            src={creator.photoUrl}
            alt="user"
          />

          <div className="creator-info">
            <span className="creator">{creator?.displayName}</span>
            <br />
            <span className="create-date">
              {new Date(feed.createdAt).toString().substr(4, 11)}
            </span>
          </div>
        </div>
      )}
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
