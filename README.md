# developer-talks v1.0
> **프론트 3명, 백엔드 3명** <br/> **개발기간: 2023.04.19 ~ 2023.09.19**

## 배포 주소

> **개발 버전** : [https://developer-talks.com/](https://developer-talks.com/) <br>

<br>
aws 의 s3, github action을 이용한 ci/cd 를 사용중입니다. <br>
fcm등의 기능으로 https 처리가 필요하여 cloudfront도 사용되었습니다.

## 프론트 구성원

|      이경주       |          유희선         |       김시연         |
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | 
|   <img width="160px" src="https://avatars.githubusercontent.com/u/24261724?v=4" />    |                      <img width="160px" src="https://avatars.githubusercontent.com/u/84820008?v=4" />    |                   <img width="160px" src="https://avatars.githubusercontent.com/u/122216298?v=4"/>   |
|   [@jiimy](https://github.com/jiimy)   |    [@hsgh085](https://github.com/hsgh085)  | [@rlatldus](https://github.com/rlatldus)  |


## 프로젝트 소개

developer-talks는 okky.kr 와 비슷한 성격의 개발자 커뮤니티 입니다. <br/>
기본적으로 게시판 crud, 구글 로그인과 jwt을 이용한 토큰 관리, react-hook-form을 이용한 사용자 정보 컨트롤을 가지고 있고, <br/>
소켓, see, fcm등의 lib가 사용되었습니다.

## 시작 가이드
### 작업환경

- [Node.js 18.14.2](https://nodejs.org/ca/blog/release/v18.14.2/)
- [Npm 9.5.0](https://www.npmjs.com/package/npm/v/9.5.0)

### 설치
``` bash
$ git clone https://github.com/team-web-development-projects/developer-talks-frontend.git
$ cd developer-talks-frontend
$ npm install 
$ npm run start
```

---

## Stacks 🐈

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)             


### Development
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### state management 
![redux](https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![reactquery](https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)

### Communication
![Discord](https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)


---
## 화면 구성 📺

| 메인 페이지  |  게시글 목록   |
| :-------------------------------------------: | :------------: |
|  <img width="329" src="https://i.postimg.cc/rmRD7hMm/image.jpg"/> |  <img width="329" src="https://i.postimg.cc/W43FwNy0/image.jpg"/>|  
| **스터디룸**  |  **마이페이지** |  
| <img width="329" src="https://i.postimg.cc/gj9xpv2K/image.jpg"/>   |  <img width="329" src="https://i.postimg.cc/BvV8YWWk/image.jpg"/>     |

---
그 외 게시글 상세, 게시글 작성, 스터디룸 상세, 유저 관련 페이지등 총 9 페이지

## 유저 관점에서의 기능

### 게시글 
- 사용자는 게시글을 생성, 삭제, 수정, 목록을 볼 수 있습니다.
- 사용자는 Q&A와 커뮤니티의 2가지 타입의 게시글을 작성 할 수 있습니다. 
- 생성시 이미지를 첨부할 수 있으며, 수정시에도 이미지를 수정할 수 있습니다. 
- 삭제시 답변이 있는 게시글은 삭제할 수 없습니다.
- Q&A 작성시 답변 중 하나의 댓글을 답변으로 채택할 수 있습니다. 한번 채택된 답변은 다른 답변으로 채택할 수 없습니다. 
- 작성된 게시글에서 추천수, 북마크 수를 확인할 수 있습니다. 
- 게시글 목록에서 제목, 내용으로 게시글을 검색할 수 있습니다.
<br>
### 스터디룸
- 사용자는 스터디룸을 생성, 삭제, 수정, 목록을 볼 수 있습니다.
- 생성시 관련 태그, 최대 방참여 인원수, 비밀방 여부를 설정할 수 있습니다. 모든 설정값은 필수값이 아닙니다.
- 스터디룸에 참여시 내부에서 게시글을 생성, 삭제, 수정, 목록을 볼 수 있습니다.
- 스터디룸에 참여시 채팅 기능을 이용할 수 있습니다.
- 채팅 내부에서 위로 스크롤시 이전 데이터를 불러 올 수 있습니다.
- 스터디룸 삭제시 본인을 제외한 참여인원이 있으면 삭제가 불가능합니다.
- (로그인 상태) 마이페이지에서 스터디원을 추방하거나, 권한을 변경할 수 있습니다.
<br>
### 유저정보
- 사용자는 일반회원가입, 구글회원가입을 통하여 로그인을 할 수 있습니다. 
- 한번 로그인이 되어있다면 1주일이내 다시 접속시 자동 로그인이 됩니다. 
- (로그인 상태) 다른 사람의 게시글을 추천할 수 있으며, 북마크 처리할 수 있습니다. 북마크된 게시글은 마이페이지에서 볼 수 있습니다. 
- (로그인 상태) 스터디룸의 목록을 볼수 있으며, 비밀방이 아닌 스터디룸은 바로 입장가능하고, 비밀방이라며 참여요청을 보냅니다. 
- (로그인 상태) 참여요청을 보낸 스터디룸과 참여중인 스터디룸은 마이페이지에서 확인할 수 있습니다.
- (로그인 상태) 다른 유저의 닉네임을 클릭하여 쪽지를 보낼 수 있습니다. 
- (로그인 상태) 마이페이지에서 보낸 쪽지, 받은 쪽지를 볼 수 있습니다. 
- (로그인 상태) 작성한 게시글에 댓글이 달리는 등. 특정 이벤트가 반응될시 자신에게 알람이 옵니다.
<br><br>


## 주요 기능

### 로그인, 회원가입
- jwt을 사용하여 refreshToken은 localStorage에서 관리. accessToken은 redux-toolkit을 이용한 클라이언트에서 관리.
- oauth를 이용하여 구글 로그인 기능.
<br/>

### 게시글
- ckeditor를 활용한 crud 기능
- 작성시 이미지 첨부 가능
- 대댓글 기능
<br/>

### 스터디룸
- 스터디룸 입장시 소켓통신을 이용한 채팅 기능
##### 아쉬운 점
- 이전 데이터를 가져올시 페이징 처리가 아닌 다른 처리가 있지 않을까

<br/>

### 알림, 쪽지
- sse처리로 시작하였으나 console에 주기적으로 나오는 알림이 있어 fcm으로 변경.
##### 아쉬운 점
- sse의 기능 구현은 잘됬으나 console에서 주기적으로 오는 에러를 해결 못함

<br/>

### 사용자 정보 컨트롤
- 로그인, 회원가입, 유저정보찾기, 유저정보수정등 여러개의 input이벤트가 포함된곳에 react-hook-form을 이용한 validate를 사용.
##### 아쉬운 점
- react-hook-form의 validation 관리를 yup으로 하면 컴포넌트 분할이 되지 않았을까.


---
## 아키텍쳐

### 디렉토리 구조
```bash
├── README.md
├── package-lock.json
├── package.json
├── jsconfig.json
├── .env
├── .env.development
├── .env.production
├── public
│   ├── 404.html
│   ├── firebase-messaging-sw.js
│   ├── index.html
│   └── favicon.ico
└── src
    ├── assets
    │   ├── font.scss
    │   ├── function.scss
    │   ├── index.scss
    │   ├── reset.scss
    │   ├── variable.scss
    │   └── common.scss
    ├── components
    │   └── ...// button이나 editor처럼 작은것부터 시작하여 modal까지 약 30개 정도의 컴포넌트가 있습니다.
    ├── constants
    │   └── api.js // 루트 도메인 기본 정의
    ├── hooks
    │   ├── useOutOfClick.js
    │   ├── useParseJwt.js // accessToken을 디코딩하여 유저 데이터 추출
    │   └── useAuth.js
    ├── pages
    │   └──  ...   // 잘못된 url로 접속했을때 NotPage를 포함하여 약 8개의 페이지가 있습니다.
    ├── store
    │   ├── Auth.js // jwt 토큰 저장
    │   ├── ChatStore.js // 채팅 입력시 데이터 임시 저장
    │   ├── index.js 
    │   ├── Notification.js // 알림, 쪽지 관련 데이터 저장
    │   └── PageRouter.js // url 판별 데이터 임시 저장
    ├── util
    │   ├── day.js // dayjs를 이용한 날짜 포맷
    │   ├── epochConverter.js // 날짜 비교
    │   ├── IsLogin.js 
    │   └── Util.js // isDev와 isPrd로 dev 와 prd환경 정의
    ├── App.js
    ├── firebase-get-token.js
    ├── sse.js
    ├── useGoogleLoginAuth.js
    ├── useRefreshToken.js
    └── index.js

```

