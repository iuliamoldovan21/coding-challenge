import { Book } from "../_components/book";

export async function getBooks(query: string): Promise<Book[]> {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    const res = await fetchData(url);
    const data = await res.json();

    if (!data.items) return [];

    const mappedData = mapBooks(data);
    return mappedData;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Could not map data. Error: ${err.message} `);
  }
}

async function fetchData(url: string): Promise<Response> {
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from the server. Status: ${res.status}`
    );
  }

  return res;
}

function mapBooks(data: any): Book[] {
  const mappedData: Book[] = data.items.slice(0, 5).map((book: any) => {
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
