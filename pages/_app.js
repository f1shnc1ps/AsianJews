import React, { useEffect } from "react";
import Head from 'next/head'
import Layout from "../components/layout/layout";
import "../styles/main.scss";
import "../styles/globals.scss";
// import { SSRProvider } from "react-aria";
import { SSRProvider } from 'react-bootstrap';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import TagManager from "react-gtm-module";
// import { GTM_ID } from "../lib/gtm";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    TagManager.initialize({ gtmId: `${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}` });
  }, []);

  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial="initialState"
            animate="animateState"
            exit="exitState"
            transition={{
              duration: 0.75,
            }}
            variants={{
              initialState: {
                opacity: 0,
              },
              animateState: {
                opacity: 1,
              },
              exitState: {},
            }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </SSRProvider>
  );
}