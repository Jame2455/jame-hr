import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { data } from "autoprefixer";
import FormList from "./FormList";

const FormState = {
  firstname: "",
  lastname: "",
  email: "",
  address: "",
  img: "",
};
const defaultState = [];

export default function Form() {
  const [form, setForm] = useState(FormState);
  const { firstname, lastname, email, address } = form;
  const [formList, setFormList] = useState(defaultState);
  const [isEdit, setIsEdit] = useState(false);
  const [imgFile, setImgFile] = useState();

  useEffect(() => {
    getFormData();
  }, []);
////////////
  const getFormData = async () => {
    try {
      const { data } = await axios.get("/api/form/");
      setFormList(data?.data);
      // setImgFile(data?.data)
    } catch (error) {
      console.log(error);
    }
  }; //ลิสเมนู
////////////

  const handelSubmitFile = async (event) => {
    const file = event.target.files[0];
    setImgFile(file);
  };//ส่วนเลือกไฟล์
  
///////////
  const handelSubmit = async (e) => {
    e.preventDefault();
    const validationError = validationForm();
    if (validationError) return;

    const setDataError = await uploadImage(imgFile);
    if (setDataError) return;

    setForm(FormState);

    await Swal.fire({
      icon: "success",
      title: "เพิ่มข้อมูลสำเร็จ",
      showConfirmButton: false,
      timer: 2000,
    });
    await getFormData();
  };
/////////////
  const validationForm = () => {
    if (!firstname || !lastname || !email || !address) {
      return Swal.fire({
        icon: "error",
        title: "กรอกข้อมูลไม่ครบ",
      });
    }
  };
/////////////
const getFormDataById = async (id) => {
    try {
      const { data } = await axios.get("/api/form/" + id);
      setIsEdit(true);
      setForm({
        _id: data.data._id,
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        email: data.data.email,
        address: data.data.address,
        // img: data.data.img
      });
    } catch (error) {
      console.log(error);
    }
  };
///////////
const uploadImage = async (img) => {
    try {
      let menuData;
      menuData = { ...form };

      if (img) {
        let formData = new FormData();
        formData.append("file", img, img.name);
        const { data } = await axios.post(
          "https://upload-image-gin-a-rai-dee.daddybody.company/upload/", //https://upload-image-gin-a-rai-dee.daddybody.company/upload/
          formData
        );
        console.log(data?.filename);
        menuData.img = data?.filename || form?.img;
      }
      setImgFile("");
      const setDataError = await setData(menuData);
      if (setDataError) return;
    } catch (error) {
      return true;
    }
  }; //ส่วนเพิ่มรูปภาพ

  const setData = async (data) => {
    try {
      if (isEdit) {
        await axios.put("/api/form/" + form._id, data);
      } else {
        await axios.post("/api/form/", data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "พังยับ",
        text: "พังอะครับพรี่ ติดต่อแอดมินด่วนๆ!",
      });
      return true;
    }
  };
  const showImage = () =>
    !form.img
      ? imgFile
        ? URL.createObjectURL(imgFile)
        : "https://i.stack.imgur.com/y9DpT.jpg"
      : "uploads/" + form.img;
  console.log(data);

 
  const deleteFormById = async (id) => {
    try {
      await Swal.fire({
        icon: "info",
        title: "คุณต้องการลบข้อมูลนี้หรือไม่",
        confirmButtonText: "ต้องการ",
        cancelButtonText: "ไม่ต้องการ",
        showCancelButton: true,
      }).then(async (e) => {
        if (e.isConfirmed) {
          await axios.delete("/api/form/" + id);
          await Swal.fire({
            icon: "success",
            title: "ลบข้อมูลเรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 2000,
          });
          getFormData();
        }
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
      });
    }
  };

  console.log(form);

  return (
    <>
      <div className=" m-10">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handelSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="firstname"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          id="firstname"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) =>
                            setForm({ ...form, firstname: e.target.value })
                          }
                          value={firstname}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          id="lastname"
                          autoComplete="family-name"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) =>
                            setForm({ ...form, lastname: e.target.value })
                          }
                          value={lastname}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          value={email}
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street address
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) =>
                            setForm({ ...form, address: e.target.value })
                          }
                          value={address}
                        />
                      </div>
                    </div>
                    {/* <div className="flex items-center justify-center w-full py-5 ">
                      <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                        <div className="h-full w-full text-center flex flex-col items-center justify-center  ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                            <img
                              className="has-mask h-36 object-center"
                              src={showImage()}
                            />
                          </div>
                          <p className="pointer-none text-gray-500 ">
                            <span className="text-sm">เลือกไฟล์</span>
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handelSubmitFile}
                          id="img"
                          name="img"
                        />
                      </label>
                    </div> */}
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <FormList
          data={formList}
          getFormDataById={getFormDataById}
          deleteFormById={deleteFormById}
        />
      </div>
    </>
  );
}
