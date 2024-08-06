import React from "react";
import { styles } from "../style/tailwindStyles";
import { useFormik } from "formik";
import { signupSchema } from "../validationSchemas";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signupSchema,
      onSubmit: async (values) => {
        try {
          localStorage.setItem("signupData", JSON.stringify(values));
          console.log("Signup successful: ", values);
          navigate("/");
        } catch (error) {
          console.error("There was an error signing up: ", error);
        }
      },
    });

  return (
    <div className={`${styles.flexCenter} relative `}>
      <div
        className={`${styles.flexCenter} ${styles.paddingX} box-shadow-2 z-10 flex-row w-[80vw] min-h-[80vh] h-[90vh] bg-darkPrimary/60 rounded-2xl backdrop-blur-xl `}
      >
        <div className={`${styles.flexCenter} flex-col w-full h-full`}>
          <h3
            className={`font-bold leading-[5rem] text-[2.4rem] md:text-[2.7rem] bg-gradient-to-tr from-green1 to-brightGreen1 text-transparent bg-clip-text `}
          >
            .note<span className={`text-white font-extrabold`}>me</span>
          </h3>
          <h2 className={`${styles.authHead} text-[5rem] leading-[5rem]`}>
            Signup
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`${styles.flexBetween} ${styles.paddingX} ${styles.authText} mt-[2rem] flex-col w-full`}
        >
          <div className={`w-full mt-[1rem]`}>
            <label htmlFor="email">Email</label>
            <input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              className={`${styles.authInput} ${
                errors.email && touched.email
                  ? "outline-red-600"
                  : "outline-blue"
              }`}
              type="email"
              id="email"
            />
            {errors.email && touched.email ? (
              <div className="text-red-600">{errors.email}</div>
            ) : null}
          </div>
          <div className={`w-full mt-[1rem]`}>
            <label htmlFor="password">Password</label>
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your Password"
              className={`${styles.authInput} ${
                errors.password && touched.password
                  ? "outline-red-600"
                  : "outline-blue"
              }`}
              type="password"
              id="password"
            />
            {errors.password && touched.password ? (
              <div className="text-red-600">{errors.password}</div>
            ) : null}
          </div>
          <div className={`w-full mt-[1rem]`}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              className={`${styles.authInput} ${
                errors.confirmPassword && touched.confirmPassword
                  ? "outline-red-600"
                  : "outline-blue"
              }`}
              type="password"
              id="confirmPassword"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="text-red-600">{errors.confirmPassword}</div>
            ) : null}
          </div>

          <button
            type="submit"
            on
            className={`${styles.btn1} text-white mt-[2rem]`}
          >
            Signup
          </button>
          <hr
            className={`border-white/10 border-[0.1rem] rounded-full w-full my-[2rem] mb-[1rem]`}
          />
          <p className={`text-white font-light`}>
            Already a user?{" "}
            <a href="/login" className={`font-medium text-green1 `}>
              Login here
            </a>{" "}
          </p>
        </form>
      </div>
      <div
        className={`bg-brightGreen2 w-[7rem] h-[7rem] absolute left-[20rem] bottom-0 z-0 rotate-[28deg] blur-[50px] rounded-full `}
      />
      <div
        className={`bg-white w-[3rem] h-[3rem] absolute left-[16rem] bottom-[5rem] z-0 rotate-[28deg] blur-[40px] rounded-full `}
      />
      <div
        className={`bg-white w-[6rem] h-[6rem] absolute right-[18rem] top-[4rem] z-0 blur-[40px] rounded-full `}
      />
      <div
        className={`bg-brightGreen1  w-[10rem] h-[10rem] absolute right-[20rem] top-0 z-0 blur-[70px] rounded-full `}
      />
    </div>
  );
};

export default Signup;
