import Header from "./header"; 
import Footer from "./footer";
import BreadcrumbHeader from "./header-breadcrumb";
import BackToTopButton from "@buttons/back-to-top-button";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <BreadcrumbHeader />
      <main>
        {children}
        <BackToTopButton />
      </main>
      <Footer /> 
    </>
  );
}
