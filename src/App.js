import React, { Component } from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Graph from "./components/Graph";
import BigMovers from "./components/BigMovers";

import "./App.css";

import {
  getCompList,
  getMostActive,
  getProfile,
  getHistorical
} from "./models/apiSearch";
import { sortHistorical } from "./models/sortHistorical";
import { getFuzzyMatch } from "./models/fuzzySearch";

class App extends Component {
  state = {
    compData: {},
    profile: {
      symbol: undefined,
      profile: {
        price: undefined,
        companyName: undefined,
        image: undefined,
        description: undefined,
        sector: undefined,
        beta: undefined,
        changes: undefined
      }
    },
    rawHist: {},
    filteredHist: [],
    searchMatches: [],
    mostActive: {},
    query: undefined,
    scope5y: true
  };

  async componentDidMount() {
    try {
      // API search for company names with codes
      const compData = await getCompList();
      const mostActive = await getMostActive();
      // get data for specific company (amazon default);
      const [profile, rawHist, filteredHist] = await this.getSingleCompData(
        "AMZN"
      );
      // store data in state
      this.setState({ compData, mostActive, profile, rawHist, filteredHist });
    } catch (err) {
      console.log("Mounting error: ", err);
    }
  }

  queryHandler = e => {
    let query = e.target.value;
    this.setState({ query });
  };

  getSingleCompData = async symbol => {
    try {
      let filteredHist;
      const profile = await getProfile(symbol);
      const rawHist = await getHistorical(symbol);
      if (this.state.scope5y) {
        filteredHist = await sortHistorical(rawHist, 2015, 2019);
      } else {
        filteredHist = await sortHistorical(rawHist, 1, 12, 2018);
      }
      return [profile, rawHist, filteredHist];
    } catch (err) {
      console.log("getSingleCompData error: ", err);
    }
  };

  onSubmitSearch = async e => {
    try {
      // prevent reload
      e.preventDefault();
      // get user search query
      const query = e.target.company.value;
      if (query) {
        this.setState({ query });

        this.setState({ query: undefined });

        // perform fuzzy search
        let fuzzy = await getFuzzyMatch(this.state.compData, query);

        // if more than one result below difference threshold
        if (fuzzy.length > 1 && fuzzy[1].score < 0.01) {
          // This sets array of results to state
          // this state change triggers a request for the user to specify which company
          // they wish to view data on
          this.setState({ searchMatches: fuzzy });
        } else if (fuzzy.length === 0) {
          this.setState({ searchMatches: [false] });
        } else {
          const [profile, rawHist, filteredHist] = await this.getSingleCompData(
            fuzzy[0].item.symbol
          );
          this.setState({
            profile,
            rawHist,
            filteredHist,
            searchMatches: [],
            query: ""
          });
        }
      }
    } catch (err) {
      console.log("onSubmitSearch error: ", err);
    }
  };

  onClickSearch = async e => {
    try {
      let symbol = e.target.name;
      const [profile, rawHist, filteredHist] = await this.getSingleCompData(
        symbol
      );
      this.setState({
        profile,
        rawHist,
        filteredHist,
        searchMatches: [],
        query: ""
      });
    } catch (err) {
      console.log("anClickSearch error: ", err);
    }
  };

  graphController = async e => {
    try {
      // prevent page reload
      e.preventDefault();
      const name = e.target.name;
      let filteredHist;
      if (name === "fiveY") {
        filteredHist = await sortHistorical(this.state.rawHist, 2015, 2019);
        this.setState({ scope5y: true });
      } else {
        filteredHist = await sortHistorical(this.state.rawHist, 1, 12, 2018);
        this.setState({ scope5y: false });
      }
      this.setState({ filteredHist });
    } catch (err) {
      console.log("graphController error: ", err);
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Search
          onSubmit={this.onSubmitSearch}
          searchMatches={this.state.searchMatches}
          onClarify={this.onClickSearch}
          searchValue={this.state.queryHandler}
          handleChange={this.queryHandler}
          query={this.state.query}
        />
        <Profile
          profile={this.state.profile.profile}
          symbol={this.state.profile.symbol}
        />
        <Graph
          profile={this.state.profile.profile}
          data={this.state.filteredHist}
          graphScope={this.graphController}
          scopeClass={this.state.scope5y}
        />
        <BigMovers
          movers={this.state.mostActive}
          onClick={this.onClickSearch}
        />
      </div>
    );
  }
}

export default App;
