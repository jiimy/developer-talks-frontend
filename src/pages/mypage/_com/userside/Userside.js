import Logout from "components/logout/Logout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./Userside.scss";
// import ProfileImg from "components/profileImg/ProfileImg";
import classNames from "classnames";
import ProfileImg from "components/profileImg/ProfileImg";
import MypageContent from "pages/mypage/MyPageContent";
import Account from "../account/Account";
import MyMessage from "../mymessage/MyMessage";
import MyStudyRoom from "../mystudyroom/MyStudyRoom";
import UserInfoList from "../userInfoList/UserInfoList";

const Userside = () => {
  const nickname = useSelector((state) => state.userStore.nickname);
  const [isactive, setisactive] = useState("mypage");
  const [viewSide, setViewSide] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const [profileImgData, setProfileImgData] = useState({
  //   id: "",
  //   url: "",
  //   inputName: "",
  // });
  const handleClick = (value) => {
    setisactive(value);
  };

  useEffect(() => {
    // console.log("userSide: ", location.state);
    if (location.state && location.state.nickname !== null) {
      if (location.state && location.state.nickname === nickname) {
        setViewSide(true);
      } else {
        setViewSide(false);
      }
    }
    //
    if (location.state && location.state.nickname == null) {
      console.log("없음");
      setViewSide(true);
    }
  }, [nickname, location.state]);

  // console.log("temp", location.state && location.state.nickname);

  return (
    <MypageContent>
      {
        // 게시글을 통해 들어온 닉네임과 내 닉네임이 같을때
        (location.state === nickname ||
          // 게시글을 통해 들어오지 않을때
          location.state === null ||
          viewSide) && (
          <section className="side">
            <div className="imgwrap">
              <ProfileImg size="big" />
            </div>
            <ul className="nav">
              <li
                className={classNames("", { "is-active": isactive === "mypage" })}
                onClick={() => {
                  handleClick("mypage");
                  navigate("/user/activity");
                }}
              >
                활동내역
              </li>
              <li
                className={classNames("", { "is-active": isactive === "my-studyroom" })}
                onClick={() => {
                  handleClick("my-studyroom");
                  navigate("/user/my-studyrooms");
                }}
              >
                스터디룸
              </li>
              <li
                className={classNames("", { "is-active": isactive === "my-message" })}
                onClick={() => {
                  handleClick("my-message");
                  navigate("/user/my-message");
                }}
              >
                쪽지
              </li>
              <li
                className={classNames("", { "is-active": isactive === "account" })}
                onClick={() => {
                  handleClick("account");
                  navigate("/user/account");
                }}
              >
                회원정보수정 및 탈퇴
              </li>
            </ul>
            <Logout />
          </section>
        )
      }
      <>{isactive === "mypage" && <UserInfoList user={location.state} />}</>
      <>{isactive === "my-studyroom" && <MyStudyRoom />}</>
      <>{isactive === "my-message" && <MyMessage />}</>
      <>{isactive === "account" && <Account />}</>
    </MypageContent>
  );
};

export default Userside;
