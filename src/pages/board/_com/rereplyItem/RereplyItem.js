import { deleteRereply, postRereply, putRereply } from "api/board";
import Button from "components/button/Button";
import ShowUserInfo from "components/showUserInfo/ShowUserInfo";
import TextArea from "components/textarea/TextArea";
import { useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import { BsLock } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import s from "./rereplyItem.module.scss";

const RereplyItem = ({ rr, postId }) => {
  const auth = useSelector((state) => state.authToken);
  const user = useSelector((state) => state.userStore);
  const queryClient = useQueryClient();
  const [isSelf, setIsSelf] = useState(false);
  const [isUpdateToggle, setIsUpdateToggle] = useState(false);
  const [isPostToggle, setIsPostToggle] = useState(false);
  const [form, setForm] = useState({
    content: rr.content,
    secret: rr.secret,
  });
  const [reForm, setReForm] = useState({
    content: "",
    secret: false,
  });

  const updateCommentMutation = useMutation((updatedComment) => putRereply(rr.id, updatedComment), {
    onSuccess: () => {
      queryClient.invalidateQueries(["replyList"]);
      setIsUpdateToggle(false);
    },
  });

  const deleteCommentMutation = useMutation(() => deleteRereply(rr.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["replyList"]);
      toast.success("댓글이 삭제되었습니다.");
    },
  });

  const postCommentMutation = useMutation((newComment) => postRereply(postId, rr.id, newComment), {
    onSuccess: () => {
      setReForm({ content: "", secret: false });
      setIsPostToggle(false);
      queryClient.invalidateQueries(["replyList"]);
    },
  });

  const handleUpdateClick = () => {
    setIsUpdateToggle(true);
    setIsPostToggle(false);
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
    setForm({ content: rr.content, secret: rr.secret });
    setIsUpdateToggle(false);
    setIsPostToggle(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteCommentMutation.mutate();
  };
  const handlePostClick = () => {
    if (auth.accessToken) {
      setIsPostToggle(true);
    } else {
      toast.error("로그인 후 이용해주세요.");
    }
  };
  const handlePost = (e) => {
    e.preventDefault();
    const newComment = {
      content: reForm.content,
      secret: reForm.secret,
    };
    postCommentMutation.mutate(newComment);
  };

  const handlePostCancle = () => {
    setReForm({ content: "", secret: false });
    setIsPostToggle(false);
  };

  useEffect(() => {
    if (auth.accessToken !== null) {
      if (user.nickname === rr.userInfo.nickname) {
        setIsSelf(true);
      }
    }
  }, []);

  return (
    <>
      {(!rr.secret || (rr.secret && isSelf)) && (
        <div className={s.container} id={`${rr.id}`} name={`${rr.id}`}>
          <div className={s.info}>
            {rr.userInfo.userProfile !== null ? (
              <img className={s.profile} src={rr.userInfo.userProfile} alt="프로필 이미지" />
            ) : (
              <Gravatar email={rr.userInfo.nickname} className={s.profile} />
            )}
            <div>
              <ShowUserInfo userinfo={rr.userInfo} type="reply" />
              <p className={s.date}>{rr.modifiedDate}</p>
            </div>
            {rr.secret && <BsLock size={20} />}
            {isSelf && !rr.remove ? (
              <div className={s.btn_wrap}>
                <Button onClick={handleUpdateClick} size="small">
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
                  <Button size="medium" onClick={handleUpdatePost}>
                    수정
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <>
              <div className={s.tagContentName}>@{rr.parentNickname}</div>
              <div
                className={s.content}
                dangerouslySetInnerHTML={{ __html: rr.content }}
                onClick={handlePostClick}
              ></div>
            </>
          )}

          {isPostToggle && !isUpdateToggle && (
            <form onSubmit={handlePost}>
              <div className={s.postConatiner}>
                <div className={s.tagName}>@{rr.userInfo.nickname}</div>
                <TextArea form={reForm} setForm={setReForm} />
                <div className={s.btnRgn}>
                  <label className={s.secret}>
                    <input
                      type="checkbox"
                      name="secret"
                      checked={reForm.secret}
                      onChange={() => {
                        setForm({ ...reForm, secret: !reForm.secret });
                      }}
                    />{" "}
                    시크릿 댓글
                  </label>
                  <Button classname={s.cancle} theme="outline" color="#9ca3af" size="medium" onClick={handlePostCancle}>
                    취소
                  </Button>
                  <Button size="medium">등록</Button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default RereplyItem;
