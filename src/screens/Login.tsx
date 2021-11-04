import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedInState, passwordState } from "../atoms";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import { HasErrorInput } from "../components/sharedStyles";

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

const SubmitButton = styled(HasErrorInput)`
  background-color: ${(props) => props.theme.blue};
  padding: 11px;
  border-radius: 4px;
  color: white;
`;

export default function Login() {
  const pwd = useRecoilValue(passwordState);
  const login = useSetRecoilState(isLoggedInState);

  const { handleSubmit, register, formState } = useForm<ILoginData>({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<ILoginData> = ({ password }) => {
    if (password === pwd) {
      login(true);
    }
  };

  return (
    <Layout>
      <PageTitle title={"로그인"} />
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...register("password", { required: true })}
        />
        <SubmitButton
          type="submit"
          value="로그인"
          hasError={!formState.isValid}
        />
      </LoginForm>
    </Layout>
  );
}
