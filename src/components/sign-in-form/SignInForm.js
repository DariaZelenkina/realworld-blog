/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { login } from "../../store/userSlice";
import styles from "./SignInForm.module.scss";
import 'react-toastify/dist/ReactToastify.css';

function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        reset();
        navigate(fromPage, { replace: true });
      })
      .catch((rejectValue) => {
        toast(rejectValue);
        reset();
      });
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.formTitle}>Sign In</span>
        <label className={styles.formField}>
          <span>Email address</span>
          <input
            {...register("email", {
              required: "Required field",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Invalid email format",
              },
            })}
            type="text"
            placeholder="Email address"
            aria-invalid={!!errors?.email}
          />
          {errors?.email && (
            <p role="alert" className={styles.errorMsg}>{errors.email.message}</p>
          )}
        </label>
        <label className={styles.formField}>
          <span>Password</span>
          <input
            {...register("password", {
              required: "Required field",
            })}
            type="text"
            placeholder="Password"
            aria-invalid={!!errors?.password}
          />
          {errors?.password && (
            <p role="alert" className={styles.errorMsg}>{errors.password.message}</p>
          )}
        </label>
        <button className={styles.submitButton} type="submit">Login</button>
        <div className={styles.goToSignUp}>Don&apos;t have an account? <Link to="/sign-up">Sign Up.</Link></div>
      </form>
    </div>
  );
}

export default SignInForm;
