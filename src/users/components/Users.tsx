import { useFieldArray, useFormContext, useWatch, type SubmitHandler } from "react-hook-form";
import { Button, Container, Stack } from "@mui/material";
import { defaultValues, type Schema } from "../types/schema";
import { RHFAutocomplete } from "../../components/RHFAutoComplete";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckbox } from "../../components/RHFCheckbox";
import { RHFDateTimePicker } from "../../components/RHFDateTimePicker";
import { RHFSlider } from "../../components/RHFSlider";
import { RHFSwitch } from "../../components/RHFSwitch";
import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { RHFTextField } from "../../components/RHFTextField";

export function Users() {
  const statesQuery = useStates();
  const languagensQuery = useLanguages();
  const genderQuery = useGenders();
  const skillsQuery = useSkills();

  const { handleSubmit, unregister, control, reset } = useFormContext<Schema>();

  const variant = useWatch({ control, name: "variant" });
  const isTeacher = useWatch({ control, name: "isTeacher" });

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  const handleReset = () => {
    reset(defaultValues);
  };

  const onSubmit: SubmitHandler<Schema> = (data) => {
    console.log("entrou")
		if (variant === 'create') {
			console.log(JSON.stringify(data, null, 2));
      alert("Criado com sucesso!")
		} 
	};

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ gap: 2 }}>
          <RHFTextField<Schema> name="name" label="Name" />
          <RHFTextField<Schema> name="email" label="Email" />

          <RHFAutocomplete<Schema>
            name="states"
            label="States"
            options={statesQuery.data}
          />

          <RHFToggleButtonGroup<Schema>
            name="languages"
            options={languagensQuery.data}
          />

          <RHFRadioGroup<Schema>
            name="gender"
            options={genderQuery.data}
            label="Gênero"
          />

          <RHFCheckbox<Schema>
            name="skills"
            options={skillsQuery.data}
            label="Habilidades"
          />

          <RHFDateTimePicker<Schema>
            name="registrationDateAndTime"
            label="Data & Hora"
          />

          <RHFSlider name="salaryRange" label="Faixa Salarial" />

          <RHFSwitch name="isTeacher" label="Você é um professor?" />

          {isTeacher && (
            <Button onClick={() => append({ name: "" })} type="button">
              Adicione um estudante
            </Button>
          )}

          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <RHFTextField<Schema>
                name={`students.${index}.name`}
                label="Name"
              />
              <Button
                color="error"
                onClick={() => {
                  remove(index);
                }}
                type="button"
              >
                Remove
              </Button>
            </Fragment>
          ))}

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button variant="contained" type="submit">
              {variant === "create" ? "New user" : "Edit user"}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
    </Container>
  );
}
