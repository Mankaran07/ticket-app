import Nav from "./(components)/Nav";
import "./globals.css";
import { Inter } from "next/font/google";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import AuthProvider from "./(components)/AuthProvider";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ticket App",
  description: "Easily Manage your ticket",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen max-h-screen">
          <AuthProvider>
            <Nav />
            <div className="flex-grow overflow-y-auto bg-page text-default-text">
              {children}
            </div>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
