import { createContext } from "react";
import { GlobalContext } from "../typescript/types";

export const Context = createContext<GlobalContext>({
  searchTerm: "",
  searchResults: [],
  getSearchData: (e: React.FormEvent<HTMLFormElement>) => {},
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
});
