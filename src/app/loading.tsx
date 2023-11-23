export default function Loading() {
  return (
    <div className="h-screen">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-3 mt-10">
        {Array.from(Array(6).keys()).map((i) => (
          <div
            key={i}
            className="w-full h-44 bg-gray-300 border animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}
