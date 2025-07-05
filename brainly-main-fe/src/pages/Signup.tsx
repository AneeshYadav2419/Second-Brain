import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password,
      });
      alert("Signed up successfully!");
      navigate("/signin");
    } catch (err) {
      alert("Signup failed. Try again.");
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-xl px-8 py-10 w-96 max-w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create an Account</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign up to continue to your dashboard</p>
        
        <div className="space-y-4 w-full">
          <Input reference={usernameRef} placeholder="Username" />
          <Input reference={passwordRef} placeholder="Password" />
        </div>

        <div className="pt-6">
          <Button
            onClick={signup}
            loading={false}
            variant="primary"
            text="Sign Up"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
