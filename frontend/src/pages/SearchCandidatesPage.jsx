import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Candidate from "../components/Candidate";
import Select from "react-select";
import { Dialog } from "@headlessui/react";
import { QRCodeSVG } from "qrcode.react";

export default function SearchCandidatesPage() {
  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async (url, setter) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `No se pudo obtener la lista de ${
              setter === setSoftSkills ? "soft" : "hard"
            } skills.`,
          );
        }
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSkills("http://localhost:4000/soft_skills/", setSoftSkills);
    fetchSkills("http://localhost:4000/hard_skills/", setHardSkills);
  }, []);

  let [isOpen, setIsOpen] = useState(true);

  const [softSkillsKeywords, setSoftSkillsKeywords] = useState([]);
  const [hardSkillsKeywords, setHardSkillsKeywords] = useState([]);

  const softSkillsOptions = softSkills.map((softSkill) => ({
    value: softSkill[0],
    label: softSkill[1],
  }));
  const hardSkillsOptions = hardSkills.map((hardSkill) => ({
    value: hardSkill[0],
    label: hardSkill[1],
  }));

  const handleSoftSkillsSearch = (e) => {
    e.preventDefault();
    console.log("Soft Skills Keywords:", softSkillsKeywords);
  };

  const handleHardSkillsSearch = (e) => {
    e.preventDefault();
    console.log("Hard Skills Keywords:", hardSkillsKeywords);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
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
        ;
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

      <form
        onSubmit={handleSoftSkillsSearch}
        className="mx-auto max-w-2xl grow"
      >
        <Select
          name="softSkills"
          isMulti
          value={softSkillsKeywords}
          options={softSkillsOptions}
          onChange={(selectedOptions) => {
            setSoftSkillsKeywords(selectedOptions || []);
          }}
        />

        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Search Soft Skills
        </button>
      </form>

      <form onSubmit={handleHardSkillsSearch} className=" mx-auto max-w-2xl">
        <Select
          name="hardSkills"
          isMulti
          value={hardSkillsKeywords}
          options={hardSkillsOptions}
          onChange={(selectedOptions) => {
            setHardSkillsKeywords(selectedOptions || []);
          }}
        />

        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Search Hard Skills
        </button>
      </form>

      <div className="mx-auto max-w-2xl">
        {/* Aquí puedes mapear y mostrar los candidatos */}
      </div>
    </>
  );
}
