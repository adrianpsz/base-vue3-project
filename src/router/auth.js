import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import ForgotYouPasswordView from "@/views/auth/ForgotYouPasswordView";
import ResetPasswordView from "@/views/auth/ResetPasswordView";

export default [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/forgot-your-password",
    name: "forgotYourPassword",
    component: ForgotYouPasswordView,
  },
  {
    path: "/reset-password/:token",
    name: "resetPassword",
    component: ResetPasswordView,
  },
];
