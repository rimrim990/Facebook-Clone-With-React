import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { User } from "../common/App";
import FeedList from "../feed/FeedList";

interface AppProps {
  userInfo: User;
}

const AboutMe = ({ userInfo }: AppProps) => {
  const [feedList, setFeedLisst] = useState<Array<any>>([]);
  const { displayName, photoUrl } = userInfo;

  const getMyFeedList = async () => {
    const data = await dbService
      .collection("feeds")
      .where("creator", "==", userInfo.uid)
      .get();
    try {
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
      <form>
        <img src={photoUrl} alt="user" width="120px" height="120px" />
        <span>{displayName}</span>
        <input type="submit" value="Edit Profile" />
      </form>
      {feedList && <FeedList userInfo={userInfo} feedList={feedList} />}
    </>
  );
};

export default AboutMe;
