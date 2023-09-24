import Navbar from "../components/Navbar";
import Candidate from "../components/Candidate";
import Select from "react-select";
import { useState } from "react";

export default function SearchCandidatesPage() {
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
      <Navbar />
      <h1 className="py-20 text-center text-6xl font-bold">
        Search Candidates
      </h1>

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
