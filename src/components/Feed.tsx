import React from "react";
import { User } from "./App";
import { FeedObjExtended } from "./FeedList";
import { dbService } from "../fbase";

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
    <div>
      <span>{feed.createdAt}</span>
      <p>{feed.content}</p>
      {feed.photoUrl && (
        <img src={feed.photoUrl} alt="feedimg" width="200px" height="200px" />
      )}
      {isOwner && <button onClick={onDeleteClick}>Delete Feed</button>}
      <button>Like</button>
      <button>Comment</button>
      <button>Share</button>
    </div>
  );
};

export default Feed;
