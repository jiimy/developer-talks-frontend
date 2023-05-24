import { Link } from 'react-router-dom';
import loginuser from './loginuser.jpg';
// import user from './user.jpg';
import axios from 'axios';
import Logout from 'components/logout/Logout';
import { ROOT_API } from 'constants/api';
import { parseJwt } from 'hooks/useParseJwt';
import { useSelector } from 'react-redux';
import './Left.scss';
import { useState } from 'react';

const Left = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    axios
      .post(
        `${ROOT_API}/users/profile/image`,
        {
          id: 0,
          name: 'string',
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'X-AUTH-TOKEN': auth.accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  // 'file=@logo192.png;type=image/png'
  const auth = useSelector((state) => state.authToken).accessToken;
  const userinfo = parseJwt(auth);
  const line = '내 소개';
  // const [file,setFile]=useState();

  return (
    <>
      <section className="side">
        <img src={loginuser} alt="" />
        <p>{userinfo.nickname} 님 </p>
        {/* <p>{line}</p> */}

        <button onClick={handleSubmit}>파일업로드</button>
        <ul>
          <li>
            <Link to="/introduction">{line}</Link>
          </li>
          <li>
            <Link to="/mypage">활동내역</Link>
          </li>
          <li>
            <Link to="/account">회원정보수정 및 탈퇴</Link>
          </li>
        </ul>
        <Logout />
      </section>
    </>
  );
};

export default Left;
