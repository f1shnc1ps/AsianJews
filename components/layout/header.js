import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Menuitems from "@data/menu.json";
import LogoHeader from "./header-logo";
import { motion } from "framer-motion";

export default function Header() {
  const [expanded, setExpanded] = useState(false);

  const ddcontainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const dditem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <LogoHeader />

      <Navbar
        className="menu py-0 bg-header"
        sticky="top"
        expand="lg"
        expanded={expanded}
      >
        <Navbar.Brand className="mx-auto">
          <div className="d-sm-block d-md-block d-lg-none">
            <Image
              className="mobile-logo img-fluid ms-lg-5"
              src="/images/asblogo.png"
              // layout="fixed"
              width="300"
              height="60"
              alt="Asian School Bharain"
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          className="my-0 me-2 border-0"
          aria-controls="basic-navbar-nav"
          data-bs-toggle="collapse"
          data-bs-target="#basic-navbar-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-0 py-0">
            <ul className="navbar-nav">
              {Menuitems.menu.mainmenu.map((item, index) => {
                if (!item.children)
                  return (
                    <li
                      className="nav-item text-uppercase text-center"
                      key={index}
                    >
                      <Link href={item.URL} 
                          className="header nav-link"
                          onClick={() => setExpanded(false)}
                        >
                          {item.name} 
                      </Link>
                    </li>
                  );
                {
                  return (
                    <NavDropdown
                      className="text-uppercase text-center position-static py-0 "
                      title={item.name}
                      id="nav-dropdown"
                      key={index}
                      renderMenuOnMount={true}
                    >
                      <motion.ul
                        className=" d-lg-flex list-group-horizontal justify-content-around"
                        variants={ddcontainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {item.children.map((item, index) => (
                          <motion.li
                            key={index}
                            className="nav-item "
                            variants={dditem}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{
                              scale: 0.98, 
                              borderRadius: "100%",
                            }}
                            transition={{ type: "spring" }}
                          >
                            <Link href={item.URL} 
                                className="dropdown-item"
                                onClick={() => setExpanded(false)}
                              >
                                {item.name} 
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </NavDropdown>
                  );
                }
              })}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
