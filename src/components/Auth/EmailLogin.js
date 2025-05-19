import React from 'react';
// import { useAuth } from "../context/AuthContex";
import { useForm } from "react-hook-form";


const EmailLogin = ({ onLogin }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit = handleSubmit(async (values) => {
    signin(values)
  });

    //   const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  return (
    <div className="space-y-4">
      <div className="bg-zinc-100 border-zinc-700 max-w-md w-full p-10 rounded-md">
        {/* {signinErrors.map((error, index) => (
          <div key={index} className="bg-red-500 p-2 text-white my-2">
            {error}
          </div>
        ))} */}
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-black focus:border-transparent  text-black rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className=" mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          {/* Don't have an account? <Link to='/register' className="text-sky-500">Sign up</Link> */}
        </p>
      </div>
    </div>
  );
};

export default EmailLogin;