import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { Option } from "../types/options";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export function RHFDateTimePicker<T extends FieldValues>(props: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label={props.label}
            {...field}
            slotProps={{
              textField: {
                error: !!fieldState.error,
                helperText: fieldState.error?.message,
              },
            }}
          />
        </LocalizationProvider>
      )}
    ></Controller>
  );
}
