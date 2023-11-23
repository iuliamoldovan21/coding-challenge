"use client";

export function SearchBar({ onSearch }: { onSearch: (v: string) => void }) {
  return (
    <form>
      <input type="text" placeholder="Search..." name="bookName" />
      <button>Search</button>
    </form>
  );
}
