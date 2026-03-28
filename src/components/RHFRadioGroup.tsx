import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { Option } from "../types/options";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export function RHFRadioGroup<T extends FieldValues>(props: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} error={!!error}>
          <FormLabel>{props.label}</FormLabel>
          <RadioGroup>
            {props.options?.map((option) => (
              <FormControlLabel
                label={option.label}
                key={option.id}
                value={option.id}
                control={<Radio checked={field.value === option.id} />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    ></Controller>
  );
}
