"use client";

import { Book, BookItem } from "../_components/book";
import { useBooksContext } from "../_components/books-provider";

export default function ReadingListPage() {
  const { readingList: books } = useBooksContext();

  return (
    <div className="text-gray-600">
      {!books.length && (
        <h2 className="ml-3 mt-3 text-xl font-bold mb-2">No books added</h2>
      )}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-3 mt-3">
        {books.length > 0 &&
          books.map((book: Book) => <BookItem book={book} key={book.id} />)}
      </div>
    </div>
  );
}
