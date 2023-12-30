"use client"
import { useSelector } from "react-redux"
import Dashboard from "./components/Dashboard"
import './globals.css'

export default function Home() {
 
  const userData = useSelector((state) => state.user)

  return (
    <div className="mt-4">
      {
        !userData?.isAuth ? (<h1 className="text-center italic font-bold">Please Login First!</h1>)
          : <Dashboard />
      }
    </div>
  )
}
