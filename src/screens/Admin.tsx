import { addDoc, collection } from "@firebase/firestore";
import { useState } from "react";
import PageTitle from "../components/PageTitle";
import { db } from "../firebase";

const PASSWORD: string = process.env.REACT_APP_ADMIN_PASSWORD;

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newName, setNewName] = useState("");
  const [newArea, setNewArea] = useState("");
  const [newVisitDays, setNewVisitDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
  });
  const [newCheckVisit, setNewCheckVisit] = useState(false);
  const [newEtc, setNewEtc] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const addBakery = () => {
    if (newName === "" || newArea === "") {
      return;
    }
    addDoc(collection(db, "bakeries"), {
      name: newName,
      area: newArea,
      checkVisit: newCheckVisit,
      visitDays: newVisitDays,
      visitOrder: 0,
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
    });
    setNewCheckVisit(false);
  };

  const login = () => {
    if (newPassword === "") {
      return;
    }
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
            />
            <select
              value={newArea}
              onChange={(event) => setNewArea(event.target.value)}
            >
              <option value="">-- 위치 --</option>
              <option value="걸포동">- 걸포동 -</option>
              <option value="saudong">- 사우동 -</option>
              <option value="pungmudong">- 풍무동 -</option>
              <option value="gochoneup">- 고촌읍 -</option>
              <option value="unyangdong">- 운양동 -</option>
              <option value="janggidong">- 장기동 -</option>
              <option value="masandong">- 마산동 -</option>
              <option value="guraedong">- 구래동 -</option>
            </select>
            <div>
              <input
                type="checkbox"
                id="checkVisit"
                checked={newCheckVisit}
                onChange={() => {
                  setNewCheckVisit(!newCheckVisit);
                  setNewVisitDays({
                    mon: false,
                    tue: false,
                    wed: false,
                    thu: false,
                    fri: false,
                  });
                }}
              />
              <label htmlFor="checkVisit">방문확인필요</label>
            </div>
            <fieldset disabled={!newCheckVisit}>
              <legend>수거요일</legend>
              <div>
                <input
                  type="checkbox"
                  id="mon"
                  checked={newVisitDays.mon}
                  onChange={() =>
                    setNewVisitDays({ ...newVisitDays, mon: !newVisitDays.mon })
                  }
                />
                <label htmlFor="mon">월요일</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="tue"
                  checked={newVisitDays.tue}
                  onChange={() =>
                    setNewVisitDays({ ...newVisitDays, tue: !newVisitDays.tue })
                  }
                />
                <label htmlFor="tue">화요일</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="wed"
                  checked={newVisitDays.wed}
                  onChange={() =>
                    setNewVisitDays({ ...newVisitDays, wed: !newVisitDays.wed })
                  }
                />
                <label htmlFor="wed">수요일</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="thu"
                  checked={newVisitDays.thu}
                  onChange={() =>
                    setNewVisitDays({ ...newVisitDays, thu: !newVisitDays.thu })
                  }
                />
                <label htmlFor="thu">목요일</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="fri"
                  checked={newVisitDays.fri}
                  onChange={() =>
                    setNewVisitDays({ ...newVisitDays, fri: !newVisitDays.fri })
                  }
                />
                <label htmlFor="fri">금요일</label>
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
