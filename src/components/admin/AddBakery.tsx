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
      <Title>?????? ??????</Title>
      <AddBakeryForm onSubmit={handleSubmit(onSubmit)}>
        <NameInput
          type="text"
          placeholder="??????"
          {...register("name", { required: true })}
        />
        <AreaSelect {...register("area", { required: true })}>
          <option value="">-- ?????? --</option>
          <option value="?????????">- ????????? -</option>
          <option value="?????????">- ????????? -</option>
          <option value="?????????">- ????????? -</option>
          <option value="?????????">- ????????? -</option>
          <option value="?????????">- ????????? -</option>
          <option value="?????????">- ????????? -</option>
          <option value="?????????">- ????????? -</option>
          <option value="?????????">- ????????? -</option>
        </AreaSelect>
        <VisitDayWrapper>
          <VisitDayTitle>????????????</VisitDayTitle>
          <VisitDayContainer>
            <VisitDayCheckbox
              type="checkbox"
              id="mon"
              defaultChecked={true}
              {...register("visitDays.0")}
            />
            <VisitDayLabel htmlFor="mon">?????????</VisitDayLabel>
          </VisitDayContainer>
          <VisitDayContainer>
            <VisitDayCheckbox
              type="checkbox"
              id="tue"
              defaultChecked={true}
              {...register("visitDays.1")}
            />
            <VisitDayLabel htmlFor="tue">?????????</VisitDayLabel>
          </VisitDayContainer>
          <VisitDayContainer>
            <VisitDayCheckbox
              type="checkbox"
              id="wed"
              defaultChecked={true}
              {...register("visitDays.2")}
            />
            <VisitDayLabel htmlFor="wed">?????????</VisitDayLabel>
          </VisitDayContainer>
          <VisitDayContainer>
            <VisitDayCheckbox
              type="checkbox"
              id="thu"
              defaultChecked={true}
              {...register("visitDays.3")}
            />
            <VisitDayLabel htmlFor="thu">?????????</VisitDayLabel>
          </VisitDayContainer>
          <VisitDayContainer>
            <VisitDayCheckbox
              type="checkbox"
              id="fri"
              defaultChecked={true}
              {...register("visitDays.4")}
            />
            <VisitDayLabel htmlFor="fri">?????????</VisitDayLabel>
          </VisitDayContainer>
        </VisitDayWrapper>
        <EtcInput type="text" placeholder="????????????" {...register("etc")} />
        <AddBakeryButton
          type="submit"
          value="??????"
          hasError={!formState.isValid}
        />
      </AddBakeryForm>
    </Container>
  );
}
