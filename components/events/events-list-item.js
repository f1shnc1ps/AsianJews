import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../../lib/constants";
import Link from "next/link";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import DateFormatter from "@display-items/date-formatter";


export default function EventsListItem({ slug, title, date, featuredImage }) {
  return (
    <>
      <Col md={4} className="events-card mb-3">
        <Link href={`/updates/events/${slug}`}>
          
            <Card className="shadow-sm border p-2">
              <div className="text-center overflow-hidden ratio ratio-16x9">
                <Image
                  className="img-fluid"
                  src={featuredImage}
                  placeholder="blur"
                  blurDataURL={imgblurDataURL}
                  width="360"
                  height="240"
                  alt={title}
                />
              </div>
              <Card.Body>
                <Card.Title className="text-center fw-bold mb-0">
                  {title}
                </Card.Title>
                <Card.Text className="text-center">
                  <DateFormatter dateString={date} />
                </Card.Text>
              </Card.Body>
            </Card>
        </Link>
      </Col>
    </>
  );
}
