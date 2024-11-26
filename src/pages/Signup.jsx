/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import { EyeFilledIcon } from "../components/EyeFilledIcon";
// import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";
import { Divider, Tab, Tabs } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import SignUpForm from "../components/forms/SignUpForm";
import LoginForm from "../components/forms/LoginForm";

export default function Signup() {
  const [selected, setSelected] = useState("login");

  return (
    <Card className="max-w-md mx-auto my-5 mt-9 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl text-center font-bold text-slate-800 pt-3">
        Tawk.io Clone
      </h1>
      <CardBody>
        <Tabs
          fullWidth
          size="lg"
          aria-label="Tabs form"
          selectedKey={selected}
          onSelectionChange={setSelected}
          className="font-semibold"
        >
          <Tab key="login" title="Login">
            <Divider className="my-4" />
            <LoginForm setSelected={setSelected}/>
          </Tab>
          <Tab key="sign-up" title="Sign up">
            <Divider className="my-4" />
            <SignUpForm setSelected={setSelected}/>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
