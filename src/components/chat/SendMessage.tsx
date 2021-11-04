import { doc, setDoc } from "@firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLoggedInState } from "../../atoms";
import { db } from "../../firebase";
import { HasErrorInput } from "../sharedStyles";

interface ISendMesssageData {
  author: string;
  payload: string;
}

const SendMessageForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 11px 0px 11px;
  border: solid 1px ${(props) => props.theme.borderColor};
  border-radius: 22px;
`;

const AuthorInput = styled.input`
  width: 40px;
  text-align: left;
`;

const PayloadInput = styled.input`
  width: 100%;
  padding: 8px 9px;
`;

const SendButton = styled(HasErrorInput)`
  width: 70px;
  color: ${(props) => props.theme.blue};
  text-align: right;
  font-weight: 600;
`;

export default function SendMessage() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const { handleSubmit, register, setValue, formState } =
    useForm<ISendMesssageData>({ mode: "onChange" });
  const onSubmit: SubmitHandler<ISendMesssageData> = ({ author, payload }) => {
    const createdAt = Date.now();
    const message = {
      author,
      payload,
      createdAt,
    };
    setDoc(doc(db, "chat", String(createdAt)), message);
    setValue("payload", "");
  };

  return (
    <SendMessageForm onSubmit={handleSubmit(onSubmit)}>
      <AuthorInput
        type="text"
        placeholder="닉네임"
        defaultValue={isLoggedIn ? "관리자" : "봉사자"}
        {...register("author", { required: true })}
      />
      <PayloadInput
        type="text"
        placeholder="메시지 입력..."
        {...register("payload", { required: true })}
      />
      <SendButton type="submit" value="보내기" hasError={!formState.isValid} />
    </SendMessageForm>
  );
}
