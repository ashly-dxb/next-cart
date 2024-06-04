"use client";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { Eye, EyeSlash } from "react-bootstrap-icons";

import styles from "../../container.module.css";
import Layout from "../components/MyLayout";
import { useRouter } from "next/navigation";
import Link from "next/link";

import LoginForm from "../components/LoginForm";
// import { doCredentialLogin } from "../actions";
import { doCredentialLogin } from "@/app/actions";

export default function Login() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "ashlythomas@gmail.com",
    password: "abcd1234",
    showPassword: false,
  });

  const [error, setError] = useState("");
  // const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const handleClickShowPassword = () => {
    setCredentials({
      ...credentials,
      showPassword: !credentials.showPassword,
    });
  };

  const validateForm = () => {
    let errors = {};

    if (!credentials.email) {
      errors.email = "Email is required";
    }

    if (!credentials.password) {
      errors.password = "Password is required";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  async function onSubmit(event) {
    event.preventDefault();

    validateForm();
    if (!isFormValid) {
      return false;
    }

    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      console.log("formData:", formData);

      const response = await doCredentialLogin(formData);
      console.log("response:", response);

      if (response.error) {
        setError(response.error.message);
      } else {
        router.push("/home");
      }
    } catch (e) {
      console.error(e);
      setError("Invalid credentials!");
    }
  }

  return (
    <Layout>
      <div
        className={`max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer} border-2`}
      >
        <div className="max-w-2xl m-auto mb-8 mt-4">
          <h3 className={`${styles.pageHeading} text-2xl`}>
            {isLoading ? "Please wait..." : "Login"}
          </h3>
        </div>

        <div className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md">
          <div className="col-span-2">
            <LoginForm />
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
        >
          <div className="grid grid-cols-2 gap-4 max-w-2xl m-auto">
            <div className="col-span-2">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                placeholder="Enter your email"
                className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                autoComplete="off"
              />

              {false ? (
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              ) : (
                ""
              )}

              {errors.email && (
                <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="col-span-2">
              <label htmlFor="password">Password</label>
              <input
                type={credentials.showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                placeholder="Enter your password"
                className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                autoComplete="off"
              />

              <div className={`${styles.pViewer}`}>
                <i
                  className="fa fa-eye-slash"
                  aria-hidden="true"
                  onClick={handleClickShowPassword}
                >
                  {credentials.showPassword ? (
                    <EyeSlash
                      title="hide"
                      color="royalblue"
                      size={24}
                      className="m-2"
                    />
                  ) : (
                    <Eye
                      title="show"
                      color="royalblue"
                      size={24}
                      className="m-2"
                    />
                  )}
                </i>
              </div>
              {errors.password && (
                <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="col-span-2 text-right">
              {error !== "" ? (
                <span className="text-left bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-2 mb-3 rounded relative">
                  {error}
                </span>
              ) : (
                ""
              )}
              <button
                type="submit"
                className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32"
              >
                Login &nbsp;
                <FontAwesomeIcon
                  id="111119999"
                  icon={isLoading ? faSpinner : faRefresh}
                  className="fa spinner"
                  alt="Refresh"
                  title="Refresh"
                />
              </button>
            </div>
          </div>
        </form>

        <div className="grid grid-cols-2 gap-4 max-w-2xl m-auto">
          <div className="col-span-2">
            <Link href="/users/SignUp">Sign Up</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
