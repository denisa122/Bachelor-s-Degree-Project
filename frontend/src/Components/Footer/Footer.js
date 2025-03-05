import React from "react";

import "./Footer.css";

import GitHubIcon from "../../assets/github.png";
import EmailIcon from "../../assets/email.png";
import PhoneIcon from "../../assets/phone.png";
import LocationIcon from "../../assets/location.png";

const Footer = () => {
  return (
    <footer>
      <div className="footerContent">
        <div className="contactDetails">
          <div className="footerItem">
            <span className="font-medium mb-1.5">Contact</span>
          </div>
          <div className="footerItem">
            <img src={GitHubIcon} alt="github icon" className="iconFooter"></img>
            <a
              href="https://github.com/denisa122"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Profile
            </a>
          </div>

          <div className="footerItem">
            <img src={EmailIcon} alt="email icon" className="iconFooter"></img>
            <span>denisaneagu122@yahoo.com</span>
          </div>

          <div className="footerItem">
            <img src={PhoneIcon} alt="phone icon" className="iconFooter"></img>
            <span>+61 415 954 081</span>
          </div>

          <div className="footerItem">
            <img src={LocationIcon} alt="location icon" className="iconFooter"></img>
            <span>Hamilton Hill, Perth WA</span>
          </div>
        </div>

        <div className="pt-[80px]">
          <p>&copy; 2025 Denisa-Gabriela Neagu</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
