import React, { useState, useRef, ChangeEvent, SyntheticEvent } from "react";
import { User, FeedObj } from "../common/App";
import { dbService } from "../fbase";
import "./AddFeed.css";

interface AppProps {
  userInfo: User;
}

const AddFeed = ({ userInfo }: AppProps) => {
  const [attachment, setAttachment] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setContent(value);
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError("");

    const feedObj: FeedObj = {
      creator: userInfo.uid,
      createdAt: Date.now(),
      content: content,
      photoUrl: attachment,
    };

    try {
      await dbService.collection("feeds").add(feedObj);
    } catch (err) {
      setError("error! : " + err.message);
    } finally {
      setContent("");
      setAttachment(null);
      onReset();
    }
  };

  const onFileChange = (event: any) => {
    let target: any;
    let imgUrl: string;
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      target = finishedEvent.currentTarget;
      imgUrl = target.result;
      setAttachment(imgUrl);
    };
    reader.readAsDataURL(theFile);
  };

  const onReset = () => {
    if (!fileInput.current) throw Error("inputRef is not assigned!");
    fileInput.current.value = "";
  };

  return (
    <div className="add-feed">
      <header className="feed-header">
        <h3 className="feed-title">Create Post</h3>
      </header>
      <form onSubmit={onSubmit} className="feed-form">
        <img className="user-img" src={userInfo.photoUrl} alt="user" />
        <input
          type="text"
          placeholder={`What's on your mind, ${userInfo.displayName}?`}
          value={content}
          onChange={onChange}
          maxLength={240}
          className="text-input"
          required
        />
        <div className="line"></div>
        <div className="feed-img">
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            ref={fileInput}
            className="file-input "
          />
          <input type="submit" value="Post" className="feed-post" />
          <button type="button" onClick={onReset} className="clear-photo">
            Clear Photo
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default AddFeed;
