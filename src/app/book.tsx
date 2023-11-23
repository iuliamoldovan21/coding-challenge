"use client";
import { useBooksContext } from "./books-provider";
import { useCallback, useMemo } from "react";

export type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
};

export function BookItem({ book }: { book: Book }) {
  const { title, author, publisher } = book || {};

  return (
    <div className="flex flex-col border p-4 mb-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <h5 className="text-md mb-2">Author: {author}</h5>
      <p className="text-sm mb-4">Published by: {publisher}</p>
      <ActionButton book={book} />
    </div>
  );
}

function ActionButton({ book }: { book: Book }) {
  const { addToReadingList, isBookInList, removeFromReadingList } =
    useBooksContext();

  const isInList = useMemo(
    () => isBookInList(book.id),
    [book.id, isBookInList]
  );

  const buttonText = useMemo(
    () => (isInList ? "Remove from reading list" : " Add to reading list"),
    [isInList]
  );

  const toggleBookInList = useCallback(
    (book: Book) => {
      isInList ? removeFromReadingList(book.id) : addToReadingList(book);
    },
    [addToReadingList, isInList, removeFromReadingList]
  );

  return (
    <button
      onClick={() => toggleBookInList(book)}
      className={`text-white p-2  w-80 self-end mr-10 rounded ${
        isInList
          ? "bg-red-400 hover:bg-red-500"
          : "bg-yellow-500 hover:bg-yellow-600"
      }`}
    >
      {buttonText}
    </button>
  );
}
