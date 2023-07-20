'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
interface Props {

}

type LoginFormData = {
  email: string,
  password: string
};

export const LoginForm: React.FC<Props> = ({ }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginFormData>();
  const handleLogin: SubmitHandler<LoginFormData> = async data => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3005/auth/login', {
        email: data.email,
        password: data.password
      });
      console.log(response);
      if (response) {
        localStorage.setItem('token', response.data.token);
        router.push('/auth/base-equipments');
      }

    } catch (error) {
      console.log(error);
      setLoading(false);
      setError('Credenciales inválidas');
      setTimeout(() => {
        setError('');
      }
        , 3000);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl leading-9 tracking-tight text-center text-black">
          Proyecto Aluvión
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
            Correo Electrónico
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              required
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
              Contraseña
            </label>
          </div>
          <div className="mt-2">
            <input
              {...register("password")}
              required
              autoComplete="current-password"
              type="password"
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="mt-5 flex w-full justify-center rounded-mdtext-white bg-[#db6e59] rounded hover:bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {errors.password && <span>Este campo es requerido</span>}
            {errors.email && <span>Este campo es requerido</span>}
            Acceder
          </button>
        </div>
        {
          error && (
            <div className="mt-5 flex w-full justify-center p-2
            bg-red-500 bg-opacity-50 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
          ">
              {error}
            </div>
          )
        }


      </div>

    </form>

  );
};
