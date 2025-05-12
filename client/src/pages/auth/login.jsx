import CommonForm from "@/components/common/form";
import React, { useState } from "react";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner"; // ✅ Import toast from sonner
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};
const Authlogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    // Handle login logic here

    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        // navigate("/admin/dashboard");
      } else {
        toast(data?.payload?.message, {
          className: "bg-red-600 text-white",
          // unstyled: true,
        });
      }
    });
  }

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
