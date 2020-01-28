import React, { Component } from "react";
import { Link } from "react-router-dom";

// Component
import LogoAndTitle from "../components/LogoAndTitle";
import GoInput from "../components/GoInput";

// Image
import createAccount from "../images/signup/create-account_2.png";

// css
import "../css/_signup.sass";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="signup_container">
        <form>
          <div className="singup_wrapper">
            {/* Our Form */}
            <section className="form_section">
              <LogoAndTitle title="Create your React Account" />
              <GoInput
                className="fname"
                name="fname"
                type="text"
                label="First name"
                value={this.state.fname}
                handler={this.handleChange}
              />
              <GoInput
                className="lname"
                name="lname"
                type="text"
                label="Last name"
                value={this.state.lname}
                handler={this.handleChange}
              />
              <GoInput
                className="email"
                name="email"
                type="email"
                label="Email"
                value={this.state.email}
                handler={this.handleChange}
              />
              <div className="email_info">
                <p>Don't have an emial, click below!</p>
                <a
                  href="https://accounts.google.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Create a new email
                </a>
              </div>
              <GoInput
                className="password"
                name="password"
                type="password"
                label="Password"
                isPassword={true}
                value={this.state.password}
                handler={this.handleChange}
              />

              <GoInput
                className="confirm"
                name="password"
                type="password"
                label="Confirm"
                isPassword={true}
                value={this.state.password}
                handler={this.handleChange}
              />
              <p className="gmail">
                Use 5 or more characters with a mix of letters, numbers &
                symbols
              </p>
              <div className="btn">
                <Link to="/">Sign in instead</Link>
                <button className="go-keep-btn">Next</button>
              </div>
            </section>

            {/* Our Image */}
            <section className="form_image">
              <img src={createAccount} alt="Sign Up" />
              <p>One account. All of Google working for you.</p>
            </section>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
