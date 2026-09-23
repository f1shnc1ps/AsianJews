import { SITE_NAME, SITE_FAVICON, SITE_DESCRIPTION,  imgblurDataURL, HOME_OG_IMAGE_URL } from "../../../lib/constants";
import { useEffect, useState } from "react";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import EventsList from "@events/events-list";

export default function Events({ events }) {
  const [filteredList, setFilteredList] = useState(events); 
  const [selectedYear, setSelectedYear] = useState();

 
  const filterByYear = (filteredData) => {
    if (!selectedYear) {
      return filteredData;
    }

    const filteredYears = filteredData.filter(
      (event) => event.year === selectedYear
    );
    return filteredYears;
  };
  
  const handleYearChange = (event) => {
    const inputYear = Number(event.target.id) ;

    if (inputYear === selectedYear) {
      selectedYear(inputYear);
    } else {
      setSelectedYear(inputYear); 
    }
  };

  useEffect(() => {
    var   filteredData = filterByYear(events);
          filteredData = filterByYear(filteredData);
                       setFilteredList(filteredData);
  }, [selectedYear, events]);

  return (
    <>
      <Head>
        {/* <title>{ SITE_NAME } | Events </title> */}
        <title> The Asian School Bahrain |  Events </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">Events</h2>
        <Container className="my-5">
        <div id="category-options"  className="text-asb-main justify-content-center mb-5" onClick={handleYearChange}>
              {/* <div className={selectedYear === 2020 ? "active-option" : "filter-option"} id="2020" >
              2020 
              </div> 
              <div className={selectedYear === 2021 ? "active-option" : "filter-option"} id="2021" >
              2021 
              </div>
              <div className={selectedYear === 2022 ? "active-option" : "filter-option"} id="2022" >
              2022 
              </div> */}
            </div> 


          <EventsList events={filteredList} />
        </Container>
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
        query: `
        query {
            eventCollection (order: date_DESC) {
              items {
                sys {
                  id
                }
                title
                slug
                year
                date 
                featuredImage {
                  url
                  title
                  description
                } 
              }
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
  const events = data.eventCollection.items;

  return {
    props: { events },
    revalidate: 60,
  };
} 

// where: {
//   year: 2020,
// },

{
  /* <Row>
            {events.map((event) => (
              <Col md={4} key={event.slug} className="events-card ">
                <Link href={`/student-life/events/${event.slug}`}>
                  <a>
                    <EventsCard
                      title={event.title}
                      date={event.date}
                      featuredImage={event.featuredImage.url}
                    />
                  </a>
                </Link>
              </Col>
            ))}
          </Row> */
}
