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

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
    setAttachment(null);
  };

  return (
    <div className="add-feed">
      <header className="feed-header">
        <h3 className="feed-title">Create Post</h3>
      </header>
      <form onSubmit={onSubmit} className="feed-form">
        <div className="feed-view">
          <img
            draggable={false}
            className="user-img"
            src={userInfo.photoUrl}
            alt="user"
          />
          <textarea
            placeholder={`What's on your mind, ${userInfo.displayName}?`}
            value={content}
            onChange={onChange}
            maxLength={180}
            className="text-input"
            rows={4}
            cols={45}
            required
          ></textarea>
        </div>
        {attachment && (
          <img
            draggable={false}
            src={attachment}
            alt="feed-img"
            className="feed-attachment"
          />
        )}
        <div className="line"></div>
        <div className="feed-img">
          <label className="file-input" htmlFor="file-input">
            Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            ref={fileInput}
            id="file-input"
          />
          <input type="submit" value="Post" className="feed-post" />
          {attachment && (
            <button type="button" onClick={onReset} className="clear-photo">
              Clear
            </button>
          )}
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default AddFeed;
