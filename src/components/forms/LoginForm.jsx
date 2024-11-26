/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signinSchema } from "../../validations";
import { Eye, EyeClosed } from "lucide-react";
import { login } from "../../store/slices/adminSlice";
import { setItemInLocalStorage } from "../../utils";

const LoginForm = ({ setSelected }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
    const nav = useNavigate();
    const dispatch = useDispatch();
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(signinSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data) => {
    setIsLoading(true);
    const res = dispatch(login(data)).unwrap().then((res)=>{
      setIsLoading(false)
      setItemInLocalStorage("authToken",res.data.token)
      toast.success("Login Successfull");
      nav("/dashboard");
    })
    console.log(data, "LoginData");
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} className="">
        <div className="flex flex-col space-y-5">
          <Controller
            control={control}
            name="email"
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
            control={control}
            name="password"
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

          <Button
            isLoading={isLoading}
            type="submit"
            color="primary"
            size="lg"
            className="font-semibold"
          >
            Login
          </Button>
          <p className="text-center">
            Not registered yet?{" "}
            <a
              onClick={() => setSelected("sign-up")}
              href="#"
              className="text-blue-600 font-medium inline-flex space-x-1 items-center"
            >
              <span>Register now </span>
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
      </form>
    </div>
  );
};

export default LoginForm;
