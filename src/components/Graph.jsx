import React, { Component } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "../style/graph.css";

class Graph extends Component {
  scopeClass(bool) {
    if (bool === true) {
      return "graph-btn graph-btn-active";
    } else {
      return "graph-btn";
    }
  }
  render() {
    const data = this.props.data;
    return (
      <div className="component graph-component component-bg">
        <h3>
          {this.props.profile.companyName}
          {this.props.data.length === 5 && <span> 5-Year Opening</span>}{" "}
          {this.props.data.length === 12 && <span> 12-Month Opening</span>}{" "}
          Stock Price
        </h3>
        <button
          className={this.scopeClass(this.props.scopeClass)}
          onClick={this.props.graphScope}
          name="fiveY"
        >
          5-Year
        </button>
        <button
          className={this.scopeClass(!this.props.scopeClass)}
          onClick={this.props.graphScope}
          name="oneY"
        >
          12-Month
        </button>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ right: 45, bottom: 110, top: 10 }}>
            <Line type="monotone" dataKey="close" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis angle={-25} dataKey="date" />
            <Tooltip />
            <YAxis allowDecimals={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Graph;
