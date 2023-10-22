import React from "react";
import { BiSearch } from "react-icons/bi";
import s from "./searchInput.module.scss";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const SearchInput = ({ type, placeholder = "글 제목, 글 내용 검색" }) => {
  // console.log("type", type);
  // const t = type === "post" ? "board" : "qna";
  const [getType, setGetType] = useState("");
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");

  useEffect(() => {
    if (type === "post") {
      setGetType("post");
    } else if (type === "questions") {
      setGetType("questions");
    } else if (type === "studyroom") {
      setGetType("studyroom");
    }
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      navigate(`/${getType}`);
    } else {
      navigate(`/${getType}/search/${text}`);
    }
  };
  useEffect(() => setText(keyword || ""), [keyword]);
  return (
    <form className={s.search} onSubmit={handleSubmit}>
      <input type="text" placeholder={placeholder} value={text} onChange={(e) => setText(e.target.value)} />
      <button>
        <BiSearch size={24} />
      </button>
    </form>
  );
};

export default SearchInput;
