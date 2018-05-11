import React, { Component } from "react";
import { I18nProvider, Trans, DateFormat } from "@lingui/react";
import { connect } from "react-redux";
import { setLanguage } from "../actions/language";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    catalogs: undefined
  };

  loadCatalog = async language => {
    const catalog = await import(`@lingui/loader!../../locale/${language}/messages.json`);
    this.setState(state => ({
      catalogs: {
        ...state.catalogs,
        [language]: catalog
      }
    }));
  }

  componentDidMount() {
    this.loadCatalog(this.props.language);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { language } = nextProps;
    const { catalogs } = nextState;

    if (language !== this.props.language && !catalogs[language]) {
      this.loadCatalog(language);
      return false;
    }
    return true;
  }
  
  handleSetLanguage = (e) => {
    const { dispatch } = this.props;
    dispatch(setLanguage(e.target.value));
  };

  render() {
    const { language } = this.props;
    const { catalogs } = this.state;
    const currentDate = new Date();

    return (
      <I18nProvider language={language} catalogs={catalogs}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">
              <Trans>Welcome to React</Trans>
            </h1>
          </header>
          <p className="App-intro">
            <Trans>To get started, edit <code>src/App.js</code> and save to reload.</Trans>
          </p>
          <p className="App-intro">
            <Trans>Today is <DateFormat value={currentDate} />.</Trans>
          </p>
          <select onChange={this.handleSetLanguage} defaultValue={language}>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </I18nProvider>
    );
  }
}

const mapStateToProps = state => {
  const { language } = state;
  return { language };
};

export default connect(mapStateToProps)(App);
