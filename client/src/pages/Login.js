import React, { Component } from "react";
import Link from "react-router-dom/Link";

// components
import LogoAndTitle from "../components/LogoAndTitle";

// css
import "../css/_login.sass";
import GoInput from "../components/GoInput";
import Spinner from "../components/Spinner";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false
    };
  }
  handleSubmit = () => {
    this.setState({
      spinner: true
    });
  };
  button = () => {
    return this.state.spinner ? (
      <Spinner border={true} />
    ) : (
      <button onClick={() => this.handleSubmit()} className="go-keep-btn">
        Next
      </button>
    );
  };

  render() {
    return (
      <div className="login_container">
        <div className="login_wrapper">
          <LogoAndTitle title="Sign in" subtitle="Use your React Account" />
          <GoInput label="Email" />
          <GoInput label="Password" isPassword={true} />

          <div className="btn">
            <Link to="/signup">Create account</Link>
            {this.button()}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
