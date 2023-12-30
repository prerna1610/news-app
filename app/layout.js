"use client"
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
import Store from './store/Store'
import { Provider } from 'react-redux'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <ToastContainer position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
        
        <Provider store={Store}>
          
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
