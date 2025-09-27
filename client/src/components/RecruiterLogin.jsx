import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState(false);

  const [isTextSubmited, setIsTextSubmited] = useState(false);

  const { setShowRecruiterLogin } = useContext(AppContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state == "Sign Up" && !isTextSubmited) {
      setIsTextSubmited(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.bosy.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center ">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
        action=""
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}{" "}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        {state === "Sign Up" && isTextSubmited ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <img
                  className="w-16 rounded-full"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                />
                <input
                  type="file"
                  hidden
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
              <p>
                Upload Company <br /> logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} />
                <input
                  className="outline-none text-sm"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} />
              <input
                className="outline-none text-sm"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Id"
                required
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} />
              <input
                className="outline-none text-sm"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </>
        )}

        {state === "Login " && (
          <p className="text-sm text-blue-600 cursor-pointer my-4">
            Forgot password?
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full rounded-full py-2 mt-4"
        >
          {state === "Login"
            ? "login"
            : isTextSubmited
            ? "create account"
            : "next"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={(e) => setShowRecruiterLogin(false)}
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
