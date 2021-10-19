import { addDoc, collection } from "@firebase/firestore";
import { useState } from "react";
import PageTitle from "../components/PageTitle";
import { db } from "../firebase";

const PASSWORD: string = process.env.REACT_APP_ADMIN_PASSWORD;

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newName, setNewName] = useState("");
  const [newArea, setNewArea] = useState("");
  const [newVistDays, setNewVisitDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
  });
  const [newCheckVisit, setNewCheckVisit] = useState(false);
  const [newEtc, setNewEtc] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const addBakery = () => {
    addDoc(collection(db, "bakeries"), {
      name: newName,
      area: newArea,
      checkVisit: newCheckVisit,
      visitDays: {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
        sun: true,
      },
      needVisit: false,
      needCert: false,
      visited: false,
    });
    setNewName("");
    setNewArea("");
    setNewVisitDays({
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: true,
      sun: true,
    });
    setNewCheckVisit(false);
  };

  const login = () => {
    if (newPassword === PASSWORD) {
      setIsLoggedIn(true);
    }
  };

  return (
    <main>
      <PageTitle title={"관리자"} />
      <h1>Admin</h1>
      {isLoggedIn ? (
        <div>
          <h3>빵집 추가</h3>
          <div>
            <input
              type="text"
              placeholder="이름"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="위치"
              value={newArea}
              onChange={(event) => setNewArea(event.target.value)}
              required
            />
            <div>
              <input
                type="checkbox"
                id="checkVisit"
                checked={newCheckVisit}
                onChange={() => setNewCheckVisit(!newCheckVisit)}
              />
              <label htmlFor="checkVisit">방문확인필요</label>
            </div>
            <fieldset>
              <legend>수거요일</legend>
              <div>
                <input
                  type="checkbox"
                  id="mon"
                  checked={newVistDays.mon}
                  onChange={() =>
                    setNewVisitDays({ ...newVistDays, mon: !newVistDays.mon })
                  }
                />
                <label htmlFor="mon">월요일</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="tue"
                  checked={newVistDays.tue}
                  onChange={() =>
                    setNewVisitDays({ ...newVistDays, tue: !newVistDays.tue })
                  }
                />
                <label htmlFor="tue">화요일</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="wed"
                  checked={newVistDays.wed}
                  onChange={() =>
                    setNewVisitDays({ ...newVistDays, wed: !newVistDays.wed })
                  }
                />
                <label htmlFor="wed">수요일</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="thu"
                  checked={newVistDays.thu}
                  onChange={() =>
                    setNewVisitDays({ ...newVistDays, thu: !newVistDays.thu })
                  }
                />
                <label htmlFor="thu">목요일</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="fri"
                  checked={newVistDays.fri}
                  onChange={() =>
                    setNewVisitDays({ ...newVistDays, fri: !newVistDays.fri })
                  }
                />
                <label htmlFor="fri">금요일</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="sat"
                  checked={newVistDays.sat}
                  onChange={() =>
                    setNewVisitDays({ ...newVistDays, sat: !newVistDays.sat })
                  }
                />
                <label htmlFor="sat">토요일</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="sun"
                  checked={newVistDays.sun}
                  onChange={() =>
                    setNewVisitDays({ ...newVistDays, sun: !newVistDays.sun })
                  }
                />
                <label htmlFor="sun">일요일</label>
              </div>
            </fieldset>
            <input
              type="text"
              placeholder="추가사항"
              value={newEtc}
              onChange={(event) => setNewEtc(event.target.value)}
            />
            <button onClick={addBakery}>추가</button>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <button onClick={login}>로그인</button>
        </div>
      )}
    </main>
  );
}
