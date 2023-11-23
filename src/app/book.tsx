"use client";
import { usePathname } from "next/navigation";
import { useBooksContext } from "./books-provider";

export type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
};

export function BookItem({ book }: { book: Book }) {
  const { title, author, publisher } = book || {};
  const pathname = usePathname();
  const shouldShowButton = !pathname.includes("/reading-list");

  return (
    <div className="flex flex-col border p-4 mb-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <h5 className="text-md mb-2">Author: {author}</h5>
      <p className="text-sm mb-4">Published by: {publisher}</p>
      {shouldShowButton && <ActionButton book={book} />}
    </div>
  );
}

function ActionButton({ book }: { book: Book }) {
  const { addToReadingList, isBookInList } = useBooksContext();
  const isDisabled = isBookInList(book.id);

  return (
    <button
      onClick={() => addToReadingList(book)}
      className="disabled:opacity-20 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 w-80 self-end mr-10"
      disabled={isDisabled}
    >
      Add to reading list
    </button>
  );
}
