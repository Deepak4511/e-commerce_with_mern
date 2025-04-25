
import CommonForm from "@/components/common/form";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginFormControls } from "@/config";

const initialState = {
  email: "",
  password: "",
};
const Authlogin = () => {
  const [formData, setFormData] = useState(initialState);

  function onSubmit() {}
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className=" text-3xl font-bold tracking-tight text-foreground">
          Sign in to your Account
        </h1>
        <p>
          Don't hava an Account ?
          <Link
            to="/auth/register"
            className="font-medium-text-primary hover:underline ml-2"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Authlogin;

