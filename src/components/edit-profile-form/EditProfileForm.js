/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { editProfile } from "../../store/userSlice";
import styles from "../sign-up-form/SignUpForm.module.scss";

function EditProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.user);
  const { username, email, image } = user;
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
    dispatch(editProfile(data))
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
        <span className={styles.formTitle}>Edit Profile</span>
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
            defaultValue={username}
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
            defaultValue={email}
            aria-invalid={!!errors?.email}
          />
          {errors?.email && (
            <p role="alert" className={styles.errorMsg}>{errors.email.message}</p>
          )}
        </label>
        <label className={styles.formField}>
          <span>New Password</span>
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
            placeholder="New Password"
            aria-invalid={!!errors?.password}
          />
          {errors?.password && (
            <p role="alert" className={styles.errorMsg}>{errors.password.message}</p>
          )}
        </label>
        <label className={styles.formField}>
          <span>Avatar image (url)</span>
          <input
            {...register("image", {
              required: "Required field",
              pattern: {
                value: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig,
                message: "Invalid URL",
              },
            })}
            type="text"
            placeholder="Avatar image"
            defaultValue={image}
            aria-invalid={!!errors?.image}
          />
          {errors?.image && (
            <p role="alert" className={styles.errorMsg}>{errors.image.message}</p>
          )}
        </label>
        {error && <p className={styles.errorMsg}>{error}</p>}
        <button className={styles.createButton} type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditProfileForm;
