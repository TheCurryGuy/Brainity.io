import { useRef, useState, useContext } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { StateContext } from '../Context API/StateContext';

const options = ["youtube", "twitter", "links", "note"]; // Added "note" option

//@ts-ignore
export function CreateContentModal() {
  const { modalOpen, setModal } = useContext(StateContext);
  const linkRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const [type, setType] = useState("note");

  function onClose() {
    setModal(false);
  }

  async function addContent() {
    const linkVal = type === "note" ? null : linkRef.current?.value; // Set linkVal to null if type is "note"
    const titleVal = titleRef.current?.value;
    const desVal = descRef.current?.value;

    try {
      await axios.post(
        "https://brainity-server.vercel.app/api/v1/content",
        {
          title: titleVal,
          link: linkVal, // linkVal will be null for "note"
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
              <div className="justify-start">
                <Input placeholder="Title" reference={titleRef} />
                {/* Conditionally render the Link input */}
                {type !== "note" && (
                  <Input placeholder="Link" reference={linkRef} />
                )}
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