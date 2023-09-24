import Navbar from "../components/Navbar";

export default function UploadCVPage() {
  return (
    <>
      <Navbar />
      <h2 className="py-20 text-center text-6xl font-bold">Upload your CV</h2>
      <form
        action="#"
        className="mx-auto max-w-md rounded-md border border-slate-400 p-4"
      >
        <p className="text-slate-400">Welcome</p>

        <div className="mt-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-md border border-slate-400 p-2"
          />
        </div>

        <div className="mt-4 flex items-center justify-center">
          <input
            type="file"
            id="cv"
            name="cv"
            className="absolute left-0 top-0 cursor-pointer opacity-0"
          />
          <label
            htmlFor="cv"
            className="flex cursor-pointer items-center rounded-md border border-black bg-white px-4 py-2 text-black"
          >
            <div className="mr-2">
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            Choose File
          </label>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <button
            type="submit"
            className="rounded-md bg-black px-16 py-2 text-lg text-white"
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
}
