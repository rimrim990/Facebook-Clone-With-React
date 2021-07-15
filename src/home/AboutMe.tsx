import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import { User } from "../common/App";
import FeedList from "../feed/FeedList";
import "./AboutMe.css";

interface AppProps {
  userInfo: User;
}

const AboutMe = ({ userInfo }: AppProps) => {
  const [feedList, setFeedList] = useState<Array<any>>([]);
  const { displayName, photoUrl } = userInfo;
  const [userName, setUserName] = useState<string>(displayName);
  const [attachment, setAttachment] = useState<string>(photoUrl);
  const [edit, setEdit] = useState<boolean>(false);

  const getMyFeedList = async () => {
    try {
      await dbService
        .collection("feeds")
        .where("creator", "==", userInfo.uid)
        .onSnapshot((snapshot) => {
          const myFeedList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFeedList(myFeedList);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
  };

  const onFileChange = (event: any) => {
    let target: any;
    let attachmentUrl: any;

    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      target = finishedEvent.target;
      attachmentUrl = target.result;
      setAttachment(attachmentUrl);
    };
    reader.readAsDataURL(theFile);
  };

  const onClick = async (event: any) => {
    const {
      target: { name },
    } = event;

    if (name === "edit") {
      setEdit(true);
    } else if (name === "save") {
      setEdit(false);
      await dbService.collection("userInfo").doc(userInfo.uid).update({
        uid: userInfo.uid,
        displayName: userName,
        photoUrl: attachment,
      });
      userInfo = {
        ...userInfo,
        displayName: userName,
        photoUrl: attachment,
      };
    }
  };

  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setUserName(value);
  };

  const onReset = (event: any) => {
    setEdit(false);
    setUserName(displayName);
    setAttachment(photoUrl);
  };

  useEffect(() => {
    getMyFeedList();
  }, []);

  return (
    <>
      <form className="my-header" onSubmit={onSubmit}>
        <img draggable={false} className="my-img" src={attachment} alt="user" />
        {!edit && <div className="my-name">{userName}</div>}
        {edit && (
          <input
            className="my-name edit"
            value={userName}
            onChange={onChange}
          />
        )}
        <input
          type="button"
          name="edit"
          className="my-btn"
          value="Edit Name"
          onClick={onClick}
        />
        <label className="my-btn upload" htmlFor="photo-upload">
          Upload Photo
        </label>
        <input
          accept="image/*"
          onChange={onFileChange}
          type="file"
          id="photo-upload"
        />
        <input
          name="save"
          type="submit"
          value="Cancel"
          className="my-btn reset"
          onClick={onReset}
        />
        <input
          name="save"
          type="submit"
          value="Save"
          className="my-btn"
          onClick={onClick}
        />
      </form>
      <div className="my-feed">
        {feedList && <FeedList userInfo={userInfo} feedList={feedList} />}
      </div>
    </>
  );
};

export default AboutMe;
