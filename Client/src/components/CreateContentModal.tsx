import { useRef, useState, useContext } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { StateContext } from '../Context API/StateContext'

const options = ["youtube", "twitter", "content"];

//@ts-ignore
export function CreateContentModal() {
  const {modalOpen, setModal} = useContext(StateContext)
  const linkRef = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLInputElement>();
  const descRef = useRef<HTMLTextAreaElement | null>(null);
 // Updated to work with textarea
  const [type, setType] = useState("content");
  function onClose(){
    setModal(false)
  }

  async function addContent() {
    const linkVal = linkRef.current?.value;
    const titleVal = titleRef.current?.value;
    const desVal = descRef.current?.value;

    try {
      await axios.post(
        "https://brainity.vercel.app/api/v1/content",
        {
          title: titleVal,
          link: linkVal,
          description: desVal,
          type: type,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      alert("Content added successfully");
      onClose();
    } catch (error) {
      console.error("Error adding content:", error);
    }
  }

  return (
    <div>
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Backdrop */}
          <div
            className="absolute w-screen h-screen bg-black opacity-50 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
          ></div>

          {/* Modal */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 z-10 relative">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                aria-label="Close Modal"
                className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                <CrossIcon size="lg" />
              </button>
            </div>

            {/* Modal Header */}
            <h1 className="text-3xl font-bold text-center mb-6">Add Content</h1>

            {/* Modal Form */}
            <div className="flex flex-col gap-4">
              <div className=" justify-start">
                <Input placeholder="Title" reference={titleRef} />
                <Input placeholder="Link" reference={linkRef} />
              </div>
              <textarea
                placeholder="Description"
                ref={descRef}
                className="border border-gray-300 rounded-lg p-3 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>

              <select
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Please choose an option</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
              <Button
                variant="primary"
                size="lg"
                text="Submit"
                onClick={addContent}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
