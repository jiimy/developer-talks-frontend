import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import NotPage from 'pages/NotPage';
import BoardCreate from 'pages/board/create/BoardCreate';
import BoardMain from 'pages/board/main/BoardMain';
import Mypage from 'pages/mypage/Mypage';
import Login from 'pages/login/Login';
import Main from 'pages/main/Main';
import Regist from 'pages/regist/Regist';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
import './assets/style/index.scss';
import Account from 'pages/mypage/Account';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* */}

        <Route path="/" element={<NavigateMain />}>
          <Route index element={<Main />} />
          <Route path="developer-talks-frontend" element={<Main />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<NotPage />} />
        </Route>

        <Route element={<NavigatePost />}>
          <Route path="/board/create" element={<BoardCreate />} />
          <Route path="/board/main" element={<BoardMain />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

// 헤더 포함
function NavigateMain() {
  return (
    <>
      <Header />
      <div className="page">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

// 헤더 미포함
function NavigatePost() {
  return (
    <>
      <div className="page">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
