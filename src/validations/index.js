import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup.string().required("Please Provide Your Name"),
  email: yup
    .string()
    .required("Email is required !")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email is Invalid"
    ),
  password: yup
    .string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters!")
    .matches(/[a-z]/, "At least one lowercase character!")
    .matches(/[A-Z]/, "At least one uppercase character!")
    .matches(/[\W_]/, "At least 1 special character (@, !, #, etc)!")
    .matches(/[0-9]/, "Must Include One Number"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required!")
    .oneOf([yup.ref("password"), null], "Passwords must match!"),
});

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required !")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email is Invalid"
    ),
  password: yup
    .string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters!")
    .matches(/[a-z]/, "At least one lowercase character!")
    .matches(/[A-Z]/, "At least one uppercase character!")
    .matches(/[\W_]/, "At least 1 special character (@, !, #, etc)!")
    .matches(/[0-9]/, "Must Include One Number"),
});
