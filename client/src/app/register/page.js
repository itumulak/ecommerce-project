import React from "react"

import RegisterForm from "../../components/RegisterForm"

const page = () => {
    return (
        <div className="flex flex-row">
            <div className="w-1/2 h-screen hidden lg:block">
                <img src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826" alt="Placeholder Image" className="object-cover w-full h-full"/>
            </div>
            <div className="flex flex-col gap-8 lg:p-24 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h1>
                <RegisterForm />
            </div>
        </div>
    )
}

export default page