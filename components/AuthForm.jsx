"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "@/app/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isRegister) {
      if (username.length < 5 || !email.includes("@") || password.length < 5) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      if (username.length < 5 || password.length < 5) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  }, [username, email, password]);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (isRegister) {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();

      setEmail("");
      setPassword("");
      setUsername("");
    } else {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      router.push("/products");

      dispatch(
        setLogin({
          userId: data.userId,
          username: data.username,
          email: data.email,
          token: data.token,
        })
      );

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", data.token);

      setEmail("");
      setPassword("");
      setUsername("");
    }
  };

  return (
    <section className="flex p-10 flex-col items-center w-screen">
      {isRegister ? (
        <div className="mb-10">
          <h1 className="text-2xl">Sign up</h1>
          <p>
            Already have an account?{" "}
            <span
              className="text-rose-700 cursor-pointer"
              onClick={() => setIsRegister((prevState) => !prevState)}
            >
              Sign in.
            </span>
          </p>
        </div>
      ) : (
        <div className="mb-10">
          <h1 className="text-2xl">Sign in</h1>
          <p>
            Doesn't have an account?{" "}
            <span
              className="text-rose-700 cursor-pointer"
              onClick={() => setIsRegister((prevState) => !prevState)}
            >
              Sign up.
            </span>
          </p>
        </div>
      )}
      <form
        className="flex flex-col items-center w-full"
        onSubmit={submitHandler}
      >
        <div className="w-full lg:w-1/2 items-center text-center">
          <input
            className="w-full p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {isRegister && (
          <div className="w-full lg:w-1/2 items-center text-center">
            <input
              className="w-full p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
              type="email"
              id="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        <div className="w-full lg:w-1/2 items-center text-center">
          <input
            className="w-full p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={`w-full lg:w-1/2 text-white rounded-md outline-none p-3 ${
            !isValid ? "bg-stone-500" : "bg-black"
          }`}
          type="submit"
          disabled={!isValid}
        >
          {isRegister ? "Sign up" : "Sign in"}
        </button>
      </form>
    </section>
  );
};

export default AuthForm;
