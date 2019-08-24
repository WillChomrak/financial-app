import React, { Component } from "react";

class BigMover extends Component {
  formatPercentage(percentage) {
    if (percentage.charAt(1) === "-") {
      return <span className="neg-percent">{percentage}</span>;
    } else {
      return <span className="pos-percent">{percentage}</span>;
    }
  }
  render() {
    return (
      <span className="mover">
        <p>
          <button
            onClick={this.props.onClick}
            name={this.props.data.ticker}
            className="link-company"
            href="#"
          >
            {this.props.data.companyName} {this.props.data.ticker}
          </button>
        </p>
        <p>
          ${this.props.data.price}{" "}
          {this.formatPercentage(this.props.data.changesPercentage)}
        </p>
      </span>
    );
  }
}

export default BigMover;
