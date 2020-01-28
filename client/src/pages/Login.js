import React, { Component } from "react";
import { Link } from "react-router-dom";

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
      spinner: false,
      data: {
        email: "",
        password: ""
      }
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      spinner: true
    });

    console.log(this.state.data);
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
    const toggleLoader = this.state.spinner ? (
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
              {toggleLoader}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
