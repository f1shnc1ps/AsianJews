import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../lib/constants";
import Head from "next/head";
import ConnectDisplay from "@display-items/connect";

export default function Connect({ connect }) {
  return (
    <>
      <Head>
        <title> The Asian School Bahrain | Connect </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>
      <main>
        <h2 className="page-title">{connect.title}</h2>

        <section>
          <ConnectDisplay
            title={connect.title}
            connectText={connect.connectText}
            googleMap={connect.googleMap}
            schoolAddressTitle={connect.schoolAddressTitle}
            schoolAddressSchool={connect.schoolAddressSchool}
            schoolAddress1={connect.schoolAddress1}
            schoolAddress2={connect.schoolAddress2}
            schoolAddress3={connect.schoolAddress3}
            mailingAddressTitle={connect.mailingAddressTitle}
            mailingAddressSchool={connect.mailingAddressSchool}
            mailingAddress1={connect.mailingAddress1}
            mailingAddress2={connect.mailingAddress2}
            mailingAddress3={connect.mailingAddress3}
            phone1Link={connect.phone1Link}
            phone1Icon={connect.phone1Icon}
            phone1Text={connect.phone1Text}
            phone2Link={connect.phone2Link}
            phone2Icon={connect.phone2Icon}
            phone2Text={connect.phone2Text}
            emailLink={connect.emailLink}
            emailIcon={connect.emailIcon}
            emailText={connect.emailText}
            faxIcon={connect.faxIcon}
            faxText={connect.faxText}
          />
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,

    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
            connect(id: "1LthcfzTfu8BpF0K9wDLI8") {
            title
            connectText
            googleMap
            schoolAddressTitle
            schoolAddressSchool
            schoolAddress1
            schoolAddress2
            schoolAddress3
            mailingAddressTitle
            mailingAddressSchool
            mailingAddress1
            mailingAddress2
            mailingAddress3
            phone1Link
            phone1Icon
            phone1Text
            phone2Link
            phone2Icon
            phone2Text
            emailLink
            emailIcon
            emailText
            faxLink
            faxIcon
            faxText
            parentPortalLink
            parentPortalText
            careersLink
            careersText
            publicDisclosureLink
            publicDisclosureText
          }
        }`,
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const connect = data.connect;

  return {
    props: {
      connect,
    },
    revalidate: 60,
  };
}
