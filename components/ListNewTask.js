import React from "react";
import { HiPlusSm } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsCheck2 } from "react-icons/bs";

export default function ListNewTask({ data, deleteFoodsById }) {
  console.log(data);
  return (
    <div className=" container m-16">
      <div className="mx-auto max-w-lg">
        {data.map((lists) => (
          <div key={lists.id} className=" flex justify-between">
            <div>
              <p className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                {/* {lists.newtask} */}
                {lists._id}
              </p>
            </div>
            <div className=" ">
              <button className="p-2 m-1 bg-green-500 text-white rounded-sm">
                <span className=" text-white">
                  <BsCheck2 />
                </span>
              </button>
              <button
                className="p-2 py-2 bg-red-500 text-white rounded-sm"
                onClick={() => deleteFoodsById(lists._id)}
              >
                <span>
                  <RiDeleteBin5Fill />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
