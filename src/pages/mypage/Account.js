import axios from "axios";
import Button from "components/button/Button";
import Form from "components/form/Form";
import Label from "components/label/Label";
import LineStyle from "components/lineStyle/LineStyle";
import Table from "components/table/Table";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MypageContent from "./MyPageContent";
import s from "./mypagecontent.module.scss";
import account from "./account.module.scss";

function Account() {
  const auth = useSelector((state) => state.authToken);
  const [selectedImage, setSelectedImage] = useState(null);

  const [imageFile, setImageFile] = useState("");
  const [selectedTags, setSelectedTags] = useState({
    tags: [],
    authJoin: true,
    joinableCount: 1,
  });
  const handleChangeProfileImage = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImageFile(imageUrl);
    showToast("success", "😎 이미지가 업로드 되었습니다");
  };
  const clickTag = (tag) => {
    //NOTE 기술 테그
    if (selectedTags.tags.includes(tag)) {
      setSelectedTags({
        ...selectedTags,
        tags: selectedTags.tags.filter((selectedTag) => selectedTag !== tag),
      });
    } else {
      setSelectedTags({
        ...selectedTags,
        tags: [...selectedTags.tags, tag],
      });
    }
  };
  const tags = ["DJANGO", "SPRING", "JAVASCRIPT", "JAVA", "PYTHON", "CPP", "REACT", "AWS"];

  const tabTitle = ["회원정보 수정", "회원 탈퇴"];
  const [select, setSelect] = useState(0);
  const onSelect = (type) => {
    setSelect(type);
  };

  const [userData, setUserData] = useState(""); //유저데이터 가져오기
  useEffect(() => {
    axios
      .get(`${ROOT_API}/users/profile/image`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(function (response) {
        setImageFile(response.data.url);
      });
    axios
      .get(`${ROOT_API}/users/info`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(({ data }) => {
        console.log("cc정보 성공:", data);
        setUserData(data);
        setSelectedTags({ ...selectedTags, tags: data.skills });
      });
  }, [auth.accessToken]);

  const reset = () => {
    //TODO 리셋
    setUserData("");
  };

  const userEdit = (e) => {
    //NOTE 수정
    e.preventDefault();
    console.log(`
    아이디: ${userData.description}
      닉네임: ${userData.nickname}
      이메일: ${userData.email}
      아이디: ${userData.userid}
      비밀번호: ${userData.password}   
    `);
  };

  const handleChange = (e) => {
    console.log(userData.description);
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const saveUser = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
  };

  return (
    <MypageContent>
      <section className={s.contentWrap}>
        <ul className={s.nav}>
          {tabTitle.map((item, index) => (
            <li key={index}>
              <button onClick={() => onSelect(index)} className={`${select === index ? `${s.select}` : ""}`}>
                {item}
              </button>
            </li>
          ))}
        </ul>
        {select === 0 && (
          <Form onSubmit={userEdit}>
            <div className={account.profile}>
              <div className={account.imgwrap}>
                {imageFile && <img src={imageFile} alt="프로필이미지" />}
                <input
                  accept="image/*"
                  type="file"
                  name="프로필이미지"
                  onChange={handleChangeProfileImage}
                  id="profile"
                />
              </div>
            </div>
            <span>프로필 이미지 선택☝️</span>
            <br />
            <label>한 줄 내소개</label>
            <div className={account.description}>
              <input
                type="description"
                id="description"
                name="description"
                value={userData.description}
                placeholder="내 소개를 자유롭게 해보세요 80자까지 가능합니다."
                maxLength={80}
                onChange={handleChange}
              />
            </div>
            <label>관심있는 태그입력</label>
            <div className={account.tagalign}>
              <div className={account.tags}>
                {tags.map((item, index) => (
                  <span
                    key={index}
                    onClick={() => clickTag(item)}
                    className={`tag ${selectedTags.tags.includes(item) ? [s.is_select] : ""}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <LineStyle gray text={" 기본정보를 입력해주세요"} />
            <Table tableTitle={"Developer-Talks 계정 만들기"} tableText={"*필수사항 입니다."}>
              {[
                <div>
                  <Label isRequire htmlFor="nickname">
                    닉네임
                  </Label>
                  <input id="nickname" name="nickname" value={userData.nickname} onChange={handleChange} type="text" />
                  <Button>중복확인</Button>
                </div>,
                <div>
                  <Label isRequire htmlFor="userEmail">
                    이메일
                  </Label>
                  <input id="userEmail" name="email" value={userData.email} onChange={handleChange} type="text" />
                </div>,
                <div>
                  <Label isRequire htmlFor="userid">
                    아이디
                  </Label>
                  <input id="userid" name="userid" value={userData.userid} onChange={handleChange} type="text" />
                </div>,
                <div>
                  <Label isRequire htmlFor="password">
                    비밀번호
                  </Label>
                  <input
                    id="password"
                    name="password"
                    autoComplete="password"
                    value={userData.password}
                    onChange={handleChange}
                    type="password"
                  />
                </div>,
                <div>
                  <Label isRequire htmlFor="passwordChk">
                    비밀번호 확인
                  </Label>
                  <input
                    id="passwordChk"
                    name="password"
                    autoComplete="password"
                    value={userData.password}
                    onChange={handleChange}
                    type="password"
                  />
                  {/* <div className={account.typechange} type="typechange" onClick={typechange}> */}
                  {/* 👀 */}
                  {/* </div> */}
                </div>,
              ]}
            </Table>
            <Button FullWidth size="large" onClick={saveUser}>
              저장
            </Button>
            <br />
            <Button FullWidth size="large" onClick={reset}>
              리셋
            </Button>
          </Form>
        )}
        {select === 1 && (
          <form className={account.delete}>
            <div className={s.deletgaider}>
              회원 탈퇴일로부터 계정과 닉네임을 포함한 계정 정보(아이디/이메일/닉네임)는 개인정보 보호방침에 따라 60일간
              보관(잠김)되며, 60일 경과된 후에는 모든 개인 정보는 완전히 삭제되며 더 이상 복구할 수 없게 됩니다. 작성된
              게시물은 삭제되지 않으며, 익명처리 후 디톡스로 소유권이 귀속됩니다.
            </div>
            <input type="checkbox" />
            <label>계정 삭제에 관한 정책을 읽고 이에 동의합니다</label>
            <br />
            <Button>회원탈퇴 버튼</Button>
          </form>
        )}
      </section>
    </MypageContent>
  );
}

export default Account;
