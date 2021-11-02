import { addDoc, collection } from "@firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { LoginContext } from "../../contexts/login";
import { db } from "../../firebase";

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

const SendButton = styled.input`
  width: 70px;
  color: ${(props) => props.theme.blue};
  text-align: right;
  font-weight: 600;
  cursor: pointer;
`;

export default function SendMessage() {
  const { handleSubmit, register, setValue } = useForm<ISendMesssageData>();
  const onSubmit: SubmitHandler<ISendMesssageData> = ({ author, payload }) => {
    const message = {
      author,
      payload,
      createdAt: Date.now(),
      read: false,
    };
    addDoc(collection(db, "chat"), message);
    setValue("payload", "");
  };

  return (
    <SendMessageForm onSubmit={handleSubmit(onSubmit)}>
      <LoginContext.Consumer>
        {({ isLoggedIn }) => (
          <AuthorInput
            type="text"
            placeholder="닉네임"
            value={isLoggedIn ? "관리자" : "봉사자"}
            {...register("author", { required: true })}
          />
        )}
      </LoginContext.Consumer>
      <PayloadInput
        type="text"
        placeholder="메시지 입력..."
        {...register("payload", { required: true })}
      />
      <SendButton type="submit" value="보내기" />
    </SendMessageForm>
  );
}
