import React, { useState, useEffect } from "react";
import { FeedObj, User } from "./App";
import FeedList from "./FeedList";
import AddFeed from "./AddFeed";
import { dbService } from "../fbase";

interface AppProps {
  userInfo: User;
}

const Home = ({ userInfo }: AppProps) => {
  const [feedList, setFeedList] = useState<Array<any>>([]);
  useEffect(() => {
    dbService.collection("feeds").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedList(data);
    });
  }, []);
  return (
    <div>
      <header></header>
      <main>
        <AddFeed userInfo={userInfo} />
        <FeedList feedList={feedList} userInfo={userInfo} />
      </main>
    </div>
  );
};

export default Home;
