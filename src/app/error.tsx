"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold text-red-500 mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
      >
        Try again
      </button>
    </div>
  );
}
