import React from "react";
import PublicIcon from "@material-ui/icons/Public";
import Footer from "./Footer";

export const Transmission = () => {
  return (
    <>
      <div className="transmission">
        <p className="transmission-heading">How is COVID-19 transmitted?</p>
        <p>
          COVID-19 is a respiratory illness and the primary transmission route
          is through person-to- person contact and through direct contact with
          respiratory droplets generated when an infected person coughs or
          sneezes.
        </p>
        <p>
          There is no evidence to date of viruses that cause respiratory
          illnesses being transmitted via food or food packaging. Coronaviruses
          cannot multiply in food; they need an animal or human host to
          multiply.
        </p>
        <p>
          The most recent advice from the WHO3 is that current evidence
          indicates that COVID-19 virus is transmitted during close contact
          through respiratory droplets (formed on coughing or sneezing) and by
          fomites. The virus can spread directly from person-to-person when a
          COVID-19 case coughs or sneezes, producing droplets are too heavy to
          be airborne, they land on objects and surfaces surrounding the
          infected person.
        </p>
        <p className="transmission-heading">
          Can the coronavirus spread via feces?
        </p>
        <p>
          There is some evidence that COVID-19 infection may lead to intestinal
          infection and be present in faeces. However, to date only one study
          has cultured the COVID-19 virus from a single stool specimen. There
          have been no reports of faecal−oral transmission of the COVID-19 virus
          to date.
        </p>
        <p className="transmission-heading">
          Can asymptomatic patients transmit COVID-19?
        </p>
        <p>
          Available evidence from contact tracing reported by countries suggests
          that asymptomatically infected individuals are much less likely to
          transmit the virus than those who develop symptoms.
        </p>
        <p>
          A subset of studies and data shared by some countries on detailed
          cluster investigations and contact tracing activities have reported
          that asymptomatically-infected individuals are much less likely to
          transmit the virus than those who develop symptoms.
        </p>
        <p>
          Comprehensive studies on transmission from asymptomatic patients are
          difficult to conduct, as they require testing of large population
          cohorts and more data are needed to better understand and quantified
          the transmissibility of SARS-CoV-2. WHO is working with countries
          around the world, and global researchers, to gain better
          evidence-based understanding of the disease as a whole, including the
          role of asymptomatic patients in the transmission of the virus.
        </p>
        <p className="transmission-heading">
          Can a coronavirus be transmitted from person to person?
        </p>
        <p>
          Yes, some coronaviruses can be transmitted from person to person,
          usually after close contact with an infected patient, for example, in
          a household workplace, or health care centre.
        </p>
        <p className="symptoms-link">
          <PublicIcon style={{ color: "blue", marginRight: "0.5rem" }} />
          Learn more on
          <a
            href="https://www.who.int/news-room/q-a-detail/q-a-coronaviruses#:~:text=transmission"
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
