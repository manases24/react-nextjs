import * as yup from "yup";

export const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});
