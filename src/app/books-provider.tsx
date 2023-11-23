"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { Book } from "./book";

type BooksContextType = {
  readingList: Book[] | [];
  addToReadingList: (book: Book) => void;
  searchValue: string;
  setSearchValue: (v: string) => void;
  isBookInList: (id: string) => boolean;
};

const BooksContext = createContext<BooksContextType>({} as BooksContextType);

function BooksProvider({ children }: PropsWithChildren<{}>) {
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const addToReadingList = useCallback((book: Book) => {
    setReadingList((prev) => [...prev, book]);
  }, []);

  const isBookInList = useCallback(
    (bookId: string) => {
      const bookIds = readingList.map((book) => book.id);
      return bookIds.includes(bookId);
    },
    [readingList]
  );

  return (
    <BooksContext.Provider
      value={{
        readingList,
        addToReadingList,
        searchValue,
        setSearchValue,
        isBookInList,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

const useBooksContext = () => useContext(BooksContext);
export { useBooksContext, BooksProvider };
