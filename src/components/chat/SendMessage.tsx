import { addDoc, collection } from "@firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { db } from "../../firebase";

interface ISendMesssageData {
  nickname: string;
  payload: string;
}

export default function SendMessage() {
  const { handleSubmit, register, setValue } = useForm<ISendMesssageData>();
  const onSubmit: SubmitHandler<ISendMesssageData> = ({
    nickname,
    payload,
  }) => {
    const message = {
      nickname,
      payload,
    };
    addDoc(collection(db, "chat"), message);
    setValue("nickname", "봉사자");
    setValue("payload", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="닉네임"
        defaultValue="봉사자"
        {...register("nickname")}
      />
      <input type="text" placeholder="메세지" {...register("payload")} />
      <input type="sumbit" value="보내기" />
    </form>
  );
}
