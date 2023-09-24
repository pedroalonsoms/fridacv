export default function JobPostingsPage() {
  return (
    <>
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <h2 className="py-20 text-center text-6xl font-bold">Job Postings</h2>
        <button className="rounded-md bg-black px-16 py-2 text-lg text-white">
          New Posting
        </button>
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="my-2 flex w-full items-center justify-between rounded border border-black p-4">
          <button>Job Title</button>
          <button>Delete</button>
        </div>
        <div className="my-2 flex w-full items-center justify-between rounded border border-black p-4">
          <button>Job Title</button>
          <button>Delete</button>
        </div>
      </div>
    </>
  );
}
