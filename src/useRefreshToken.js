import axios from "axios";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";
import { getCookie, removeCookie } from "util/authCookie";
import epochConvert from "util/epochConverter";

export default function useRefreshToken() {
  const auth = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const refresh = async () => {
      // 토큰 재갱신
      // atk 가 없고, rtk 가 있을 때 - 최초 1회 로그인 후 로그아웃 안했을 때
      if (auth.accessToken === null && getCookie("dtrtk") !== undefined) {
        // atrk 가 없고, rtk가 있지만 rtk의 만료시간이 현재 시간보다 이전일때
        // console.log("현재날짜가 만료시간보다 이전임 : ", epochConvert(parseJwt(getCookie("dtrtk").exp)));

        // console.log("소셜로그인이 아닐때");
        // NOTE: 일반로그인이고 토큰이 만료됬을때
        if (epochConvert(parseJwt(getCookie("dtrtk").exp))) {
          showToast("error", "회원 정보가 만료되었습니다.");
          removeCookie("dtrtk", { path: "/" });
        }
        await axios
          .post(`${ROOT_API}/token/refresh`, {
            refreshToken: getCookie("dtrtk"),
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          })
          .then(function (response) {
            // console.log("재갱신 성공:", response);
            dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
            // setLoading(false); // app.js 의 '타이머로 재갱신 테스트 코드' 와 연결
          })
          .catch(function (error) {
            console.log("재갱신 실패: ", error.response.data);
            if (error.response.data.status === 400) {
              removeCookie("dtrtk", { path: "/" });
            }
          });
      }

      // NOTE: 소셜 로그인일때
      if (localStorage.getItem("authAtk")) {
        console.log("소셜로그인일때");
        axios
          .post(`${ROOT_API}/token/refresh`, {
            refreshToken: localStorage.getItem("authAtk"),
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          })
          .then(function (response) {
            // console.log("재갱신 성공:", response);
            dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
            // setLoading(false); // app.js 의 '타이머로 재갱신 테스트 코드' 와 연결
          })
          .catch(function (error) {
            console.log("재갱신 실패: ", error.response.data);
          });
      }
    };
    refresh();
  }, [auth.accessToken, dispatch, location]);
}

// export default useRefreshToken;
