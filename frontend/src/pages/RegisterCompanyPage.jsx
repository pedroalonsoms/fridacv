export default function RegisterCompanyPage() {
  return (
    <>
      <h1 className="pt-20 text-center text-6xl font-bold">Register Company</h1>
      <div className="pt-20"></div>
      <form
        action="#"
        className="mx-auto max-w-md rounded-md border border-slate-400 p-4"
      >
        <p className="text-slate-400">Welcome</p>

        <div>
          <label htmlFor="companyName">First name</label>
          <input type="text" id="companyName" name="companyName"></input>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email"></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"></input>
        </div>

        <button type="submit">Save changes</button>
      </form>
    </>
  );
}
