import React from "react";
import PublicIcon from "@material-ui/icons/Public";
import Footer from "./Footer";

const Symptoms = () => {
  return (
    <>
      <div className="symptoms">
        <p>
          COVID-19 affects different people in different ways. Most infected
          people will develop mild to moderate illness and recover without
          hospitalization.
        </p>
        <p className="symptoms-heading">Most common symptoms:</p>
        <ul>
          <li>fever</li>
          <li>dry cough</li>
          <li>tiredness</li>
        </ul>
        <p className="symptoms-heading">Less common symptoms:</p>
        <ul>
          <li>aches and pains</li>
          <li>sore throat</li>
          <li>diarrhoea</li>
          <li>conjunctivitis</li>
          <li>headache</li>
          <li>loss of taste or smell</li>
          <li>a rash on skin, or discolouration of fingers or toes</li>
        </ul>
        <p className="symptoms-heading">Serious symptoms:</p>
        <ul>
          <li>difficulty breathing or shortness of breath</li>
          <li>chest pain or pressure</li>
          <li>loss of speech or movement</li>
        </ul>
        <p>
          Seek immediate medical attention if you have serious symptoms. Always
          call before visiting your doctor or health facility.
        </p>
        <p>
          People with mild symptoms who are otherwise healthy should manage
          their symptoms at home.
        </p>
        <p>
          On average it takes 5–6 days from when someone is infected with the
          virus for symptoms to show, however it can take up to 14 days.
        </p>
        <p className="symptoms-link">
          <PublicIcon style={{ color: "blue", marginRight: "0.5rem" }} />
          Learn more on
          <a
            href="https://www.who.int/news-room/q-a-detail/q-a-coronaviruses#:~:text=symptoms"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ marginLeft: "0.5rem" }}> who.int</span>
          </a>
        </p>
        <p className="symptoms-note">
          For informational purposes only. Consult your local medical authority
          for advice.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Symptoms;
