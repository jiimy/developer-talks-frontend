import { deleteReply, postReply, putReply } from "api/board";
import Button from "components/button/Button";
import ShowUserInfo from "components/showUserInfo/ShowUserInfo";
import TextArea from "components/textarea/TextArea";
import RereplyItem from "pages/board/_com/rereplyItem/RereplyItem";
import { useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsLock } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./replyItem.module.scss";
import { NavHashLink } from "react-router-hash-link";

const ReplyItem = ({ postId, reply }) => {
  const auth = useSelector((state) => state.authToken);
  const user = useSelector((state) => state.userStore);
  const queryClient = useQueryClient();
  const [ispostToggle, setIsPostToggle] = useState(false);
  const [isgetToggle, setIsGetToggle] = useState(true);
  const [isUpdateToggle, setIsUpdateToggle] = useState(false);
  const [form, setForm] = useState({
    content: reply.content,
    secret: reply.secret,
  });
  const [reForm, setReForm] = useState({
    content: "",
    secret: false,
  });

  const [isSelf, setIsSelf] = useState(false);

  const handleSetTab = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      let val = e.target.value;
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      e.target.value = val.substring(0, start) + "\t" + val.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
      setReForm({ ...reForm, content: e.target.value });
      return false; //  prevent focus
    }
  };

  const handleReToggle = () => {
    if (auth.accessToken) {
      setReForm({ content: "", secret: false });
      setIsPostToggle((prev) => !prev);
    } else {
      toast.error("로그인 후 이용해주세요.");
    }
  };

  const handleClickReRe = () => {
    setIsGetToggle((prev) => !prev);
  };

  const postCommentMutation = useMutation((newComment) => postReply(postId, reply.id, newComment), {
    onSuccess: () => {
      setReForm({ content: "", secret: false });
      setIsPostToggle((prev) => !prev);
      queryClient.invalidateQueries(["replyList"]);
    },
  });

  const updateCommentMutation = useMutation((updatedComment) => putReply(reply.id, updatedComment), {
    onSuccess: () => {
      queryClient.invalidateQueries(["replyList"]);
      setIsUpdateToggle((prev) => !prev);
    },
  });

  const deleteCommentMutation = useMutation(() => deleteReply(reply.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["replyList"]);
      queryClient.invalidateQueries(["boardDetail"]);
      toast.success("댓글이 삭제되었습니다.");
    },
  });

  // 대댓글
  const handleRePost = (e) => {
    console.log("클릭");
    e.preventDefault();
    const newComment = {
      content: reForm.content,
      secret: reForm.secret,
    };
    postCommentMutation.mutate(newComment);
  };

  const handleRePostCancle = () => {
    setReForm({ content: "", secret: false });
    setIsPostToggle((prev) => !prev);
  };

  const handleUpdate = () => {
    setIsUpdateToggle((prev) => !prev);
    setForm({ ...form, content: reply.content });
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    const updatedComment = {
      content: form.content,
      secret: form.secret,
    };
    updateCommentMutation.mutate(updatedComment);
  };

  const handleUpdateCancle = () => {
    setForm({ content: reply.content, secret: reply.secret });
    setIsUpdateToggle((prev) => !prev);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteCommentMutation.mutate();
  };

  useEffect(() => {
    if (auth.accessToken !== null) {
      if (user.nickname === reply.userInfo.nickname) {
        setIsSelf(true);
      }
    }
  }, []);

  return (
    <>
      {(!reply.secret || (reply.secret && isSelf)) && (
        <NavHashLink
          className={s.container}
          to={`/post/${postId}/#${reply.id}`}
          smooth
          // activeStyle={{ fontWeight: "bold", color: "#ff0000" }}
        >
          <div className={s.info}>
            {reply.userInfo.userProfile !== null ? (
              <img className={s.profile} src={reply.userInfo.userProfile} alt="프로필 이미지" />
            ) : (
              <Gravatar email={reply.userInfo.nickname} className={s.profile} />
            )}
            <div>
              <ShowUserInfo userinfo={reply.userInfo} type="reply" />
              <p className={s.date}>{reply.modifiedDate}</p>
            </div>
            {reply.secret && <BsLock size={20} />}
            {isSelf && !reply.remove ? (
              <div className={s.btn_wrap}>
                <Button onClick={handleUpdate} size="small">
                  수정
                </Button>
                <Button onClick={handleDelete} size="small" theme="cancle">
                  삭제
                </Button>
              </div>
            ) : null}
          </div>
          {isUpdateToggle ? (
            <form onSubmit={handleUpdatePost}>
              <div>
                {/* <CkEditor form={form} setForm={setForm} /> */}
                <TextArea form={form} setForm={setForm} />
                <div className={s.btnRgn}>
                  <label className={s.secret}>
                    <input
                      type="checkbox"
                      name="secret"
                      checked={form.secret}
                      onChange={() => {
                        setForm({ ...form, secret: !form.secret });
                      }}
                    />{" "}
                    시크릿 댓글
                  </label>
                  <Button
                    classname={s.cancle}
                    theme="outline"
                    color="#9ca3af"
                    size="medium"
                    onClick={handleUpdateCancle}
                  >
                    취소
                  </Button>
                  <Button size="medium">수정</Button>
                </div>
              </div>
            </form>
          ) : (
            <div className={s.content} dangerouslySetInnerHTML={{ __html: reply.content }}></div>
            // <div className={s.content}>{reply.content}</div>
          )}
          <div className={s.replyBtnContainer}>
            {reply.childrenList.length ? (
              <button className={s.replyBtn} onClick={handleClickReRe}>
                {isgetToggle ? (
                  <>
                    <AiFillCaretUp className={s.icon} />
                    댓글 모두 숨기기
                  </>
                ) : (
                  <>
                    <AiFillCaretDown className={s.icon} />
                    댓글 {reply.childrenList.length}개 보기
                  </>
                )}
              </button>
            ) : (
              <div></div>
            )}
            <button onClick={handleReToggle} className={s.replyBtn}>
              댓글 쓰기
            </button>
          </div>
          <div className={s.rereplyContainer}>
            <div className={s.box}></div>
            <div className={s.container}>
              {ispostToggle && (
                <form onSubmit={handleRePost}>
                  {/* <div> */}
                  {/* <CkEditor form={reForm} setForm={setReForm} /> */}
                  <TextArea form={reForm} setForm={setReForm} />
                  <div className={s.btnRgn}>
                    <label className={s.secret}>
                      <input
                        type="checkbox"
                        name="secret"
                        onChange={() => {
                          setReForm({ ...reForm, secret: !reForm.secret });
                        }}
                      />{" "}
                      시크릿 댓글
                    </label>
                    <Button
                      classname={s.cancle}
                      theme="outline"
                      color="#9ca3af"
                      size="medium"
                      onClick={handleRePostCancle}
                    >
                      취소
                    </Button>
                    <Button size="medium" type="submit" onClick={handleRePost}>
                      등록
                    </Button>
                  </div>
                  {/* </div> */}
                </form>
              )}
              <div>
                {isgetToggle &&
                  reply.childrenList.map((rereply) => <RereplyItem key={rereply.id} rr={rereply} postId={postId} />)}
              </div>
            </div>
          </div>
        </NavHashLink>
      )}
    </>
  );
};

export default ReplyItem;
