import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Strongest Champ</title>
        <meta
          name="description"
          content="Vote on which champion from League of Legends will win in a 1 v 1"
        />
        <meta property="og:title" content="Strongest Champion" />
        <meta
          property="og:description"
          content="Vote on which champion from League of Legends will win in a 1 v 1 ⚔️"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Navbar />
        <div className="container flex min-h-screen flex-col items-center justify-center px-4 py-16 ">
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
