import Navbar from "../components/Navbar";
import JobPost from "../components/JobPost";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function JobPostingsPage() {
  let [isOpen, setIsOpen] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handlesubmit");

    // Enviar los datos al servidor
    try {
      const response = await fetch("/api/crearRegistro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);

      if (response.status === 201) {
        console.log("Registro creado con éxito");
        setIsOpen(false); // Cerrar el diálogo después del envío exitoso
      } else {
        console.error("Error al enviar datos");
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

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
              New Job Posting
            </Dialog.Title>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title" className="block pt-3">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-400 p-2"
                ></input>
              </div>

              <div>
                <label htmlFor="description" className="block pt-2">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-400 p-2"
                ></input>
              </div>

              <div className="mt-3 flex justify-end gap-2">
                <button
                  className="rounded-md border border-slate-400 bg-white px-4 py-2 text-black"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-black px-4 py-2 text-white"
                  // onClick={() => setIsOpen(false)}
                >
                  Continue
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Navbar />
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <h2 className="py-20 text-center text-6xl font-bold">Job Postings</h2>
        <button
          className="rounded-md bg-black px-16 py-2 text-lg text-white"
          onClick={() => setIsOpen(true)}
        >
          New Posting
        </button>
      </div>
      <div className="mx-auto max-w-2xl">
        <JobPost title="hello" />
        <JobPost title="world" />
      </div>
    </>
  );
}
