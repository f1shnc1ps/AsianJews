import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <meta name="keywords" content="Asian School, Bahrain, CBSE"/>
        <meta name="creator" content="@mogsishere" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
