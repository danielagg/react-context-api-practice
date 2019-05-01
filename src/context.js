import React, { Component } from "react";
import Axios from "axios";

const Context = React.createContext();

export const Consumer = Context.Consumer;

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        track_list: action.payload,
        heading: "Search Results"
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    heading: "Top 10 tracks in Hungary",
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    Axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=hu&f_has_lyrics=1&apikey=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(res => this.setState({ track_list: res.data.message.body }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
