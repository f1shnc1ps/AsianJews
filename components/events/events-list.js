import Row from "react-bootstrap/Row";
import EventsListItem from "./events-list-item";

export default function EventsList({ events }) {
  return (
    <>
      <Row>
        {events.map((event) => (
          <EventsListItem
            key={event.slug}
            slug={event.slug}
            title={event.title}
            date={event.date}
            featuredImage={event.featuredImage.url}
          />
        ))}
      </Row>
    </>
  );
}
