import React from "react";
import * as d3 from "d3";

const QuickFacts = props => {
  let commaSeparatedTotalConfirmed;
  let commaSeparatedTotalDeaths;
  let commaSeparatedTotalRecovered;

  const totalConfirmed = d3.sum(props.data, d => d.confirmed);
  commaSeparatedTotalConfirmed = totalConfirmed
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const totalDeaths = d3.sum(props.data, d => d.deaths);
  commaSeparatedTotalDeaths = totalDeaths
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const totalRecovered = d3.sum(props.data, d => d.recovered);
  commaSeparatedTotalRecovered = totalRecovered
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // console.log(totalConfirmed);
  return (
    <div className="quick-facts">
      <div className="coming-soon">
        <p>Coming soon:</p>
        <p style={{ textAlign: "start" }} className="coming-soon-wording">
          I'm working on making line graphs more interactive in such a way that
          hovering over the line will show more data related to a specific area
          on the line.
        </p>
      </div>
      <div className="quick-facts-heading">Highlights</div>
      <div className="quick-facts-stats">
        <div className="quick-facts-confirmed">
          {commaSeparatedTotalConfirmed}
        </div>
        <p style={{ marginTop: "0px", textAlign: "center" }}>
          total confirmed cases
        </p>

        <div>
          <div className="quick-facts-deaths">{commaSeparatedTotalDeaths}</div>
          <p style={{ marginTop: "0px", textAlign: "center" }}>total deaths</p>
        </div>

        <div>
          <div className="quick-facts-recovered">
            {commaSeparatedTotalRecovered}
          </div>
          <p style={{ marginTop: "0px", textAlign: "center" }}>
            total recovered
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickFacts;
