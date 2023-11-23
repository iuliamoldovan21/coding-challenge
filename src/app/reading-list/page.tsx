"use client";

import { Book, BookItem } from "../book";
import { useBooksContext } from "../books-provider";

export default function ReadingListPage() {
  const { readingList: books } = useBooksContext();

  return (
    <div className="text-gray-600 h-screen">
      {!books.length && (
        <h2 className="ml-3 mt-3 text-xl font-bold mb-2">No books added</h2>
      )}
      <div className="grid grid-cols-2 gap-3 mt-3">
        {books.length > 0 &&
          books.map((book: Book) => <BookItem book={book} key={book.id} />)}
      </div>
    </div>
  );
}
