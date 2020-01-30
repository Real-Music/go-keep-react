import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Component
import LogoAndTitle from "../components/LogoAndTitle";
import GoInput from "../components/GoInput";
import Spinner from "../components/Spinner";
import { createUser } from "../reducers/user/actions";

// Image
import createAccount from "../images/signup/create-account_2.png";

// css
import "../css/_signup.sass";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: { fname: "", lname: "", email: "", password: "", confirm: "" }
    };
  }

  // Hooks
  componentDidMount() {
    if (this.props.isLogin) this.props.history.push("/home");
  }

  componentDidUpdate() {
    if (this.props.isSignup.state) this.props.history.push("/");
  }

  handleChange = event => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    });
  };

  validatePassword = (password, confirm) => {
    if (password === confirm) {
      return true;
    }

    return false;
  };

  handleSubmit = event => {
    event.preventDefault();

    const { password, confirm } = this.state.data;
    if (this.validatePassword(password, confirm)) {
      delete this.state.data.confirm;

      let data = JSON.stringify(this.state.data);
      this.props.createCurrentUser(data);
    }
  };

  render() {
    const { isSignup, error, spinner } = this.props;

    const toggler = spinner ? (
      <Spinner />
    ) : (
      <button className="go-keep-btn">Next</button>
    );

    return (
      <div className="signup_container">
        <form onSubmit={this.handleSubmit}>
          <div className="singup_wrapper">
            {/* Our Form */}
            <section className="form_section">
              <LogoAndTitle title="Create your React Account" />
              <GoInput
                error={isSignup.error.fname}
                className="fname"
                name="fname"
                type="text"
                label="First name"
                value={this.state.data.fname}
                handler={this.handleChange}
              />
              <GoInput
                error={isSignup.error.lname}
                className="lname"
                name="lname"
                type="text"
                label="Last name"
                value={this.state.data.lname}
                handler={this.handleChange}
              />
              <GoInput
                error={isSignup.error.email}
                className="email"
                name="email"
                type="email"
                label="Email"
                value={this.state.data.email}
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
                error={isSignup.error.password}
                className="password"
                name="password"
                type="password"
                label="Password"
                isPassword={true}
                value={this.state.data.password}
                handler={this.handleChange}
              />

              <GoInput
                className="confirm"
                name="confirm"
                type="password"
                label="Confirm"
                isPassword={false}
                value={this.state.data.confirm}
                handler={this.handleChange}
              />
              <p className="gmail">
                Use 5 or more characters with a mix of letters, numbers &
                symbols
              </p>
              <div className="btn">
                <Link to="/">Sign in instead</Link>
                {toggler}
              </div>
            </section>

            {/* Our Image */}
            <section className="form_image">
              <p className="error">{error}</p>
              <img src={createAccount} alt="Sign Up" title="Signup Now" />
              <p>One account across all React App. </p>
            </section>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ error, isLogin, isSignup, spinner }) => ({
  error,
  isLogin,
  isSignup,
  spinner
});

// dispatch to store
const mapDispatchToProps = dispatch => ({
  createCurrentUser(user) {
    dispatch(createUser(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
