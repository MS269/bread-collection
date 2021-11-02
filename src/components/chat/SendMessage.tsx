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
  height: 30px;
  border: solid 1px ${(props) => props.theme.borderColor};
  border-radius: 15px;
`;

const AuthorInput = styled.input`
  width: 50px;
  height: 20px;
  margin-left: 4px;
  border: solid 1px ${(props) => props.theme.borderColor};
  border-radius: 10px;
  text-align: center;
`;

const PayloadInput = styled.input`
  width: 100%;
  margin: 0px 5px;
`;

const SendButton = styled.input`
  width: 65px;
  margin-right: 10px;
  text-align: right;
  color: ${(props) => props.theme.blue};
  font-weight: 600;
  cursor: pointer;
`;

export default function SendMessage() {
  const { handleSubmit, register, setValue } = useForm<ISendMesssageData>();
  const onSubmit: SubmitHandler<ISendMesssageData> = ({ author, payload }) => {
    const now = new Date();
    const meridiem = now.getHours() < 12 ? "오전" : "오후";
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const createdAt = `${meridiem} ${hours}:${minutes}`;
    const message = {
      author,
      payload,
      createdAt,
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
        placeholder="메시지 보내기..."
        {...register("payload", { required: true })}
      />
      <SendButton type="submit" value="보내기" />
    </SendMessageForm>
  );
}
