import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"; // ✅ Import toast from sonner


const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch()
  const navigate = useNavigate();


  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData))
      .then((data)=>{
        if (data?.payload?.success) {
        toast.success(data?.payload?.message);
          navigate("/auth/login");
        }else{
          toast(data?.payload?.message, {
             className: "bg-red-600 text-white", 
            //  unstyled: true,
          });
          
        }
      });
  }


  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new Account
        </h1>
        <p>
          Already have an Account?
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline ml-2"
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
