import "./globals.css";
import { Inter } from "next/font/google";
import { BooksProvider } from "./_components/books-provider";
import Link from "next/link";
import { Suspense } from "react";
import { RootNavigationEvent } from "./_components/root-navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={null}>
          <RootNavigationEvent />
        </Suspense>
        <nav className="bg-yellow-400 p-4">
          <div className="container ml-5 flex items-center justify-between">
            <div>
              <Link href="/home" className="text-white text-xl font-bold">
                Home
              </Link>
              <span className="mx-4 text-white">|</span>
              <Link
                href="/reading-list"
                className="text-white text-xl font-bold"
              >
                Reading List
              </Link>
            </div>
          </div>
        </nav>
        <BooksProvider>{children}</BooksProvider>
      </body>
    </html>
  );
}
