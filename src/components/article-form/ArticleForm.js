/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { createArticle, updateArticle } from "../../store/dataSlice";
import styles from "./ArtcileForm.module.scss";

function ArticleForm({ mode, article }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = mode === "create" ? "Create new article" : "Edit article";

  const {
    register,
    control,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: article?.title,
      description: article?.description,
      body: article?.body,
      tagList: article?.tagList,
    },
  });

  const onSubmit = (newArticle) => {
    if (mode === 'create') {
      dispatch(createArticle(newArticle))
        .unwrap()
        .then((result) => {
          navigate(`/articles/${result.article.slug}`);
        })
        .catch((rejectValue) => {
          toast(rejectValue);
          reset();
        });
    } else {
      dispatch(updateArticle({ slug: article.slug, article: newArticle }))
        .unwrap()
        .then((result) => {
          navigate(`/articles/${result.article.slug}`);
        })
        .catch((rejectValue) => {
          toast(rejectValue);
          reset();
        });
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tagList",
  });

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.formTitle}>{title}</span>
        <label className={styles.formField}>
          <span>Title</span>
          <input
            {...register("title", {
              required: "Required field",
            })}
            type="text"
            placeholder="Title"
            aria-invalid={!!errors?.title}
          />
          {errors?.title && (
          <p role="alert" className={styles.errorMsg}>{errors.title.message}</p>
          )}
        </label>
        <label className={styles.formField}>
          <span>Short description</span>
          <input
            {...register("description", {
              required: "Required field",
            })}
            type="text"
            placeholder="Description"
            aria-invalid={!!errors?.description}
          />
          {errors?.description && (
          <p role="alert" className={styles.errorMsg}>{errors.description.message}</p>
          )}
        </label>
        <label className={styles.formField}>
          <span>Text</span>
          <textarea
            {...register("body", {
              required: "Required field",
            })}
            className={styles.text}
            placeholder="Text"
            aria-invalid={!!errors?.body}
          />
          {errors?.body && (
          <p role="alert" className={styles.errorMsg}>{errors.body.message}</p>
          )}
        </label>
        <label className={styles.formField}>
          <span>Tags</span>
          <div className={styles.tagsWrap}>
            {fields.map((field, index) => (
              <div className={styles.tagField} key={field.id}>
                <input type="text" placeholder="Tag" {...register(`tagList.${index}`)} />
                <button className={styles.deleteButton} type="button" onClick={() => remove(index)}>Delete</button>
              </div>
            ))}
            <button className={styles.addButton} type="button" onClick={() => append("")}>Add tag</button>
          </div>
        </label>
        <button className={styles.createButton} type="submit">Send</button>
      </form>
    </div>
  );
}

export default ArticleForm;
