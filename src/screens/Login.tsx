import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import Layout from "../components/Layout";
import { LoginContext } from "../contexts/login";

const PASSWORD: string = process.env.REACT_APP_ADMIN_PASSWORD;

interface ILoginData {
  password: string;
}

const LoginForm = styled.form`
  display: flex;
  justify-items: center;
  align-items: center;
  margin: 24px 0px;
`;

const PasswordInput = styled.input`
  margin-right: 10px;
  padding: 8px;
  border: solid 1px ${(props) => props.theme.borderColor};
  border-radius: 4px;
`;

const SubmitButton = styled.input`
  background-color: ${(props) => props.theme.blue};
  padding: 11px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`;

export default function Login() {
  const { handleSubmit, register } = useForm<ILoginData>({
    mode: "onChange",
  });

  return (
    <Layout>
      <LoginContext.Consumer>
        {({ login }) => {
          const onSubmit: SubmitHandler<ILoginData> = ({ password }) => {
            if (password === PASSWORD) {
              login();
            }
          };

          return (
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
              <PasswordInput
                type="password"
                placeholder="비밀번호를 입력해주세요"
                {...register("password", { required: true })}
              />
              <SubmitButton type="submit" value="로그인" />
            </LoginForm>
          );
        }}
      </LoginContext.Consumer>
    </Layout>
  );
}
