import axios from "axios";
import Button from "components/button/Button";
import Form from "components/form/Form";
import FormUserGuide from "components/form/FormUserGuide";
import Label from "components/label/Label";
import LineStyle from "components/lineStyle/LineStyle";
import { LoginGoogle, LoginKakao, LoginNaver, Snslogin } from "components/snsLogin/Snslogin";
import Table from "components/table/Table";
import { showToast } from "components/toast/showToast";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";
import s from "./login.module.scss";
import { getUserInfoApi, login } from "api/auth";
import { setCookie } from "util/authCookie";
import { SET_USER_INFO } from "store/User";

import { useSelector } from "react-redux";
import { API_HEADER, ROOT_API } from "constants/api";
const Login = () => {
  const auth = useSelector((state) => state.authToken);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [typetoggle, setTypetoggle] = useState("password");

  const onSubmit = (data) => {
    // await new Promise((r) => setTimeout(r, 1000));
    // setFormData(data);
    const res = login(data);
    res
      .then((res) => {
        // console.log("로그인 성공:", res);
        // setRefreshToken({ refreshToken: response.data.refreshToken });
        const today = new Date(); //추가
        today.setDate(today.getDate() + 7);

        setCookie("dtrtk", res.refreshToken, {
          path: "/",
          secure: "/",
          expires: today,
        });
        dispatch(SET_TOKEN({ accessToken: res.accessToken }));
        const ress = getUserInfoApi();
        ress.then((data) => {
          dispatch(SET_USER_INFO({ nickname: data.nickname, userid: data.userid }));
        });
        // NOTE: SSE를 위한 코드
        // axios
        //   .get(`${ROOT_API}/notifications/subscribe`, {
        //     headers: {
        //       "Content-Type": "text/event-stream",
        //       Connection: "keep-alive",
        //       "Cache-Control": "no-cache",
        //     },
        //   })
        //   .then((res) => console.log("test: ", res));
        navigate("/");
        reset();
        axios
          .post(
            `${ROOT_API}/visitors/increase`,
            {},
            {
              headers: {
                "X-AUTH-TOKEN": auth.accessToken,
              },
            }
          )
          .catch(function (increaseError) {
            console.error("Failed to increase visitors:", increaseError);
          });
      })
      .catch((error) => {
        console.log("ee", error);
        showToast("error", "회원 정보를 다시한번 확인해주세요");
      });
  };

  const typechange = () => {
    //NOTE 비밀번호 토글//ok
    setTypetoggle("text");

    setTimeout(() => {
      setTypetoggle("password");
    }, 1000);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>로그인페이지</legend>
          <h2>
            Developer-Talks 가입으로
            <br /> 다양한 사람들을 만나보세요!
          </h2>
          <Table tableTitle={"Developer-Talks"} tableText={"계정로그인"}>
            <div>
              <div>
                <Label htmlFor="userId">아이디</Label>
                <input
                  type="text"
                  id="userId"
                  name="usderId"
                  placeholder="Developer-Talk Guest"
                  tabIndex="1"
                  maxLength="15"
                  autoComplete="useId"
                  aria-invalid={!isDirty ? undefined : errors.userId ? "true" : "false"}
                  {...register("userId", {
                    required: "아이디는 필수 입력입니다.",
                    minLength: {
                      value: 5,
                      message: "5자리 이상 15자리 이하로 입력해주세요.",
                    },
                  })}
                />
              </div>
              {errors.userId && <small role="alert">{errors.userId.message}</small>}
            </div>
            <div>
              <div>
                <Label htmlFor="password">비밀번호</Label>
                <input
                  type={typetoggle}
                  id="password"
                  placeholder="********"
                  tabIndex="2"
                  maxLength="15"
                  name="password"
                  autoComplete="current-password"
                  aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
                  {...register("password", {
                    required: "비밀번호는 필수 입력입니다.",
                    minLength: {
                      value: 8,
                      message: "8자리 이상 15자리 이하로 비밀번호를 사용해주세요.",
                    },
                  })}
                />
                <span className={s.typechange} type="typechange" onClick={typechange}>
                  👀
                </span>
              </div>
              {errors.password && <small role="alert">{errors.password.message}</small>}
            </div>
          </Table>
          <Button FullWidth size="large" type="submit" tabIndex="3" disabled={isSubmitting}>
            {" "}
            로그인
          </Button>
        </fieldset>
        <br />
        <LineStyle>SNS 로그인</LineStyle>
        <Snslogin>
          <LoginGoogle />
          {/* <LoginNaver /> */}
          {/* <LoginKakao /> */}
        </Snslogin>
      </Form>
      <FormUserGuide />
    </>
  );
};

export default Login;
