import React, { Component } from 'react';
import { I18nProvider } from '@lingui/react';
import { connect } from 'react-redux';

const withI18nLoader = WrappedComponent => {
  class I18nLoader extends Component {
    state = {
      catalogs: {}
    };

    loadCatalog = async language => {
      const catalog = await import(
        /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
        `@lingui/loader!../locale/${language}/messages.json`
      );
      this.setState(state => ({
        catalogs: {
          ...state.catalogs,
          [language]: catalog
        }
      }));
    };

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

    render() {
      const { language } = this.props;
      const { catalogs } = this.state;

      return (
        <I18nProvider language={language} catalogs={catalogs}>
          <WrappedComponent />
        </I18nProvider>
      );
    }
  }

  const mapStateToProps = state => {
    const { language } = state;
    return { language };
  };

  return connect(mapStateToProps)(I18nLoader);
};

export default withI18nLoader;
