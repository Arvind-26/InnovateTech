import Image from "next/image"
import { useRouter } from "next/router"
import Review from "../components/Review"
import React, { useContext, useState } from 'react';
import mongoose from "mongoose"
import AppContext from '../context/AppContext';
import img from '../../public/favicon.ico'
import product from '../models/product'
import Link from 'next/link'
import Head from "next/head";


export default function Detail({ data }) {
  const [loading, setLoading] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  let router = useRouter()
  const { sharedValues } = useContext(AppContext);
  let img, name, price, desc

  data.products.forEach(element => {
      img = element.img
      name = element.name
      price = element.price
      desc = element.desc
  })

  async function senddata() {
    setLoading(true)
    document.getElementById("addincart").disabled = true;
    var fulldata = [
      {
        "user": sharedValues.value2,
        "carts": [
          { "name": name, "photo": img, "price": price }
        ]
      }
    ]
    await fetch(`${API_URL}/api/addcart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fulldata),
    })
    await router.push({
      pathname: '/addtocart',
    });
  }

  function buy() {
    setTimeout(() => {
      document.getElementById("order").classList.toggle("hidden")
    }, 5000);
    document.getElementById("order").classList.toggle("hidden")
  }

  return (
  <>
    <Head>
      <title>Product</title>
      <link rel="icon" href={img.src} sizes="any" />
    </Head>
    <div id='order' className=" hidden flex justify-center items-center text-5xl font-bold p-5">
      ORDER PLACED
    </div>
    <main className="flex flex-col md:flex-row md:py-10 p-10 md:px-10 w-auto m-8 md:my-14 md:mx-48 rounded-xl border-2 border-[#d30a03] gap-6">
      <div className="flex md:w-1/2">
        <Image alt="Product" priority="high" className=" md:h-96 md:w-96" src={img} width={500} height={500} />
      </div>
      <div className="flex flex-col md:w-1/2 gap-5">
        <label htmlFor="" className=" font-bold text-3xl">{name}</label>
        <label htmlFor="" className="">{desc}</label>
        <label htmlFor="" className=" text-2xl">₹{price}</label>
        <span className="flex flex-col md:flex-row md:items-center">
          {sharedValues.value1 ? <>
            <button className=" text-white bg-[#d30a03] w-32 rounded-2xl py-1 px-5 text-xl mr-4" onClick={buy}>Buy Now</button>
            {!loading?<button id="addincart" className=" text-white w-44 bg-[#d30a03] rounded-2xl py-1 px-5 text-xl mt-2 md:mt-0" onClick={senddata}>Add to cart</button>:
            <div
            className="mt-2 ml-2 md:mt-0 md:ml-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
            >
          </div>}</>
          : <Link href={"/login"}><button className=" text-white bg-[#d30a03] rounded-2xl py-1 px-5 text-xl mt-2 md:mt-0" onClick={senddata}>Add to cart</button></Link>}
        </span>
      </div>
    </main>
    <Review data_get={data} />
  </>
  )
}

export async function getServerSideProps(context) {
  const url = context.req.url
  let url_arr = url.split("=")
  let id = url_arr[1]
  let ful = [{"id" : id}]
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const product = await fetch(`${API_URL}/api/getproducts` ,{
    method : 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    'User-agent': 'learning app',
    },
    body: JSON.stringify(ful),
  })
  const data = await product.json()

  return {
      props: { data }
    }
}