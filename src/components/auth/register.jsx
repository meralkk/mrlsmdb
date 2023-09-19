import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./register.scss";
import { BsEye, BsEyeSlash } from "react-icons/bs"; // React Icons içinden göz simgelerini içe aktarın
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false); // Parolanın görünürlüğünü yönetmek için bir state

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Göz simgesine tıklandığında parola görünürlüğünü değiştirir
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Enter a valid username address"),
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email address is required"),
      password: Yup.string()
        .min(8, "Please provide at least 8 chracters")
        .matches(/[a-z]+/, "One lowercase character")
        .matches(/[A-Z]+/, "One uppercase character")
        .matches(/\d+/, "One number")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .required("Please re-enter your password")
        .oneOf([Yup.ref("password"), null], "Password fields do not match"),
    }),
    onSubmit: (values) => {
      // Form gönderildiğinde yapılacak işlemler (örneğin, kullanıcı kaydı)
      console.log(values);
    },
  });

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={formik.handleSubmit}>
        <div className="header">
          <div className="header-title">Register</div>
        </div>
        <div className="inputs">
          <input
            type="text"
            placeholder="User name"
            id="username"
            name="username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error-message">{formik.errors.username}</div>
          ) : null}
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            {...formik.getFieldProps("email")}
          />
          <div className="password-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <BsEyeSlash /> : <BsEye />}{" "}
            {/* Göz simgesini tıklanınca parola görünürlüğünü */}
          </div>

          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="password-container">
          {" "}
          {/* Parola alanını sarmalayan bir konteyner */}
          <input
            type={showPassword ? "text" : "password"} // Parola görünürlüğünü kontrol etmek için tip
            placeholder="Password"
            id="password"
            name="password"
            {...formik.getFieldProps("password")}
          />
          <div className="password-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <BsEyeSlash /> : <BsEye />}{" "}
            {/* Göz simgesini tıklanınca parola görünürlüğünü */}
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="password-container">
          {" "}
          {/* Parola alanını sarmalayan bir konteyner */}
          <input
            type={showPassword ? "text" : "password"} // Parola görünürlüğünü kontrol etmek için tip
            placeholder="Confirm password"
            id="confirmPassword"
            name="confirmPassword"
            {...formik.getFieldProps("confirmPassword")}
          />
          <div className="password-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <BsEyeSlash /> : <BsEye />}{" "}
            {/* Göz simgesini tıklanınca parola görünürlüğünü */}
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error-message">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <button className="register" type="submit">
          Register
        </button>
        <p>Do you have an account?</p>
        <button className="options" type="submit">
          <Link to="/login">Log in</Link>
        </button>
      </form>
    </div>
  );
};

export default Register;
