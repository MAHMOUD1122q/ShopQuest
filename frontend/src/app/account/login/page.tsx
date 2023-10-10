"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { LoginUser } from "@/services/login";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import ComponentLevelLoader from "@/components/Loader";
import Cookies from "js-cookie";

const initialFormData = {
  email: "",
  password: "",
};


export default function Login() {
  const { toast } = useToast()
  const [formData, setFormData] = useState(initialFormData);
  const {email,password} = formData;
  const {
    componentLevelLoader,
    setComponentLevelLoader,
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
  } = useContext(GlobalContext);

  
  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }


  const router = useRouter();

  const handleInput = (e) => {
    const {name,value} = e.target
    setFormData({...formData , [name] : value})
  }
const handleLogin = async (e) => {
  e.preventDefault();
  setComponentLevelLoader({ loading: true, id: "" });
  if (!email || !password) {
    return toast({
      variant: "destructive",
      title: "Something went wrong.",
      description: "All fields are required",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
  }
  const userData = {
    email,
    password
  }
  const data = await LoginUser(userData);
  
  if (data.success) {
    toast({
      variant:"success",
      description: "Login succesfully",
      action: <ToastAction altText="ok">ok</ToastAction>,
    })
    setIsAuthUser(true);
    Cookies.set("token", data?.token);
    localStorage.setItem("user", JSON.stringify(data?.user));
    setFormData(initialFormData);
    setComponentLevelLoader({ loading: false, id: "" });
    router.push("/");
  }
  else {
    toast({
      variant:"destructive",
      description: data.message,
      action: <ToastAction altText="ok">ok</ToastAction>,
    })
    setIsAuthUser(false);
    setFormData(initialFormData);
    setComponentLevelLoader({ loading: false, id: "" });
  }
}
useEffect(() => {
  if (isAuthUser) {
    router.push("/")
    toast({
      variant:"success",
      description: "your already signin",
      action: <ToastAction altText="ok">ok</ToastAction>,
    })
  };
}, [isAuthUser]);

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <form onSubmit={handleLogin}>
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>
              
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
              <div className=" relative">
                    <p className=" pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">
                      email
                    </p>
                    
                    <input type="email"
                    placeholder="Enter your email"
                    className="border placeholder-gray-400 focus:outline-none focus:border-orange-700 w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md" 
                    value={email}
                    name="email"
                    onChange={handleInput}
                    />
                  </div>
                  <div className=" relative">
                    <p className=" pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">
                      password
                    </p>
                    <input type="password"
                    placeholder="Enter your password"
                    className="border placeholder-gray-400 focus:outline-none focus:border-orange-700 w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md" 
                    value={password}
                    name="password"
                    onChange={handleInput}
                    />
                  </div>
                  <button
                    className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-orange-700 px-6 py-4 text-lg 
                      text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                      "
                      type="submit"
                      disabled={!isValidForm()}
                  >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Logging In"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Login"
                  )}
                  </button>
              </div>
              </form>
                <div className="w-[50%] h-[2px] bg-orange-600 mt-4 text-center"></div>
                <div className=" text-left mt-4 p-0  flex ">
                  <p>if you do not have account ?</p>
                  <Link href="/account/login" className="text-sky-500 ml-2 hover:text-sky-700 duration-300">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}