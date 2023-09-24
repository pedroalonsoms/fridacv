import Navbar from "../components/Navbar";

export default function RegisterCompanyPage() {
  return (
    <>
      <Navbar />
      <h1 className="pt-20 text-center text-6xl font-bold">Register Company</h1>
      <div className="pt-20"></div>
      <form
        action="#"
        className="mx-auto max-w-md rounded-md border border-slate-400 p-4"
      >
        <p className="text-slate-400">Welcome</p>

        <div className="pt-2">
          <label className="block pt-2" htmlFor="companyName">
            Company Name
          </label>
          <input
            className="w-full rounded-md border border-slate-400 p-2"
            type="text"
            id="companyName"
            name="companyName"
          ></input>
        </div>

        <div>
          <label htmlFor="email" className="block pt-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-md border border-slate-400 p-2"
          ></input>
        </div>

        <div>
          <label htmlFor="password" className="block pt-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full rounded-md border border-slate-400 p-2"
          ></input>
        </div>

        <button
          type="submit"
          className="mx-auto mt-4 block rounded-md bg-black px-16 py-2 text-lg text-white"
        >
          Save changes
        </button>
      </form>
    </>
  );
}
