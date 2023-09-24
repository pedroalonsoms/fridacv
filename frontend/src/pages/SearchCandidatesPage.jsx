import Navbar from "../components/Navbar";
import Candidate from "../components/Candidate";
import Select from "react-select";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function SearchCandidatesPage() {
  let [isOpen, setIsOpen] = useState(true);

  const [keywords, setKeywords] = useState([]);
  const options = [
    { value: "felipe", label: "Felipe" },
    { value: "julio", label: "Julio" },
    { value: "pedro", label: "Pedro" },
  ];
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(keywords);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 grid place-items-center ">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="flex w-full max-w-md flex-col items-center rounded-md bg-white p-6">
            <Dialog.Title className="text-lg font-semibold">
              Your QR Code
            </Dialog.Title>
            <QRCodeSVG value="https://reactjs.org/" className="m-4" />
            <button
              className="rounded-md border border-slate-400 bg-white px-4 py-2 text-black"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Navbar />

      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <h2 className="py-20 text-center text-6xl font-bold">
          Search Candidates
        </h2>
        <button
          className="rounded-md bg-black px-4 py-2 text-lg text-white"
          onClick={() => setIsOpen(true)}
        >
          View QR
        </button>
      </div>

      <form onSubmit={handleSearch} className="mx-auto flex max-w-2xl gap-2">
        <Select
          name="colors"
          isMulti
          className="grow"
          value={keywords}
          options={options}
          onChange={(newKeywords) => {
            setKeywords(() => newKeywords);
          }}
        />

        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Continue
        </button>
      </form>

      <div className="mx-auto max-w-2xl">
        <Candidate name="hello" />
        <Candidate name="world" />
      </div>
    </>
  );
}
