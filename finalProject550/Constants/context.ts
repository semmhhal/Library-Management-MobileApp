import { createContext } from "react";
import Ibooks from "../types/IBooks";
import Iauthors from "../types/IAuthors";
import Imembers from "../types/IMembers";
import Ipublishers from "../types/IPublishers";
import Itransactions from "../types/ITransactions";
import Icatalogs from "../types/Icatalogs";

interface Icontext {
  books: Ibooks[];
  setBooks: (books: Ibooks[]) => void;
  authors: Iauthors[];
  setAuthors: (authors: Iauthors[]) => void;
  members: Imembers[];
  setMembers: (members: Imembers[]) => void;
  publishers: Ipublishers[];
  setPublishers: (publishers: Ipublishers[]) => void;
  transactions: Itransactions[];
  setTransactions: (transactions: Itransactions[]) => void;
  catalogs: Icatalogs[];
  setCatalogs: (catalogs: Icatalogs[]) => void;
  setLoggedin: (loggedin: boolean) => void;
}

const GlobalContext = createContext<Icontext>({
  books: [],
  setBooks: () => {},
  authors: [],
  setAuthors: () => {},
  members: [],
  setMembers: () => {},
  publishers: [],
  setPublishers: () => {},
  transactions: [],
  setTransactions: () => {},
  catalogs: [],
  setCatalogs: () => {},
  setLoggedin: () => {},
});

export default GlobalContext;
