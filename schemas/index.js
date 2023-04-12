import * as yup from "yup";

export const todoItemSchema = yup.object().shape({
  task: yup.string().required("Title is required"),
  priority: yup.string().required("Priority is required"),
});
