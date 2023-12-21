"use client"
import {useState,useEffect} from 'react'
import { IoSearch } from "react-icons/io5";
import Link from 'next/link'
import { SiBookstack } from "react-icons/si";
import { TbBooks,TbBooksOff } from "react-icons/tb";
import Btn from "./button";
import { IoBookSharp } from "react-icons/io5";
import { TfiStatsUp } from "react-icons/tfi";
import { useUser} from '@clerk/nextjs'
import { IoIosNotifications } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";


export default function SideBar(){
    const {isSignedIn,user}=useUser()
    const [books,setBooks]=useState([])
    

    useEffect(()=>{
       
        fetch('/api/browseAllBooks')
        .then(res=>res.json())
        .then(res=>{
            setBooks(res)
        })
        if (user){
            fetch('/api/saveUser',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(user)
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
            })
            
        }
        console.log(user,"user")

    },[isSignedIn,user])


    const finalBookTitle=(title)=>{
        if(title.length>13){
            return title.slice(0,13)+"..."
        }
        else{
            return title
        }
    }

    return(
        <div className="w-[16.3%]">
            <div className="Navbar w-[14%] h-screen p-2 bg-black gap-2 text-gray-200 flex flex-col fixed ">
                <div className=' bg-[#1b1b1b] rounded-xl p-2'>
                    {/* {
                        (isSignedIn) &&
                        (
                            <div className='flex flex-col justify-center h-fit items-center '>
                                <img src={user.imageUrl}  className="rounded-[100%] p-3" alt="" />
                                <div className="flex gap-5 items-center pb-2 text-xl font-medium">
                                    <Link href="/dashboard">
                                        {user.firstName}
                                    </Link>
                                    <UserButton/>
                                </div>
                            </div>   
                        )
                    } */}
                        <Link href="/dashboard/getABook">
                            <Btn
                                title="Home"
                                icon={<GoHomeFill size={20}/>}
                                />
                        </Link>
                        <Link href="/dashboard/getABook">
                            <Btn
                                title="Search"
                                icon={<IoSearch size={20}/>}
                                />
                        </Link>
                    </div>

                <div className="flex flex-col bg-[#1b1b1b] rounded-xl p-2 text-[90%] min-[1535px]:text-[100%] gap-2">
                    <Link href="/dashboard/booksBorrowed">
                        <Btn
                            title="Books Borrowed"
                            icon={<TbBooks size={20}/>}
                            >
                        </Btn>
                    </Link>
                    <Link href="/dashboard/booksLent">
                        <Btn
                            title="Books Lent"
                            icon={<TbBooksOff size={20}/>}
                            />
                    </Link>

                    <Link href="/dashboard/lendBooks">
                        <Btn
                            title="Lend a Book"
                            icon={<IoBookSharp size={20}/>}
                            />
                    </Link>

                    <Link href="/dashboard/analytics">
                        <Btn
                            title="Analytics"
                            icon={<TfiStatsUp size={20}/>}
                            />
                    </Link>
                    <Link href="/dashboard/profilePage">
                        <Btn
                            title="Profile"
                            icon={<RxAvatar size={20}/>}

                            />
                    </Link>
                    <Link href="/dashboard/profilePage">
                        <Btn
                            title="Notifications"
                            icon={<IoIosNotifications size={20}/>}
                            />
                    </Link>

                </div>
                <div className=' bg-[#1b1b1b] rounded-xl h-full p-2'>
                        <Link href="/dashboard">
                            <Btn
                                title="Your Collection"
                                icon={<SiBookstack size={20}/>}
                                />
                        </Link>

                        <div className="pl-4 min-[1919px]:gap-1 flex flex-col font-semibold text-[13px] fixed overflow-hidden opacity-80" key={"bookss"}>
                            <div>

                        {
                            
                            books.map((book,index)=>
                            (user && book.owner==user.id) && 
                            (
                                <li key={book._id}>
                                    {finalBookTitle(book.title).toUpperCase()}
                                </li>
                                )
                                )
                            }
                            </div>

                        </div>
                </div>
            </div>  
        </div>
    )
}