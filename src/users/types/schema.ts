import { z } from "zod";
import { startOfDay, isBefore } from "date-fns";

export const schema = z
  .intersection(
    z.object({
      name: z.string().nonempty("O nome é obrigatório"),
      email: z
        .string()
        .nonempty("O email é obrigatório")
        .email("O e-mail é inválido"),
      states: z.array(z.string().min(1).max(2)),
      languages: z.array(z.string()),
      gender: z.string().min(1, "O género é obrigatório"),
      skills: z.array(z.string()).max(2, "As habilidade devem ser no máximo 2"),
      registrationDateAndTime: z.date().refine((date) => {
        return !isBefore(date, startOfDay(new Date()));
      }, "A data não pode ser no passado"),
      salaryRange: z.array(z.number()).max(2),
    }),
    z.discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
    ]),
  )
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),

        students: z.array(
          z.object({
            name: z
              .string()
              .nonempty("O nome é obrigatório")
              .min(4, "O nome deve ter no mínimo 4 caracteres"),
          }),
        ),
      }),
    ]),
  );

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: "create",
  email: "",
  name: "",
  states: [],
  languages: [],
  gender: "",
  skills: [],
  registrationDateAndTime: new Date(),
  salaryRange: [0, 2000],
  isTeacher: false,
};
