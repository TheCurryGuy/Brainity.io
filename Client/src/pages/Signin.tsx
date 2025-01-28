import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please provide both username and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        username,
        password,
      });

      // Handle success
      localStorage.setItem("token", response.data.token);
      alert("Signed In");
      navigate("/home");
    } catch (error) {
      // Handle error
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        alert("Login Failed - Incorrect Credentials");
      } else {
        alert("An unexpected error occurred.");
        console.error(error);
      }
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="flex flex-col min-h-106 justify-center items-center bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-purple-900 mb-8">Sign In</h1>
        <div className="w-full space-y-5 ">
          <div className="space-y-2">
            <Input reference={usernameRef} placeholder="Username" type="text" />
            <Input reference={passwordRef} placeholder="Password" type="password" />
          </div>
          <div className="flex justify-center">
            <Button loading={false} variant="primary" text="Sign In" size="lg" onClick={signin}/>
          </div>
        </div>
        <p className="mt-6 text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-700 hover:text-purple-900 font-semibold"> Sign Up </a>
        </p>
      </div>
    </div>
  );
}