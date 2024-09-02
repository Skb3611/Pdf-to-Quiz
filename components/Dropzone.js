"use client";
import Dropzone from "react-dropzone";
import { useState } from "react";
import QuizComponent from "./QuizComponent";
const DropzoneComponent = () => {
  const [isFlie, setisFile] = useState(false);
  const [data, setdata] = useState(null)
  let func = async (acceptedFiles) => {
    console.log(acceptedFiles[0])
    if (acceptedFiles) setisFile(!isFlie);
    let formData= new FormData()
    formData.append("file",acceptedFiles[0])
    // // parse(formData)
    let a = await fetch("http://localhost:3000/api/file", {
      body: formData,
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data" // FormData automatically sets the correct headers
      // }
    });
    let res = await a.json()
    console.log(res)
    setdata(res.text)
    // console.log(formData .get("file"))
  };

  return (
    <div>
      {!isFlie ? (
        <Dropzone onDrop={func} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input
                
                  {...getInputProps()}
                />
                <form action="/target" className="dropzone">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 :text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 :text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 :text-gray-400">
                          Upload PDF only
                        </p>
                      </div>
                   
                    </label>
                  </div>
                </form>
              </div>
            </section>
          )}
        </Dropzone>) : <QuizComponent data={data}/>
      }
    </div>
  );
};

export default DropzoneComponent;
