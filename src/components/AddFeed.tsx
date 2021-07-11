import React, { useState, useRef, ChangeEvent, SyntheticEvent } from "react";
import { User, FeedObj } from "./App";
import userImage from "../image/free-icon-user-picture.png";
import { dbService } from "../fbase";

interface AppProps {
  userInfo: User;
}

const AddFeed = ({ userInfo }: AppProps) => {
  const [attachment, setAttachment] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);
  let photoUrl: string | null = userInfo.photoUrl;

  // set default user image
  if (photoUrl === null) {
    photoUrl = userImage;
  }

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
    <form onSubmit={onSubmit}>
      <img src={photoUrl} alt="user" width="30px" height="30px" />
      <span>{userInfo.displayName}</span>
      <input
        type="text"
        placeholder={`what's on your mind ${userInfo.displayName}?`}
        value={content}
        onChange={onChange}
        maxLength={240}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
      />
      <input type="submit" value="Register" />
      <button type="button" onClick={onReset}>
        Clear Photo
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default AddFeed;
