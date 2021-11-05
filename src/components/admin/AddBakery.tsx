import { doc, setDoc } from "@firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { db } from "../../firebase";
import { Container, HasErrorInput, Input, Title } from "../sharedStyles";

interface IAddBakeryData {
  name: string;
  area: string;
  visitDays: [boolean, boolean, boolean, boolean, boolean];
  etc: string;
}

const AddBakeryForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0px 0px 0px;
`;

const NameInput = styled(Input)`
  margin: 0px 0px 10px 0px;
`;

const AreaSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin: 0px 0px 10px 0px;
  border: solid 1px ${(props) => props.theme.borderColor};
  border-radius: 4px;
  text-align: center;
`;

const VisitDayWrapper = styled.fieldset`
  width: 100%;
  padding: 8px;
  margin: 0px 0px 10px 0px;
  border: solid 1px ${(props) => props.theme.borderColor};
`;

const VisitDayTitle = styled.legend`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const VisitDayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 3px 0px;
  text-align: center;
  cursor: pointer;
`;

const VisitDayCheckbox = styled.input`
  margin: 0px 3px 0px 0px;
`;

const VisitDayLabel = styled.label`
  cursor: pointer;
`;

const EtcInput = styled(Input)`
  margin: 0px 0px 10px 0px;
`;

const AddBakeryButton = styled(HasErrorInput)`
  background-color: ${(props) => props.theme.blue};
  padding: 8px;
  border-radius: 4px;
  color: white;
`;

export default function AddBakery() {
  const { handleSubmit, register, setValue, formState } =
    useForm<IAddBakeryData>({ mode: "onChange" });
  const onSubmit: SubmitHandler<IAddBakeryData> = ({
    name,
    area,
    visitDays,
    etc,
  }) => {
    const bakery = {
      name,
      area,
      visitDays,
      etc,
      visitCheck: "",
      visitOrder: 0,
      visited: false,
    };
    setDoc(doc(db, "bakeries", name), bakery);
    setValue("name", "");
    setValue("area", "");
    setValue("visitDays", [true, true, true, true, true]);
    setValue("etc", "");
  };

  return (
    <Container>
      <Title>빵집 추가</Title>
      <AddBakeryForm onSubmit={handleSubmit(onSubmit)}>
        <NameInput
          type="text"
          placeholder="이름"
          {...register("name", { required: true })}
        />
        <AreaSelect {...register("area", { required: true })}>
          <option value="">-- 위치 --</option>
          <option value="걸포동">- 걸포동 -</option>
          <option value="사우동">- 사우동 -</option>
          <option value="풍무동">- 풍무동 -</option>
          <option value="고촌읍">- 고촌읍 -</option>
          <option value="운양동">- 운양동 -</option>
          <option value="장기동">- 장기동 -</option>
          <option value="마산동">- 마산동 -</option>
          <option value="구래동">- 구래동 -</option>
        </AreaSelect>
        <VisitDayWrapper>
          <VisitDayTitle>수거요일</VisitDayTitle>
          <VisitDayContainer>
            <VisitDayCheckbox
              type="checkbox"
              id="mon"
              defaultChecked={true}
              {...register("visitDays.0")}
            />
            <VisitDayLabel htmlFor="mon">월요일</VisitDayLabel>
          </VisitDayContainer>
          <VisitDayContainer>
            <VisitDayCheckbox
              type="checkbox"
              id="tue"
              defaultChecked={true}
              {...register("visitDays.1")}
            />
            <VisitDayLabel htmlFor="tue">화요일</VisitDayLabel>
          </VisitDayContainer>
          <VisitDayContainer>
            <VisitDayCheckbox
              type="checkbox"
              id="wed"
              defaultChecked={true}
              {...register("visitDays.2")}
            />
            <VisitDayLabel htmlFor="wed">수요일</VisitDayLabel>
          </VisitDayContainer>
          <VisitDayContainer>
            <VisitDayCheckbox
              type="checkbox"
              id="thu"
              defaultChecked={true}
              {...register("visitDays.3")}
            />
            <VisitDayLabel htmlFor="thu">목요일</VisitDayLabel>
          </VisitDayContainer>
          <VisitDayContainer>
            <VisitDayCheckbox
              type="checkbox"
              id="fri"
              defaultChecked={true}
              {...register("visitDays.4")}
            />
            <VisitDayLabel htmlFor="fri">금요일</VisitDayLabel>
          </VisitDayContainer>
        </VisitDayWrapper>
        <EtcInput type="text" placeholder="추가사항" {...register("etc")} />
        <AddBakeryButton
          type="submit"
          value="추가"
          hasError={!formState.isValid}
        />
      </AddBakeryForm>
    </Container>
  );
}
