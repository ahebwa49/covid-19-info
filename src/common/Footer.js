import React from "react";

const FooterNote = () => {
  const styles = {
    footernote: {
      display: "flex",
      justifyContent: "center",
      justifySelf: "center",
      margin: "1rem",
      color: "#110a57"
    }
  };
  return <div style={styles.footernote}>&#169;2020 Livingstone Asabahebwa</div>;
};
export default FooterNote;
