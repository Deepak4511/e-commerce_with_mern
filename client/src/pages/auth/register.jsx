import CommonForm from "@/components/common/form";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerFormControls } from "@/config";

const initialState = {
  username: "",
  email: "",
  password: "",
};
const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);

  function onSubmit() {}
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className=" text-3xl font-bold tracking-tight text-foreground">
          Create new Account
        </h1>
        <p>
          Already have an Account ?
          <Link
            to="/auth/login"
            className="font-medium-text-primary hover:underline ml-2"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
