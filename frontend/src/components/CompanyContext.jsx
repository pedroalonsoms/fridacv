// CompanyContext.js
import React, { createContext, useState, useContext } from "react";

const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [id_company, setIdCompany] = useState("");

  return (
    <CompanyContext.Provider value={{ id_company, setIdCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  return useContext(CompanyContext);
}
