import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function Candidate(props) {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 grid place-items-center">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="w-full max-w-md rounded-md bg-white p-6">
            <Dialog.Title className="text-lg font-semibold">
              Information
            </Dialog.Title>

            <div>
              <label htmlFor="title" className="block pt-3">
                Green flags
              </label>
              <div className="flex gap-1">
                <div className="mt-1 rounded-md bg-green-100 px-2 py-1 text-xs">
                  Gran empleado
                </div>
                <div className="mt-1 rounded-md bg-green-100 px-2 py-1 text-xs">
                  Gran empleado
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block pt-3">
                Red flags
              </label>
              <div className="flex gap-1">
                <div className="mt-1 rounded-md bg-red-200 px-2 py-1 text-xs">
                  Alta rotación laboral
                </div>
                <div className="mt-1 rounded-md bg-red-200 px-2 py-1 text-xs">
                  Alta rotación laboral
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button
                className="rounded-md bg-black px-4 py-2 text-sm text-white"
                onClick={() => setIsOpen(false)}
              >
                Accept
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <div className="my-4 flex w-full items-center justify-between rounded border border-black p-4">
        <button>{props.name}</button>
        <button onClick={() => setIsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
