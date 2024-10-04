import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="bg-light text-dark mt-5 py-4">
      <Container>
        <Row>
          <Col xs={12} md={6} className="text-start text-md-start mb-3 mb-md-0">
            <h5>Country Rank</h5>
            <p>
              Discover population data and rankings across countries worldwide.
              Stay updated with accurate and comprehensive demographic insights.
            </p>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end">
            <h5>Connect With Us</h5>
            <p className="d-flex justify-content-center justify-content-md-end gap-3">
              <a
                href="mailto:info@populationrank.com"
                className="text-center text-dark text-md-end"
              >
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
              </a>
              <a
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark"
              >
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
            </p>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <p>
            &copy; {new Date().getFullYear()} Population Rank. All Rights
            Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
