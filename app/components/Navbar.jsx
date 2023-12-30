"use client"
import React from 'react'
import Image from 'next/image';
import { toast } from 'react-toastify';
import { auth, db } from '../firebaseconfig/index'
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { LOGIN, LOGOUT, SET_USER_INFO } from '../store/reducers/UserReducer';
import "../globals.css";


const Navbar = () => {
    
    const dispatch = useDispatch()
    
    const userData = useSelector((state) => state.user)
    
    const provider = new GoogleAuthProvider();

    
    const fetchData = async (email, displayName) => {
        
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            
            dispatch(SET_USER_INFO(docSnap.data()))
            
            toast.success(`Welcome Back, ${displayName.split(" ")[0]}!`)
        } else {
            try {
                
                await setDoc(doc(db, "users", email), {
                    name: displayName,
                    email: email
                });
                
                dispatch(SET_USER_INFO({
                    name: displayName,
                    email: email,
                }))
                
                toast.success(`Welcome Back, ${displayName.split(" ")[0]}!`)
            } catch (e) {
                console.log(e);
                
                toast.error("Error: Something Went Wrong!")
            }
        }
    }

    
    const signIn = () => {
        
        signInWithPopup(auth, provider)
            .then((result) => {
                
                const { user } = result;
              
                const { email, displayName, photoURL } = user;
                
                dispatch(LOGIN({ email: email, displayName: displayName, photoURL: photoURL }))
                
                fetchData(email, displayName);
            })
            .catch((error) => {
                
                console.log("Error ===> ", error);
                toast.error("Error: Something Went Wrong!")
            });
    };

    
    const logout = () => {
        dispatch(LOGOUT())
        
        toast.success(`See you again, ${userData?.user?.displayName?.split(" ")[0]}!`)
    }

    return (
        <>
            <div className='flex justify-between items-center mt-0 sticky top-0 bg-black bg-opacity-60 w-full px-6 py-4'>
                <h1 className='text-lg font-extrabold italic'>Top News</h1>
                {
                    !userData?.isAuth ? (
                        <button onClick={signIn} className='px-4 py-1 rounded-md bg-blue-200 text-xs md:text-sm'>Login</button>
                    ) : (
                        <div className='flex items-center'>
                            <Image src={userData?.user?.photoURL} alt='dp' width={30} height={30} className='rounded-full mr-2' />
                            <button onClick={logout} className='px-4 py-1 rounded-md bg-blue-200 text-xs md:text-sm'>Logout</button>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Navbar