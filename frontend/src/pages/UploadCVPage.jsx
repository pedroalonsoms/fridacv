export default function UploadCVPage() {
  return (
    <>
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

        <div className="mt-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
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
            className="cursor-pointer rounded-md border border-black bg-white px-4 py-2 text-black"
          >
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
