import "./index.scss";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useGlobalContext from "../../context/useGlobalContext";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { hasGrantedAllScopesGoogle } from "@react-oauth/google";
import Wave from "../../UI/Wave";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import sendServer from "../server";

import { isExpired, decodeToken } from "react-jwt";
export default function Login() {
  let navigate = useNavigate();
  const [user, setuser] = useState();
  const [token, settoken] = useState("");
  const [password, setpassword] = useState();
  const [textOfBotton, settextOfBotton] = useState("Log in");
  const [successLogin, setsuccessLogin] = useState(false);
  const [showNav, setshowNav] = useState(false);
  const [messageAboutLogin, setmessageAboutLogin] = useState();
  const [event, setEvent] = useState(false);
  const { context } = useGlobalContext();
  const clientId =
    "436338134454-tgnq51gda1j2o6klajijdecv8soc6nhr.apps.googleusercontent.com";

  //localStorage.removeItem("token")
  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   navigate("/app" + "/myMoney", { replace: true });
    // }
    const followLogin = async (x) => {
      settoken(x);
      var user = decodedToken;
      console.log(user);
      if (user === null || user === "") {
        return;
      }
      console.log(user);
      var responsive = await sendServer(context.server, "/auth", {
        user,
      });
      console.log(responsive);
      if (responsive.error === false) {
        if (responsive.data.isNewUser === true) {
          localStorage.getItem("tokenInf", decodedToken);
          navigate("/app" + "/myMoney/form", { replace: true });
        } else {
          navigate("/app" + "/myMoney", { replace: true });
        }
      } else if (responsive.error === true) {
        alert(responsive.data);
      }
    };
  }, [token]);

  // console.log(decodedToken)
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      setshowNav(true)
      followLogin(credentialResponse.credential);
    },
    onError: () => {
      setmessageAboutLogin("Error in login 0auth");
    },
  });
  const followLogin = async (x) => {
    var user = decodeToken(x);
    console.log(user);
    if (user === null || user === "") {
      return;
    }
    console.log(user);
    var responsive = await sendServer(context.server, "/auth", {
      user,
    });
    console.log(responsive);
    if (responsive.error === false) {
      if (responsive.data.isNewUser === true) {
        localStorage.setItem("tokenInf", JSON.stringify(user));
        navigate("/app" + "/myMoney/preRegister", { replace: true });
      } else {
        localStorage.setItem("token", responsive.data.user);
        navigate("/app" + "/myMoney", { replace: true });
      }
    } else if (responsive.error === true) {
      alert(responsive.data);
    }
  };

  const sendData = () => {
    setshowNav(true)
    settextOfBotton("Sending data...");
    if (!user) {
      setmessageAboutLogin("Invalid username");
      setshowNav(false)
      return true;
    }
    if (!password) {
      setmessageAboutLogin("Missing password");
      setshowNav(false)
      return true;
    }
    if (password === "812" && user === "Danna") {
      navigate("/event" + "?name=Danna&id=812D301313", { replace: true });
    }

    axios
      .post(context.server + "/login", {
        user: user,
        pass: password,
      })
      .then((res) => {
        if (res.data.extra === 205) {
          localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            navigate("/app" + "/myMoney", { replace: true });
          }, 200);
        }
        setmessageAboutLogin(res.data.data);
        setshowNav(false)
      })
      .catch((err) => {
        console.log(err);
        setmessageAboutLogin("Error: " + err.request.status);
        setshowNav(false)
      });
  };
  if (event) {
    return <MainEvent />;
  }
  return (
    <>
      <div className="relative h-[40px] text-3xl font-bold underline flex justify-center items-center  border-blue-500 border-b-[2px] pb-2 space-x-4 overflow-hidden">
        <div className="pt-0 mt-0"></div>
        <motion.p
          initial={{ x: "100vh", opacity: 0 }}
          animate={{ x: 0, opacity: 5 }}
          exit={{ x: "-100vw", opacity: 0 }}
          transition={{
            type: "spring",
            duration: 2,
          }}
          className="absolute blockAllSelect underline mt-0 pt-[4px] text-black"
        >
          MyMoney
        </motion.p>
      </div>
      <div className="bg-white  backGroundImage h-screen flex mt-[-40px] justify-center items-center ">
        {
          // <Wave className="absolute w-[screen] h-auto bottom-0"  />
        }
        <div className="min-w-[350px]">
          <div className="relative z-[1] overflow-x-hidden w-full max-w-md p-8 space-y-3 bg-slate-50 border-[1px] border-cyan-600 rounded-xl 	">
            <div className="relative pb-5 pt-5 flex flex-col items-center justify-center">
              <div className="h-[50px] w-max flex items-center justify-center border-b-[1px] border-b-slate-800">
                <p className="pt-[37px] z-[1]  text-[60px] mb-[40px] initLogo">
                  M<span className="text-green-400">$</span>M
                </p>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendData();
              }}
            >
              <div className=" space-y-1 text-sm px-2">
                <label for="username" className="block text-black ">
                  Nombre de usuario:
                </label>
                <input
                  onChange={(e) => setuser(e.target.value)}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="inputLogin w-full px-4 py-3 removeOUTLINES rounded-md  hover:border-slate-600   "
                />
              </div>
              <div className="space-y-1 text-sm px-2 pt-1">
                <label for="password" className="block  text-black  ">
                  Contraseña:
                </label>
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="inputLogin w-full px-4 py-3 removeOUTLINES  rounded-md hover:border-slate-600 "
                />
                <div className="flex justify-end text-xs hover:underline ">
                  <a rel="noopener noreferrer ">Olvidaste la contraseña?</a>
                </div>
                <div className="h-7">
                  <p className=" text-blue-700 p-0 m-0 fontMessage">
                    {messageAboutLogin}
                  </p>
                </div>
              </div>
              <button
                onClick={() => sendData()}
                className="text-black w-full p-3 text-center  bg-cyan-200 border border-blue-900  rounded-full"
              >
                Log In
              </button>
              <div className="pt-3 ">
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign in with Google"
                  onSuccess={(res) => {
                    setshowNav(true)
                    settoken(res.credential);
                    followLogin(res.credential);
                  }}
                  onFailure={(res) => console.log(res)}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={(e) => console.log(e)}
                />
              </div>
            </form>
            {showNav && (
              <div className="absolute w-[500px] z-[0]  bg-slate-400 left-0 h-[3px] bottom-0 chargeLogin"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
