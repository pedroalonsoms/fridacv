import Navbar from "../components/Navbar";
import Candidate from "../components/Candidate";

export default function SearchCandidatesPage() {
  return (
    <>
      <Navbar />
      <h2 className="py-20 text-center text-6xl font-bold">
        Search Candidates
      </h2>

      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search candidates..."
          className="w-96 rounded-l-md border border-gray-300 px-4 py-2 focus:outline-none"
        />
        <button className="rounded-r-md border bg-white px-4 py-2 text-black hover:bg-black hover:text-white focus:outline-none">
          Search
        </button>
      </div>

      <div className="mx-auto max-w-2xl">
        <Candidate name="hello" />
        <Candidate name="world" />
      </div>
    </>
  );
}
