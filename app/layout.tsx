import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";


export const metadata: Metadata = {
  title: "Finanšu kalkulātors",
  description: "Finanšu kalkulātors, kas palīdz aprēķināt darba Neto algu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"m-4 md:mx-12 lg:mx-16 bg-gray-100"}>
      <h1 className={"text-3xl text-black font-bold mb-6"}>Finanšu kalkulātori:</h1>
      <ul className={"md:flex md:space-x-3 mb-10 text-2xl"}>
        <li><Button variant={"outline"}><Link href={"/"}>Darba alga Bruto uz Neto</Link></Button></li>
        <li><Button variant={"outline"}><Link href={"/pvn"}>PVN Kalkulators</Link></Button></li>
        <li><Button variant={"outline"}><Link href={"/kredits"}>Kredīts</Link></Button></li>
      </ul>
      {children}
      </body>
    </html>
  );
}
