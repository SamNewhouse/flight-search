import { ClientContext } from "graphql-hooks";
import type { AppProps } from "next/app";
import client from "../lib/graphql";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientContext.Provider value={client}>
      <Component {...pageProps} />
    </ClientContext.Provider>
  );
}
