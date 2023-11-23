import { getBooks } from "../_api/api";
import { Book } from "../_components/book";
import { BookItem } from "../_components/book";

export default async function Home({
  searchParams,
}: {
  searchParams: { [k: string]: string };
}) {
  const books = await getBooks(searchParams.bookQuery || "''");

  return (
    <div className="text-gray-600 p-4">
      <form className="mb-4">
        <input
          type="text"
          name="bookQuery"
          placeholder="Search..."
          className="py-2 px-4 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 rounded "
        />
        <button className="ml-2 bg-purple-800 text-white p-2 rounded hover:bg-purple-900 mt-2 md:mt-0">
          Search
        </button>
      </form>
      {!books.length && (
        <h2 className="text-xl font-bold mb-2">
          No books found. Try another search key.
        </h2>
      )}
      {books.length > 0 && (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-3 mt-3">
          {books.map((book: Book) => (
            <BookItem book={book} key={book.id} />
          ))}
        </div>
      )}
    </div>
  );
}
