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
      {/* {
        registerErrors.map((error, index) =>(
          <div key={index} className="bg-red-500 p-2 text-white my-2" >
            {error}
          </div>
        ))
      } */}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-black focus:border-transparent  text-black rounded-md my-2"
          placeholder="Username"
        />
        {
          errors.username && (
            <p className="text-red-500">Username is required</p>
          )
        }
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-black focus:border-transparent  text-black rounded-md my-2"
          placeholder="Email"
        />
        {
          errors.email && (
            <p className="text-red-500">Email is required</p>
          )
        }
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-black focus:border-transparent  text-black rounded-md my-2"
          placeholder="Password"
        />
        {
          errors.password && (
            <p className="text-red-500">Password is required</p>
          )
        }
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Register
        </button>
      </form>
      {/* <p className="flex gap-x-2 justify-between">
        Already have an account? Signin
        </p> */}
    </div>

    </div>
  );
};

export default EmailLogin;