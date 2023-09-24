export default function SearchCandidatesPage() {
  return (
    <>
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
        <div className="my-4 flex w-full items-center justify-between rounded border border-black p-4">
          <button>Candidate Name</button>
          <button>
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
        <div className="my-4 flex w-full items-center justify-between rounded border border-black p-4">
          <button>Candidate Name</button>
          <button>
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
      </div>
    </>
  );
}
