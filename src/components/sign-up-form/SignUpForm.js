/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { signup } from "../../store/userSlice";
import styles from "./SignUpForm.module.scss";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    const { username, email, password } = data;
    dispatch(signup({
      username,
      email,
      password,
    }))
      .unwrap()
      .then(() => {
        reset();
        navigate("/");
      })
      .catch((rejectValue) => {
        toast(rejectValue);
        reset();
      });
  };
  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.formTitle}>Create new account</span>
        <label className={styles.formField}>
          <span>Username</span>
          <input
            {...register("username", {
              required: "Required field",
              minLength: {
                value: 3,
                message: "Your username needs to be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Your username needs to be not longer than 20 characters",
              },
            })}
            type="text"
            placeholder="Username"
            aria-invalid={!!errors?.username}
          />
          {errors?.username && (
            <p role="alert" className={styles.errorMsg}>{errors.username.message}</p>
          )}
        </label>
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
              minLength: {
                value: 6,
                message: "Your password needs to be at least 6 characters",
              },
              maxLength: {
                value: 40,
                message: "Your password needs to be not longer than 40 characters",
              },
            })}
            type="text"
            placeholder="Password"
            aria-invalid={!!errors?.password}
          />
          {errors?.password && (
            <p role="alert" className={styles.errorMsg}>{errors.password.message}</p>
          )}
        </label>
        <label className={styles.formField}>
          <span>Repeat Password</span>
          <input
            {...register("repeatPwd", {
              required: "Required field",
              validate: (value) => value === getValues("password") || "Passwords must match",
            })}
            type="text"
            placeholder="Password"
            aria-invalid={!!errors?.repeatPwd}
          />
          {errors?.repeatPwd && (
            <p role="alert" className={styles.errorMsg}>{errors.repeatPwd.message}</p>
          )}
        </label>
        <label className={styles.confirmButton}>
          <input
            {...register("confirm", {
              required: "Agree to proceed",
            })}
            type="checkbox"
          />
          <span>I agree to the processing of my personal information</span>
        </label>
        {errors?.confirm && (
          <p className={styles.confirmErrorMsg}>{errors.confirm.message}</p>
        )}
        <button className={styles.createButton} type="submit">Create</button>
        <div className={styles.goToSignIn}>Already have an account? <Link to="/sign-in">Sign In.</Link></div>
      </form>
    </div>
  );
}

export default SignUpForm;
