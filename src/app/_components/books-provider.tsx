"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Book } from "./book";

type BooksContextType = {
  readingList: Book[] | [];
  addToReadingList: (book: Book) => void;
  isBookInList: (id: string) => boolean;
  removeFromReadingList: (id: string) => void;
};

const BooksContext = createContext<BooksContextType>({} as BooksContextType);

function BooksProvider({ children }: PropsWithChildren<{}>) {
  const isClient = typeof window !== "undefined";

  const storedReadingList = isClient ? localStorage.getItem("readingList") : "";
  const initialReadingList = storedReadingList
    ? JSON.parse(storedReadingList)
    : [];

  const [readingList, setReadingList] = useState<Book[] | []>(
    initialReadingList
  );

  useEffect(() => {
    localStorage.setItem("readingList", JSON.stringify(readingList));
  }, [readingList]);

  const addToReadingList = useCallback((book: Book) => {
    setReadingList((prev) => [...prev, book]);
  }, []);

  const removeFromReadingList = useCallback(
    (bookId: string) => {
      const updatedReadingList = readingList.filter(
        (book) => book.id !== bookId
      );

      setReadingList(updatedReadingList);
    },
    [readingList]
  );

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
        isBookInList,
        removeFromReadingList,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

const useBooksContext = () => useContext(BooksContext);
export { useBooksContext, BooksProvider };
