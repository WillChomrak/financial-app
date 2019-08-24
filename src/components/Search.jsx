import React, { Component } from "react";
import "../style/search.css";

class Search extends Component {
  state = {
    query: undefined
  };
  //clarify = sym => this.props.onClarify(sym);
  renderMatches(matches, num = 3) {
    let i;
    let html = [];
    for (i = 0; i < num; i++) {
      html.push(
        <li key={i}>
          <button
            className="link-company"
            name={matches[i].item.symbol}
            onClick={this.props.onClarify}
            href="#"
          >
            {matches[i].item.name}
          </button>
        </li>
      );
    }
    return html;
  }
  didYouMean(matches) {
    if (this.props.searchMatches[1]) {
      //const clarify = sym => this.props.onClarify(sym);
      return (
        <ul className="did-you-mean">
          <li>Did you mean?</li>
          {this.renderMatches(matches)}
        </ul>
      );
    } else if (this.props.searchMatches[0] === false) {
      return (
        <ul className="did-you-mean">
          <li>No matches. Please try another query.</li>
        </ul>
      );
    }
  }
  clearSearch(e) {
    console.log(e);
  }
  render() {
    return (
      <div className="search-component component">
        <form autoComplete="off" onSubmit={this.props.onSubmit}>
          <input
            type="text"
            name="company"
            placeholder="Search"
            value={this.props.query}
            onChange={this.props.handleChange}
          />
          <button type="submit">
            <i className="fas fa-search-dollar icon" />
          </button>
        </form>
        {this.didYouMean(this.props.searchMatches)}
      </div>
    );
  }
}

export default Search;
