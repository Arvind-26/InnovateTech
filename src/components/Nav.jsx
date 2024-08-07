import 'tailwindcss/tailwind.css'
import React from 'react';
import img from '../../public/menu.png'
import imgp from '../../public/profie.png'
import Link from 'next/link'
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import '../style/style.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function expand() {
    document.getElementById("menu").classList.toggle("hidden")
}

const Nav = () => {
    const { sharedValues } = useContext(AppContext);
    const tl = gsap.timeline()
    useGSAP(()=>{
        tl.from("nav",{
            y:-50,
            duration: 0.2
        })
        tl.from("nav div span, nav div ul , nav div button, nav > img",{
            y:-50,
            duration:0.5,
            stagger:0.2
        })
    })

    return (
        <nav className="flex justify-between sticky top-0 z-10 w-full shadow-xl items-center p-2 px-6 text-xl bg-white">
            <div className="flex p-1">
                <span className="text-3xl">Tech</span>
                <span className="text-[#d30a03] font-bold text-3xl">Pulse</span>
                <ul className="md:flex gap-6 ml-10 hidden items-center">
                    <Link href={'/'}><li className=" hover:underline">Home</li></Link>
                    {sharedValues.value1 ? <Link href={'/addtocart'}><li className=" hover:underline">Cart</li></Link> : <></>}
                    <Link href={'#about'}><li className=" hover:underline">About</li></Link>
                </ul>
            </div>
            {sharedValues.value1 ? <Link href={'/profile'}><img className="hidden md:block h-8" src={imgp.src} alt="" /></Link> :
                <div className="md:flex gap-4 hidden">
                    <Link href={"/login"}>
                        <button className="bg-[#d30a03] border-2 p-1 border-[#d30a03] text-white px-4 rounded-xl">Login</button>
                    </Link>
                    <Link href={"/signup"}>
                        <button className="text-[#d30a03] border-2 p-1 border-[#d30a03] px-3  rounded-xl">Signup</button>
                    </Link>
                </div>}
            <img className="h-8 md:hidden" src={img.src} alt="" onClick={expand} />
            <div id="menu" className="menubaron menubaroff hidden absolute right-2 top-12 px-8 py-2 shadow-xl bg-white">
                <ul className="flex flex-col justify-center items-center gap-y-2">
                    <Link href={"/"}><li onClick={expand}>Home</li></Link>
                    {sharedValues.value1 ? <Link href={'/addtocart'}><li onClick={expand}>Cart</li></Link> : <></>}
                    <li>About</li>
                    {sharedValues.value1 ? <Link href={"/profile"}><li onClick={expand}>Profile</li></Link> :
                        <><Link href={"/login"}><li onClick={expand}>Login</li></Link>
                            <Link href={"/signup"}><li onClick={expand}>Signup</li></Link></>}
                </ul>
            </div>
        </nav>
    )
}

export default Nav
