import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../common/App";
import FeedList from "../feed/FeedList";
import AddFeed from "../feed/AddFeed";
import { dbService } from "../fbase";

interface AppProps {
  userInfo: User | null;
}

const Home = ({ userInfo }: AppProps) => {
  const [feedList, setFeedList] = useState<Array<any>>([]);
  const history = useHistory();

  useEffect(() => {
    dbService.collection("feeds").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedList(data);
    });
  }, []);

  if (userInfo) {
    return (
      <div>
        <AddFeed userInfo={userInfo} />
        <FeedList feedList={feedList} userInfo={userInfo} />
      </div>
    );
  } else {
    history.push("/login");
    return <></>;
  }
};

export default Home;
