import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { User } from "../common/App";
import FeedList from "../feed/FeedList";
import "./AboutMe.css";

interface AppProps {
  userInfo: User;
}

const AboutMe = ({ userInfo }: AppProps) => {
  const [feedList, setFeedLisst] = useState<Array<any>>([]);
  const { displayName, photoUrl } = userInfo;

  const getMyFeedList = async () => {
    try {
      const data = await dbService
        .collection("feeds")
        .where("creator", "==", userInfo.uid)
        .get();

      const mappedData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedLisst(mappedData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getMyFeedList();
  }, []);

  return (
    <>
      <form className="my-header">
        <img draggable={false} className="my-img" src={photoUrl} alt="user" />
        <div className="my-name">{displayName}</div>
        <input type="submit" className="my-btn" value="Edit Name" />
        <input type="submit" className="my-btn" value="Upload Photo" />
      </form>
      <div className="my-feed">
        {feedList && <FeedList userInfo={userInfo} feedList={feedList} />}
      </div>
    </>
  );
};

export default AboutMe;
