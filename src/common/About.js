import React from "react";
import PublicIcon from "@material-ui/icons/Public";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <div className="about">
        <p>
          Hi, my name is Livingstone and I love visualizing data. On this
          2019nCoV visualizer, I'm taking information (data) since December 2019
          when the pandemic started in wuhan, China and placing it into a visual
          context, such as a 3D map or line graph. This kind of data
          visualizations make the big and small 2019nCoV data easier for the
          human brain to understand, and visualization also makes it easier to
          detect patterns, trends, and outliers in groups of data.
        </p>
        <p className="about-heading">Abstract</p>
        <p>
          The COVID-19 pandemic is considered as the most crucial global health
          calamity of the century and the greatest challenge that the humankind
          faced since the 2nd World War. In December 2019, a new infectious
          respiratory disease emerged in Wuhan, Hubei province, China and was
          named by the World Health Organization as COVID-19 (coronavirus
          disease 2019). A new class of corona virus, known as SARS-CoV-2
          (severe acute respiratory syndrome coronavirus 2) has been found to be
          responsible for occurrence of this disease. As far as the history of
          human civilization is concerned there are instances of severe
          outbreaks of diseases caused by a number of viruses. According to the
          report of the World Health Organization (WHO as of April 18 2020), the
          current outbreak of COVID-19, has affected over 50,000,000 people and
          killed more than 1,000,000 people in more than 200 countries
          throughout the world as of today. Till now there is no report of any
          clinically approved antiviral drugs or vaccines that are effective
          against COVID-19. It has rapidly spread around the world, posing
          enormous health, economic, environmental and social challenges to the
          entire human population. The coronavirus outbreak is severely
          disrupting the global economy. Almost all the nations are struggling
          to slow down the transmission of the disease by testing and treating
          patients, quarantining suspected persons through contact tracing,
          restricting large gatherings, maintaining complete or partial lock
          down etc. This paper describes the impact of COVID-19 on society and
          global environment, and the possible ways in which the disease can be
          controlled has also been discussed therein.
        </p>
        <p>
          According to official reports, the largest numbers of confirmed cases
          are in the United States, India, Brazil, Spain, and France. However,
          even the countries that the new coronavirus has hit less aggressively
          are still under considerable strain.
        </p>
        <p>
          More as 213 countries and territories have registered COVID-19 cases,
          and the entire world is buzzing with uncertainty and questions: How
          long will the pandemic last? What will people’s lives look like once
          the pandemic is over?
        </p>
        <p className="symptoms-link">
          <PublicIcon style={{ color: "blue", marginRight: "0.5rem" }} />
          Learn more on
          <a
            href="https://www.medicalnewstoday.com/articles/covid-19-global-impact-how-the-coronavirus-is-affecting-the-world#Too-little,-too-late?"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ marginLeft: "0.5rem" }}> medical news</span>
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
