import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>();//username.current will store the input field thats a html element hence this tag being used to specify
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try{
          await axios.post("https://brainity-server.vercel.app/api/v1/signup",{
            username: username,
            password: password
        })
        alert("Signed Up")
        navigate("/signin")
        }catch(e){
          console.error(e)
          alert("Signup Failed User Exists!")
        }   
    }

    return <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-100">
    <div className="flex flex-col min-h-106 justify-center items-center bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <h1 className="text-4xl font-bold text-purple-900 mb-8">Sign Up</h1>
      <div className="w-full space-y-5">
        <div className="space-y-2">
          <Input reference={usernameRef} placeholder="Username" type="text" />
          <Input reference={passwordRef} placeholder="Password" type="password" />
        </div>
        <div className="flex justify-center">
          <Button loading={false} variant="primary" text="Sign Up" size="lg" onClick={signup}/>
        </div>
      </div>
      <p className="mt-6 text-gray-600">
        Already have an account?{" "}
        <a href="/signin" className="text-purple-700 hover:text-purple-900 font-semibold"> Sign In </a>
      </p>
    </div>
  </div>
}