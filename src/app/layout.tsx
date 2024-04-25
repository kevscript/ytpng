import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "YTPNG",
  description: "Generate PNG from a Youtube video.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-neutral-800 min-w-fit">
      <body className={roboto.className}>
        {children}
        {/* <div className="w-full flex justify-center items-center py-16 text-white gap-4">
          <span>made by kevscript :)</span>{" "}
          <a
            href="https://twitter.com/kevscript"
            target="_blank"
            className="underline"
          >
            Twitter
          </a>{" "}
          <a
            href="https://github.com/kevscript"
            target="_blank"
            className="underline"
          >
            Github
          </a>
          <a
            href="https://github.com/kevscript/ytpng"
            target="_blank"
            className="underline"
          >
            Project Repo
          </a>
        </div> */}
      </body>
    </html>
  );
}
