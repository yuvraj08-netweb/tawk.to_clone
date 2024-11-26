/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../store/slices/adminSlice";
import { signupSchema } from "../../validations";
import { Eye, EyeClosed } from "lucide-react";

const SignUpForm = ({ setSelected }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
    const dispatch = useDispatch();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirmPassword = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const handleSignup = (data) => {
    console.log(data);
    const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
    }
    try {
        dispatch(register(userData)).unwrap().then((res)=>{
            console.log(res);
            toast.success("User created successfully");
            setIsLoading(false);
            setSelected("login")
        })
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error("Signup Failed");
    }
    reset();
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit(handleSignup)}>
        <div className="flex flex-col space-y-5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Name"
                variant="bordered"
                placeholder="Enter your name"
                size="lg"
                className=""
                color={errors?.name?.message ? "danger" : "success"}
                isInvalid={errors?.name?.message}
                errorMessage={errors?.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                label="Email"
                variant="bordered"
                placeholder="Enter your email"
                color={errors?.email?.message ? "danger" : "success"}
                isInvalid={errors?.email?.message}
                errorMessage={errors?.email?.message}
                size="lg"
                className=""
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <Eye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                color={errors?.password?.message ? "danger" : "success"}
                isInvalid={errors?.password?.message}
                errorMessage={errors?.password?.message}
                size="lg"
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Confirm Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibilityConfirmPassword}
                  >
                    {isVisibleConfirmPassword ? (
                      <Eye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisibleConfirmPassword ? "text" : "password"}
                color={errors?.confirmPassword?.message ? "danger" : "success"}
                isInvalid={errors?.confirmPassword?.message}
                errorMessage={errors?.confirmPassword?.message}
                size="lg"
              />
            )}
          />
          <Button
            isLoading={isLoading}
            type="submit"
            color="primary"
            size="lg"
            className="font-semibold"
          >
            Signup
          </Button>
        </div>
      </form>
      <p className="text-center">
        Already have an account?{" "}
        <a
          onClick={() => setSelected("login")}
          href="#"
          className="text-blue-600 font-medium inline-flex space-x-1 items-center"
        >
          <span>Login now </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
        </a>
      </p>
    </div>
  );
};

export default SignUpForm;
