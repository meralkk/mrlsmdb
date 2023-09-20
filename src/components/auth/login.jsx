import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './login.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // Parolanın görünürlüğünü yönetmek için bir state 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Göz simgesine tıklandığında parola görünürlüğünü değiştirir
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Enter a valid email address')
        .required('Email address is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      // Form gönderildiğinde yapılacak işlemler (örneğin, API isteği)
      console.log(values);
    },
  });

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={formik.handleSubmit}>
      <div className="header">
          <div className="header-title">Log in</div>
        </div>
        <div className='inputs'>
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="password-container"> {/* Parola alanını sarmalayan bir konteyner */}
          <input
            type={showPassword ? 'text' : 'password'} // Parola görünürlüğünü kontrol etmek için tip
            placeholder="Password"
            id="password"
            name="password"
            {...formik.getFieldProps('password')}
          />
          <div className="password-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />} {/* Göz simgesini tıklanınca parola görünürlüğünü */}
          </div>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="error-message">{formik.errors.password}</div>
        ) : null}
        <button className="login" type="submit">
          Login
        </button>
        <p>New to MRL's MDb?</p>
        <button className="options" type="submit">
        <Link to="/register">Register</Link>
        </button>
      </form>
    </div>
  );
};

export default Login;
