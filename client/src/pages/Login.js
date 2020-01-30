import React, { Component } from "react";
import { Link } from "react-router-dom";
// import API from "../utils/Api";
import { connect } from "react-redux";
import { getUser } from "../reducers/user/actions";

// components
import LogoAndTitle from "../components/LogoAndTitle";
import GoInput from "../components/GoInput";
import Spinner from "../components/Spinner";

// css
import "../css/_login.sass";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "",
        password: ""
      }
    };
  }

  componentDidMount() {
    if (this.props.isLogin) this.props.history.push("/home");
  }

  handleSubmit = async event => {
    event.preventDefault();

    let data = JSON.stringify(this.state.data);
    await this.props.getCurrentUser(data);
  };

  handleInputChange = event => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    });
  };

  render() {
    const toggleSpinner = this.props.spinner ? (
      <Spinner border={true} />
    ) : (
      <button className="go-keep-btn">Next</button>
    );

    return (
      <div className="login_container">
        <div className="login_wrapper">
          <form onSubmit={this.handleSubmit}>
            <LogoAndTitle title="Sign in" subtitle="Use your React Account" />

            <GoInput
              error={this.props.loginError}
              className="email"
              name="email"
              type="email"
              label="Email"
              value={this.state.data.email}
              handler={this.handleInputChange}
            />
            <GoInput
              name="password"
              type="password"
              label="Password"
              isPassword={true}
              value={this.state.data.password}
              handler={this.handleInputChange}
            />

            <div className="btn">
              <Link to="/signup">Create account</Link>
              {toggleSpinner}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ loginError, spinner, user, isLogin }) => ({
  loginError,
  spinner,
  user,
  isLogin
});

// dispatch to store
const mapDispatchToProps = dispatch => ({
  getCurrentUser(user) {
    dispatch(getUser(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
