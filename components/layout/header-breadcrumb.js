import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useRouter } from 'next/router'

export default function BreadcrumbHeader() {
  const router = useRouter() 
  const link = router.route.replaceAll('-', ' ').split("/"); 


  return (
    <>
      <Breadcrumb className="position-absolute mt-1 ms-1">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item  
        className="text-capitalize">
          {link[1]}
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="text-capitalize">{link[2]}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}
