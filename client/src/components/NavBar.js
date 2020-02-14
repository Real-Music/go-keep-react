import React, { Component } from "react";
import { connect } from "react-redux";
import { changeLayout } from "../reducers/layout/actions";

// css
import "../css/_navBar.sass";

// image
import logo from "../images/keep.png";
import { changeProfile, updateAccount } from "../reducers/user/actions";

class NavBar extends Component {
  constructor(props) {
    super(props);
    const { fname, lname, email } = this.props.user;

    this.state = {
      isFocus: "",
      imagePreviewUrl: "",
      edit: false,
      showAccount: false,
      showSetting: false,
      data: {
        fname: fname,
        lname: lname,
        email: email
      }
    };
  }

  handleClick = () => {
    if (this.state.isFocus === "") {
      this.setState({
        ...this.state,
        isFocus: "focus"
      });
    }
  };

  handleMouseLeave = () => {
    if (this.state.isFocus === "focus") {
      this.setState({
        ...this.state,
        isFocus: ""
      });
    }
  };

  handleImageChange = event => {
    const { setUserProfile } = this.props;
    event.preventDefault();

    let form = new FormData();
    let reader = new FileReader();
    let file = event.target.files[0];
    const { userId, token } = this.props;

    reader.onloadend = () => {
      this.setState({
        ...this.state,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
    form.append("profileImg", file);

    // TODO to be completed
    setUserProfile(userId, form, token);
  };

  handleChange = event => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    });
  };

  handleUpdateAccount = event => {
    event.preventDefault();
    const { id, fname, lname, email } = this.props.user;
    const { setUpdateAccount, token } = this.props;
    let data = this.state.data;

    if (fname === data.fname && lname === data.lname && email === data.email) {
      return;
    }

    data = JSON.stringify(data);
    setUpdateAccount(id, data, token);
  };

  handleSettings = event => {
    if (event.target.className === "settings") {
      this.setState({
        ...this.state,
        showAccount: false,
        edit: false,
        showSetting: !this.state.showSetting
      });
    }
  };

  handleAccountSetting = event => {
    if (event.target.className === "my_account") {
      this.setState({
        ...this.state,
        edit: false,
        showSetting: false,
        showAccount: !this.state.showAccount
      });
      return;
    }
  };

  handleReset = () =>
    this.setState({
      ...this.state,
      edit: false,
      showSetting: false,
      showAccount: false
    });

  handleLayout = () => {
    const { toggleLayout, layout } = this.props;
    toggleLayout(!layout);
  };

  render() {
    const { fname, lname, email, profileImg } = this.props.user;
    const { handleRefresh, layout } = this.props;

    const togCross =
      this.state.isFocus !== "" ? (
        <button className="icon">
          <svg
            focusable="false"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>
        </button>
      ) : (
        false
      );

    return (
      <nav className="nav_container">
        <div className="nav_wrapper">
          {/* Logo */}
          <div className="logo_3_strip">
            <div className="strip" onClick={this.props.sideBar}>
              <span></span>
            </div>
            <div className="logo">
              <img src={logo} alt="React Keep" height="45" />
              <h3>React Keep</h3>
            </div>

            <p className="tag">Main Menu</p>
          </div>

          {/* Search */}
          <div
            className="search_wrapper"
            onBlur={() => this.handleMouseLeave()}
          >
            <div className={`search_bar ${this.state.isFocus}`}>
              <div className="icon">
                <svg
                  focusable="false"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
                  <path d="M0,0h24v24H0V0z" fill="none"></path>
                </svg>
              </div>
              <input
                autoComplete="off"
                onFocus={() => this.handleClick()}
                type="text"
                name="search"
                id="search"
                placeholder="Search"
              />
              {togCross}
            </div>
            {/* <p className="tag">Search</p> */}
          </div>

          {/* Account */}
          <div className="account">
            <div className="refresh_btn" onClick={handleRefresh}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
              </svg>
              <p className="tag">Refresh</p>
            </div>
            <div className="grid_layout_btn" onClick={this.handleLayout}>
              {layout ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
              ) : (
                <span></span>
              )}
              <p className="tag">List View</p>
            </div>
            <div
              className="settings"
              onClick={this.handleSettings}
              tabIndex="0"
              onBlur={this.handleReset}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
              </svg>
              <p className="tag">Settings</p>
              <div
                className={`gen-settings ${
                  this.state.showSetting ? "show" : ""
                }`}
              >
                <ul>
                  <li>Disable dark theme</li>
                  <li>Send Feedback</li>
                  <li>Help</li>
                </ul>
              </div>
            </div>
            <div className="my_account" onClick={this.handleAccountSetting}>
              <img src={profileImg} alt="" />
              <p className="tag">React Account</p>
              <div
                className={`acc_settings ${
                  this.state.showAccount ? "show" : ""
                }`}
              >
                <div className="profile">
                  <div className="img">
                    <img src={profileImg} alt={`${fname} ${lname}`} />
                    <form action="#">
                      <label htmlFor="profileImg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="3.2" />
                          <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                        </svg>
                      </label>
                      <input
                        onChange={this.handleImageChange}
                        type="file"
                        name="profileImg"
                        id="profileImg"
                      />
                    </form>
                  </div>
                  <div>
                    <h4>{`${fname} ${lname}`}</h4>
                    <small>{email}</small>
                  </div>
                  <button
                    onClick={() =>
                      this.setState({ ...this.state, edit: !this.state.edit })
                    }
                    className="go-keep-btn edit"
                  >
                    Edit your React Account
                  </button>
                </div>
                <div
                  className={`update_profile ${this.state.edit ? "show" : ""}`}
                >
                  <form>
                    <div className="go-form-group">
                      <input
                        type="text"
                        value={this.state.data.fname}
                        onChange={this.handleChange}
                        name="fname"
                        id="fname"
                      />
                    </div>

                    <div className="go-form-group">
                      <input
                        type="text"
                        value={this.state.data.lname}
                        onChange={this.handleChange}
                        name="lname"
                        id="lname"
                      />
                    </div>

                    <div className="go-form-group">
                      <input
                        type="text"
                        value={this.state.data.email}
                        onChange={this.handleChange}
                        name="email"
                        id="email"
                      />
                    </div>

                    <button
                      className="go-keep-btn"
                      onClick={this.handleUpdateAccount}
                    >
                      Update Profile
                    </button>
                  </form>
                </div>
                <div className="logout">
                  <button className="go-keep-btn">Logout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ spinner, user, token, layout }) => ({
  spinner,
  user,
  token,
  userId: user["id"],
  layout: layout["layout"]
});

// dispatch to store
const mapDispatchToProps = dispatch => ({
  setUserProfile(userId, user, token) {
    dispatch(changeProfile(userId, user, token));
  },
  setUpdateAccount(userId, user, token) {
    dispatch(updateAccount(userId, user, token));
  },
  toggleLayout(boolean) {
    dispatch(changeLayout(boolean));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
