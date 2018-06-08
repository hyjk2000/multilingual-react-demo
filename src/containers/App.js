import React, { Component } from 'react';
import { Trans, DateFormat, NumberFormat, Select, Plural } from '@lingui/react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withI18nLoader from '../hocs/withI18nLoader';
import { setLanguage } from '../actions/language';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    currentDate: new Date(),
    gender: 'unspecified',
    count: 0,
    amount: 1234.56
  };

  handleSetLanguage = e => this.props.setLanguage(e.target.value);

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { language } = this.props;
    const { currentDate, gender, count, amount } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            <Trans>Welcome to React</Trans>
          </h1>
        </header>
        <p className="App-intro">
          <select onChange={this.handleSetLanguage} defaultValue={language}>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="zh">中文</option>
          </select>
        </p>
        <p className="App-intro">
          <Trans>
            To get started, edit <code>src/App.js</code> and save to reload.
          </Trans>
        </p>
        <p className="App-intro">
          <Trans>
            Today is <DateFormat value={currentDate} />.
          </Trans>
        </p>
        <p className="App-intro">
          <Trans>
            That'll be
            <NumberFormat
              value={amount}
              format={{
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2
              }}
            />.
          </Trans>
        </p>
        <p className="App-intro">
          <select
            name="gender"
            onChange={this.handleChange}
            defaultValue={gender}
          >
            <option value="male">♂</option>
            <option value="female">♀</option>
            <option value="unspecified">?</option>
          </select>
          <input
            type="number"
            name="count"
            min="0"
            style={{ width: '3em' }}
            onChange={this.handleChange}
            defaultValue={count}
          />
          <br />
          <Select value={gender} male="His" female="Her" other="Their" />
          &nbsp;
          <Plural value={count} one="# child" other="# children" />
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { language } = state;
  return { language };
};

export default compose(withI18nLoader)(
  connect(
    mapStateToProps,
    { setLanguage }
  )(App)
);
