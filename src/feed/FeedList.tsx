import React from "react";
import { User, FeedObj } from "../common/App";
import Feed from "./Feed";

export interface FeedObjExtended extends FeedObj {
  id: string;
}

interface AppProps {
  feedList: Array<FeedObjExtended>;
  userInfo: User;
}

const FeedList = ({ feedList, userInfo }: AppProps) => {
  return (
    <>
      {feedList.map((feed: any) => (
        <Feed
          key={feed.id}
          feed={feed}
          userInfo={userInfo}
          isOwner={feed.creator === userInfo.uid}
        />
      ))}
    </>
  );
};

export default FeedList;
