import axios from "axios";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import { ROOT_API } from "constants/api";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import s from "./boardPost.module.scss";
import { postBoard } from "api/board";

export default function BoardPost({ type }) {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [form, setForm] = useState({
    title: "",
    content: "",
    files: [],
    imgUrls: [],
  });
  const [getType, setGetType] = useState();

  useEffect(() => {
    switch (type) {
      case "post":
        setGetType("post");
        break;
      case "questions":
        setGetType("qna");
        break;
      default:
        setGetType("");
    }
  }, [type]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title.trim() === "") {
      toast.error("제목을 입력해주세요.");
      return;
    }
    if (form.content.trim() === "") {
      toast.error("내용을 입력해주세요.");
      return;
    }
    await new Promise((r) => setTimeout(r, 1000));

    const fieldsToAppend = {
      title: form.title,
      content: form.content,
    };

    const frm = new FormData();
    if (form.files.length !== 0) {
      form.files.forEach((file) => {
        frm.append("files", file);
      });
    }

    for (const field in fieldsToAppend) {
      console.log("form :", field, fieldsToAppend);
      frm.append(field, fieldsToAppend[field]);
    }

    const res = postBoard(type, frm);
    res
      .then(() => {
        navigate(`/${getType}`);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={s.container}>
          <input
            className={s.title}
            type="text"
            name="title"
            value={form.title}
            placeholder="제목을 작성해주세요."
            onChange={handleChange}
            ref={inputRef}
          />
          <div className={s.editor}>
            {/* TODO: CKEditor 이텔릭체 안먹힘 등의 이슈 해결하기 */}
            <CkEditor form={form} setForm={setForm} placeholder={"내용을 입력해주세요."} />
          </div>
          <div className={s.btnRgn}>
            <Link to="/post" className={s.cancel}>
              취소
            </Link>
            <Button>저장</Button>
          </div>
        </div>
      </form>
    </>
  );
}
