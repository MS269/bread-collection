import { addDoc, collection } from "@firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { db } from "../../firebase";

interface IAddBakeryData {
  name: string;
  area: string;
  checkVisit: boolean;
  visitDays: [boolean, boolean, boolean, boolean, boolean];
  etc: string;
}

export default function AddBakery() {
  const { handleSubmit, register, setValue } = useForm<IAddBakeryData>();
  const onSubmit: SubmitHandler<IAddBakeryData> = ({
    name,
    area,
    checkVisit,
    visitDays,
    etc,
  }) => {
    const bakery = {
      name,
      area,
      checkVisit,
      visitDays,
      etc,
      visitOrder: 0,
      needVisit: false,
      needCert: false,
      visited: false,
    };
    addDoc(collection(db, "bakeries"), bakery);
    setValue("name", "");
    setValue("area", "");
    setValue("checkVisit", false);
    setValue("visitDays", [true, true, true, true, true]);
    setValue("etc", "");
  };

  return (
    <div>
      <h3>빵집 추가</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="이름"
          {...register("name", { required: true })}
        />
        <select {...register("area", { required: true })}>
          <option value="">-- 위치 --</option>
          <option value="걸포동">- 걸포동 -</option>
          <option value="사우동">- 사우동 -</option>
          <option value="풍무동">- 풍무동 -</option>
          <option value="고촌읍">- 고촌읍 -</option>
          <option value="운양동">- 운양동 -</option>
          <option value="장기동">- 장기동 -</option>
          <option value="마산동">- 마산동 -</option>
          <option value="구래동">- 구래동 -</option>
        </select>
        <div>
          <input type="checkbox" id="checkVisit" {...register("checkVisit")} />
          <label htmlFor="checkVisit">방문확인필요</label>
        </div>
        <fieldset>
          <legend>수거요일</legend>
          <div>
            <input
              type="checkbox"
              id="mon"
              defaultChecked={true}
              {...register("visitDays.0")}
            />
            <label htmlFor="mon">월요일</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="tue"
              defaultChecked={true}
              {...register("visitDays.1")}
            />
            <label htmlFor="tue">화요일</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="wed"
              defaultChecked={true}
              {...register("visitDays.2")}
            />
            <label htmlFor="wed">수요일</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="thu"
              defaultChecked={true}
              {...register("visitDays.3")}
            />
            <label htmlFor="thu">목요일</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="fri"
              defaultChecked={true}
              {...register("visitDays.4")}
            />
            <label htmlFor="fri">금요일</label>
          </div>
        </fieldset>
        <input type="text" placeholder="추가사항" {...register("etc")} />
        <input type="submit" value="추가" />
      </form>
    </div>
  );
}
