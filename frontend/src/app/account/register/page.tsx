"use client"

import { useRouter } from "next/navigation"
import { useContext, useState } from "react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { RegisterNewUser }  from "@/services/register/index";
import { GlobalContext } from "@/context";
import ComponentLevelLoader from "@/components/Loader";


const initialFormData = {
  username: "",
  email: "",
  password: "",
};


export default function Register() {
  const { toast } = useToast()
  const [isRegistered, setIsRegistered] = useState(false); 
  const [formData, setFormData] = useState(initialFormData);
  const { pageLevelLoader, setPageLevelLoader} = useContext(GlobalContext);
  const {username,email,password} = formData;

  const router = useRouter()

  function isFormValid() {
    return formData &&
      formData.username &&
      formData.username.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  const handleInput = (e) => {
    const {name,value} = e.target
    setFormData({...formData , [name] : value})
  }
  const handleSubmit =  async (e) => {
    e.preventDefault();
    setPageLevelLoader(true);
    if (!email || !password) {
      return toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "All fields are required",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    if (password.length < 6) {
      return toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "password must be at least 6 characters",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    const userData = {
      username,
      email,
      password
    }
    const data = await RegisterNewUser(userData);
    if (data.success) {
      toast({
        variant:"success",
        description: "Register succesfully",
        action: <ToastAction altText="ok">ok</ToastAction>,
      })
      setFormData(initialFormData);
      setPageLevelLoader(false);
      setIsRegistered(true);
    }
    else {
      toast({
        variant:"destructive",
        description: data.message,
        action: <ToastAction altText="ok">ok</ToastAction>,
      })
      setFormData(initialFormData);
      setPageLevelLoader(false);
    }
  }
  return (
  <div className="bg-white relative">
    <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
      <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
        <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
          <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
            <form onSubmit={handleSubmit}>
              <h2 className="w-full text-4xl font-medium text-center font-serif">
                {isRegistered
                  ? "Registration Successfull !"
                  : "Sign up for an account"}
                  </h2>
                  {isRegistered ?(<button
                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide mt-2"
                onClick={()=>router.push('/account/login')}
                >
                  Login
                </button> ): 
                <>
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    <div className=" relative">
                      <p className=" pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">
                        username
                      </p>
                      <input type="text"
                      placeholder="Enter your username"
                      className="border placeholder-gray-400 focus:outline-none focus:border-orange-700 w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md" 
                      value={username}
                      name="username"
                      onChange={handleInput}
                      />
                    </div>
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
                  </div>
                  <button 
                    type="submit" 
                    className=" disabled:opacity-50 disabled:hover:bg-orange-700 inline-flex mt-4 w-full items-center justify-center bg-orange-700 hover:bg-orange-500 duration-300 px-6 py-4 text-lg text-white transition-all ease-in-out focus:shadow font-medium uppercase tracking-wide"
                    disabled={!isFormValid()}
                    >
                    {pageLevelLoader ? (
                      <ComponentLevelLoader
                        text={"Registering"}
                        color={"#ffffff"}
                        loading={pageLevelLoader}
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                </>
                }
            </form>
            <div className="w-[50%] h-[2px] bg-orange-600 mt-4"></div>
            <div className=" text-left mt-4 p-0 mr-40 flex ">
              <p>Already have an account ?</p>
              <a href="/account/login" className="text-sky-500 ml-2 hover:text-sky-700 duration-300 ">sign in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}