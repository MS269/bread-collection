import { useState } from "react";
import PageTitle from "../components/PageTitle";

const PASSWORD: string = process.env.REACT_APP_ADMIN_PASSWORD;

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const login = () => {
    if (newPassword === PASSWORD) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div>
      <PageTitle title={"관리자"} />
      <h1>Admin</h1>
      {isLoggedIn ? (
        "Logged In"
      ) : (
        <form>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <button onClick={login}>로그인</button>
        </form>
      )}
    </div>
  );
}
