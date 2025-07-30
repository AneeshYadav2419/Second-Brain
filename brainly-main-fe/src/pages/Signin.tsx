// import { Button } from "../components/Button";
// import { Input } from "../components/Input";
// import { useRef } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../config";
// import { useNavigate, Link } from "react-router-dom"; // Import Link

// export function Signin() {
//   const usernameRef = useRef<HTMLInputElement>();
//   const passwordRef = useRef<HTMLInputElement>();
//   const navigate = useNavigate();

//   async function signin() {
//     const username = usernameRef.current?.value;
//     const password = passwordRef.current?.value;

//     try {
//       const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
//         username,
//         password,
//       });

//       const jwt = response.data.token;
//       localStorage.setItem("token", jwt);
//       navigate("/");
//     } catch (err) {
//       alert("Signin failed. Please check credentials.");
//     }
//   }

//   return (
//     <div className="h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center">
//       <div className="bg-white shadow-2xl rounded-xl px-8 py-10 w-96 max-w-full">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
//         <p className="text-sm text-center text-gray-500 mb-6">Sign in to continue</p>

//         <div className="space-y-4">
//           <Input reference={usernameRef} placeholder="Username" />
//           <Input reference={passwordRef} placeholder="Password" />
//         </div>

//         <div className="pt-6">
//           <Button
//             onClick={signin}
//             loading={false}
//             variant="primary"
//             text="Sign In"
//             fullWidth={true}
//           />
//         </div>

//         {/* Add Sign Up link below the button */}
//         <p className="text-sm text-center text-gray-600 mt-6">
//           Create Account?{" "}
//           <Link to="/signup" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// pages/Signin.tsx
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Trigger native validation UI; if invalid, stop here
    if (!e.currentTarget.reportValidity()) return;

    const username = usernameRef.current!.value.trim();
    const password = passwordRef.current!.value;

    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/");
    } catch (err) {
      alert("Signin failed. Please check credentials.");
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-xl px-8 py-10 w-96 max-w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign in to continue</p>

        <form onSubmit={onSubmit} noValidate={false}>
          <div className="space-y-4">
            <Input reference={usernameRef} placeholder="Username" required />
            <Input reference={passwordRef} placeholder="Password" type="password" required />
          </div>

          <div className="pt-6">
            {/* Your Button must forward the `type` prop to a <button> */}
            <Button
              type="submit"
              loading={false}
              variant="primary"
              text="Sign In"
              fullWidth={true}
            />
          </div>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Create Account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

