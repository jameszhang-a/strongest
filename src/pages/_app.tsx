import { type AppType } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import { api } from "../utils/api";

import "../styles/globals.css";

import Layout from "../components/Layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
};

export default api.withTRPC(MyApp);
