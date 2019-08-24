import React, { Component } from "react";
import BigMover from "./BigMover";
import "../style/big-movers.css";

class BigMovers extends Component {
  // formatPercentage(percentage) {
  //   if (percentage.charAt(1) === "-") {
  //     return <span className="neg-percent">{percentage}</span>;
  //   } else {
  //     return <span className="pos-percent">{percentage}</span>;
  //   }
  // }
  renderMovers() {
    let movers = undefined;
    if (this.props.movers[0]) {
      movers = this.props.movers.map((c, i) => {
        return <BigMover key={i} onClick={this.props.onClick} data={c} />;
      });
      movers = movers.slice(0, 5);
      return movers;
    }
  }
  render() {
    // const {
    //   ticker,
    //   changes,
    //   price,
    //   changesPercentage,
    //   companyName
    // } = this.props.mostActive;
    return (
      <div className="component big-movers-component component-bg">
        <h3>Big Movers Today</h3>
        <span>{this.renderMovers()}</span>
      </div>
    );
  }
}

export default BigMovers;
