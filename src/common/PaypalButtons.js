import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import scriptLoader from "react-async-script-loader";
import Spinner from "./Spinner";
import Loader from "./Loader"

const CLIENT = {
  sandbox: process.env.REACT_APP_SANDBOX,
  production: process.env.REACT_APP_PRODUCTION
};

const CLIENT_ID =
  process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;
//create button here
let PayPalButton = null;

// next create the class and Bind React and ReactDom to window
//as we will be needing them later

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
      name: ""
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }
  //...

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Coffee",
          amount: {
            currency_code: "USD",
            value: 5
          }
        }
      ]
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      // console.log("Payment Approved: ", details);
      this.setState({
        showButtons: false,
        paid: true,
        name: details.payer.name.given_name
      });
    });
  };

  render() {
    const { showButtons, loading, paid, name } = this.state;

    return (
      <div className="coffee-payment-page">
        {loading && <Loader />}

        {showButtons && (
          <div>
            <div>
              <p>Items: Coffee</p>
              <p>Amount: $5</p>
            </div>

            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
            <p style={{ textAlign: "center" }}>
              <Link to="/">Cancel</Link>
            </p>
          </div>
        )}

        {paid && (
          <div className="successful-purchase">
            <p>
              Congrats {name.length > 0 ? `${name}` : ""}! you just bought me a
              Coffee
              <span role="img" aria-label="emoji">
                {" "}
                😉
              </span>
            </p>

            <p>
              <Link to="/">back home</Link>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`
)(PaypalButton);
