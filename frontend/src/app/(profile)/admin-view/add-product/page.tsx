"use client"

import Sidebar from "@/components/sidebar";
import Image from "next/image";
import { useState } from "react";


const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};


export default function AddProduct() {
  const [formData, setFormData] = useState(initialFormData);

  const [imagesPreview, setImagesPreview] = useState([]);


  const onChange = async (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
  <>
  <Sidebar/>
    <div className=" pt-12 border px-16 mt-4 w-[800px] ml-[400px]">
      <div>
        <h2 className=" text-2xl font-bold mb-4">Create new product</h2>
        <h2 className="mb-1 font-semibold">Upload Product Images</h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full">
            <input
              className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-8"
              type="file"
              multiple
              onChange={onChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2 my-5">
          {imagesPreview?.map((img) => (
            <Image
              src={img}
              key={img}
              alt="Preview"
              className="col-span-1 object-contain shadow rounded border-2 border-gray p-2 h-full w-full"
              width="50"
              height="50"
            />
          ))}
        </div>
        <div>
          <p>Name</p>
          <input className=" bg-slate-100 border border-slate-200 h-[35px]" type="text" />
        </div>
        <div >
          <p>description</p>
          <input  className=" bg-slate-100 border border-slate-200 h-[80px] w-[450px]" type="text" />
        </div>
        <div className=" inline-block">
          <p>price</p>
          <input  className="bg-slate-100 border border-slate-200 h-[35px]" type="number" />
        </div>
        <div className=" inline-block ml-[140px]">
          <p>model</p>
          <input  className=" bg-slate-100 border border-slate-200 h-[35px]" type="text" />
        </div>
        <div className=" inline-block">
          <p>stock</p>
          <input  className=" bg-slate-100 border border-slate-200 h-[35px]" type="number" />
        </div>
        <div className=" inline-block  ml-[140px]">
          <p>priceDrop</p>
          <input  className=" bg-slate-100 border border-slate-200 h-[35px]" type="number" />
        </div> 
        <div className="inline-flex h-[35px] items-center ml-[10px]">
          <input  className=" bg-slate-100 border border-slate-200" type="checkbox"/>
          <p className="ml-1">onSale</p>
        </div>
        <div className="inline-block">
          <p>sku</p>
          <input  className=" bg-slate-100 border border-slate-200 h-[35px] mb-8" type="text" />
        </div>
        <div className="inline-block ml-[140px]">
          <p>category</p>
          <select className="bg-slate-100 border border-slate-200 h-[35px] w-[250px]" name="" id="">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
        <div className=" inline-block">
          <p>status</p>
      <select  className="bg-slate-100 border border-slate-200 h-[35px] w-[250px]" name="" id="">
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
      </select>
        </div>
        <div className=" inline-flex h-[35px] items-center ml-[10px]">
          <input className=" bg-slate-100 border border-slate-200 " type="checkbox" />
          <p className="ml-1">Availability</p>
        </div>
        <div className=" inline-block ml-[10px]">
          <p>sizes</p>
          <select className="bg-slate-100 border border-slate-200 h-[35px] w-[250px]" name="" id="">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
        <div className=" inline-block">
          <p>color</p>
          <select className="bg-slate-100 border border-slate-200 h-[35px] w-[250px]" name="" id="">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
        <div className=" inline-flex h-[35px] items-center ml-[10px]">
          <input  className=" bg-slate-100 border border-slate-200" type="checkbox" />
          <p className="ml-1">feature</p>
        </div>
        <button className="block mx-auto py-2 px-24 hover:bg-orange-500 duration-300 bg-orange-700 text-white my-8">Create Product</button>
      </div>
    </div>
  </>
  )
}
