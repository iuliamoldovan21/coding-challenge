import { Book } from "./book";
import { BookItem } from "./book";

export async function getBooks(query: string): Promise<Book[]> {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  const data = await res.json();

  if (!data.items) return [];

  const mappedData = data?.items.slice(0, 5).map((book: any) => {
    const volumeInfo = book.volumeInfo;
    const authors = volumeInfo.authors?.join(" & ");
    return {
      id: book.id,
      title: volumeInfo.title,
      author: authors,
      publisher: volumeInfo.publisher,
    };
  });
  return mappedData;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [k: string]: string };
}) {
  const books = await getBooks(searchParams.bookQuery || "''");

  return (
    <div className="text-gray-600 p-4 h-screen">
      <form className="mb-4">
        <input type="text" name="bookQuery" placeholder="Search..." />
        <button className="ml-2 bg-purple-800 text-white p-2 rounded hover:bg-purple-900">
          Search
        </button>
      </form>
      <div className="grid grid-cols-2 gap-3">
        {books.map((book: Book) => (
          <BookItem book={book} key={book.id} />
        ))}
      </div>
    </div>
  );
}
