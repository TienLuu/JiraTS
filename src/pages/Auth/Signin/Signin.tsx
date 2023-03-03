import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useLocation, Navigate, useSearchParams } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";

import { FaFacebookSquare } from "react-icons/fa";
import { login } from "../../../redux/slices/authSlice";
import Button from "../../../components/Button";
import TextField from "../../../components/TextField/TextField";

import { RootState, useAppDispatch } from "../../../store";
import { TUserLogin } from "../../../type/user.interface";
import { showError, showSuccess } from "../../../utils/toast";
import { color } from "../../../utils/styles";
import { Text, StyledLink } from "./styles";

const Login = () => {
   const dispatch = useAppDispatch();
   const [searchParams, setSearchParams] = useSearchParams();
   const { user } = useSelector((state: RootState) => state.auth);
   const location = useLocation();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm({
      defaultValues: {
         email: "",
         passWord: "",
      },
   });

   useEffect(() => {
      const registerInfo = location.state;
      if (!registerInfo) return;

      setValue("email", registerInfo.email);
      setValue("passWord", registerInfo.password);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const onSubmit = async (values: TUserLogin) => {
      try {
         await dispatch(login(values)).unwrap();
         showSuccess("Login successfully!");
      } catch (err: any) {
         showError(err.message);
      }
   };

   if (user?.email) {
      const redirectUrl = searchParams.get("redirectUrl");
      return <Navigate to={redirectUrl || "/"} replace />;
   }

   return (
      <>
         <Text className="title">Sign in to your account</Text>
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
               placeholder="Email"
               {...register("email", {
                  required: {
                     value: true,
                     message: "Please enter your email!",
                  },
               })}
               error={errors.email && errors.email.message}
            />
            <TextField
               type="password"
               placeholder="Password"
               {...register("passWord", {
                  required: {
                     value: true,
                     message: "Please enter your password!",
                  },
               })}
               error={errors.passWord && errors.passWord.message}
            />
            <Button fullWidth variant="primary" className="loginBtn" textCenter>
               Log in
            </Button>
         </form>
         <Text className="normal">Or</Text>
         <Button
            icon={<FaFacebookSquare color={color.primary} />}
            className="hightlight"
            textCenter
            fullWidth
            variant="secondary"
         >
            Continue with Facebook
         </Button>
         <StyledLink>
            <Link to="/backup">Can't log in? </Link>
            <Link to="/signup">Sign up for an account</Link>
         </StyledLink>
         <ToastContainer transition={Slide} />
      </>
   );
};

export default Login;
