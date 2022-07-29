import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { HiPlusSm } from "react-icons/hi";
import ListNewTask from "./ListNewTask";

const taskState = {
  
  newtask: "",
};
const defaultMenuState = [];

export default function Inputs() {
  const [formNewTask, setFormNewTask] = useState(taskState);
  const [menuList, setMenuList] = useState(defaultMenuState);

  // const [isEdit, setIsEdit] = useState(false);

  const { newtask } = formNewTask;

  useEffect(() => {
    getMenuData();
  }, []);

  const getMenuData = async () => {
    try {
      const { data } = await axios.get("/api/formaddnewtask/");
      setMenuList(data?.data);
    } catch (error) {
      console.log(error);
    }
  }; //ลิสเมนู

  const setTaskData = async () => {
    try {
      await axios.post("/api/formaddnewtask/", formNewTask);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "พังยับ",
        text: "พังอะครับพรี่ ติดต่อแอดมินด่วนๆ!",
      });
      return true;
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const validationError = validationGroup();
    if (validationError) return;
    const setDataError = await setTaskData();
    if (setDataError) return;
    await Swal.fire({
      icon: "success",
      title: "เพิ่มสำเร็จ",
      showConfirmButton: false,
      timer: 2000,
    });
    await getMenuData();
  };
  const validationGroup = () => {
    if (!taskState) {
      return Swal.fire({
        icon: "error",
        title: "กรอกข้อมูล",
      });
    }
  };

  // const getFoodsDataById = async (id) => {
  //   try {
  //     const { data } = await axios.get("/api/formaddnewtask/" + id);
  //     // setIsEdit(true);
  //     setFormNewTask({
  //       _id: data.data._id,
  //       newtask: data.data.newtask,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const setDataMenu = async (data) => {
  //   try {
  //     if (isEdit) {
  //       await axios.put("/api/formaddnewtask/" + formNewTask._id, data);
  //     } else {
  //       await axios.post("/api/formaddnewtask/", data);
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "พังยับ",
  //       text: "พังอะครับพรี่ ติดต่อแอดมินด่วนๆ!",
  //     });
  //     return true;
  //   }
  // };

  const deleteFoodsById = async (id) => {
    try {
      await Swal.fire({
        icon: "info",
        title: "คุณต้องการลบข้อมูลนี้หรือไม่",
        confirmButtonText: "ต้องการ",
        cancelButtonText: "ไม่ต้องการ",
        showCancelButton: true,
      }).then(async (e) => {
        if (e.isConfirmed) {
          await axios.delete("/api/formaddnewtask/" + id);
          await Swal.fire({
            icon: "success",
            title: "ลบข้อมูลเรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 2000,
          });
          getMenuData();
        }
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
      });
    }
  };
  // console.log(formNewTask);

  return (
    <div className="container">
      <div className="mx-auto max-w-lg">
        <div className=" text-center text-black font-bold text-xl">
          <p>a ดัม</p>
          <p>Todo List</p>
        </div>
        <form onSubmit={handelSubmit}>
          <div className=" flex">
            <input
              className=" w-full p-2 text-sm"
              type="text"
              placeholder="Add New Task..."
              onChange={(e) =>
                setFormNewTask({
                  ...formNewTask,
                  newtask: e.target.value,
                })
              }
              value={newtask}
              id="newtask"
            />
            <button
              className="p-2 bg-blue-600 text-white rounded-sm"
              type="submit"
            >
              <span>
                <HiPlusSm />
              </span>
            </button>
          </div>
        </form>
        <ListNewTask
          data={menuList}
          // getFoodsDataById={getFoodsDataById}
          deleteFoodsById={deleteFoodsById}
        />
      </div>
    </div>
  );
}
