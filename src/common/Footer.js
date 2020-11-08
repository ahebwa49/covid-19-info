import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailIcon from "@material-ui/icons/Mail";

const FooterNote = () => {
  const styles = {
    footernote: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "1rem",
      color: "#110a57"
    }
  };
  return (
    <div className="footer-note">
      <div>&#169;2020 Livingstone Asabahebwa</div>
      <div className="footer-icons">
        <span>
          <a
            href="https://twitter.com/lasabahebwa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="twitter-icon" />
          </a>
        </span>
        <span>
          <a
            href="https://github.com/ahebwa49"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="github-icon" />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/livingstone-asabahebwa-290594108/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon className="linkedin-icon" />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/livingstone-asabahebwa-290594108/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MailIcon className="mail-icon" />
          </a>
        </span>
      </div>
    </div>
  );
};
export default FooterNote;
