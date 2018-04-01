import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { t } from 'i18next';
import sha1 from 'js-sha1';
import { browserHistory } from 'react-router';
import { getQueries, removeQuery } from '../../../../lib/router';
import { validateUser } from '../../reducers/user';
import styles from './style.less';

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export class Login extends Component {
  constructor(props, context) {
    super(props, context);

    const queries = getQueries()
    const password = queries.p ? queries.p : '';

    this.state = {
      password,
      showError: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.validPassword) {
      this.props.validateUser();
      sleep(500);
      browserHistory.push('exchange');
    } else {
      removeQuery('p');
      this.setState({
        password: ''
      });
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  get validPassword() {
    const test = process.env.APP_SHA_KEY;
    const pass = sha1(this.state.password);

    return test == pass;
  }

  onChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validPassword) {
      this.props.validateUser();
      sleep(500);
      browserHistory.push('exchange');
    } else {
      this.setState({
        password: '',
        showError: true
      });
    }

  }

  render() {
    return (
      <div className={styles.root}>
        <div className="header-section">
            <div className="header-container w-container">
                <div className="header-row w-row">
                    <div className="logo-column w-col w-col-4">
                        <a href="https://www.blocksports.com" className="w-inline-block">
                            <img src="https://uploads-ssl.webflow.com/5a4bbb35b668780001b01cbf/5a5dff58a0eb5000019e6ef7_Block%20Sports%20Logo.svg" height="31" alt="Block Sports"/>
                        </a>
                    </div>
                    <div className="links-column w-col w-col-8"></div>
                </div>
            </div>
        </div>
        <div className="utility-page-wrap">
            <div className="utility-page-content-copy w-password-page w-form">
                <form className="utility-page-form w-password-page" onSubmit={this.handleSubmit}>
                    <img src="https://uploads-ssl.webflow.com/5a4bbb35b668780001b01cbf/5a55c15429f1720001df7d13_bsx-protected.svg" width="103" className="image-13"/>
                    <h2 className="heading-6">Protected page</h2>
                    <div className="div-block-34">
                        <input type="password" value={this.state.password} name="pass" placeholder="Enter your password" maxLength="256" autoFocus="true" className="text-field-2 w-password-page w-input" onChange={this.onChange}/>
                        <input type="submit" value="→" data-wait="Loading..." className="submit-button w-password-page w-button"/>
                    </div>
                    {this.state.showError && <div className="error-message-2">Incorrect password. Please try again.</div>}
                </form>
            </div>
        </div>    
      </div>
    );
  }
}

Login.propTypes = {

};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateUser: (...args) => {
			return dispatch(validateUser(...args));
		},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
