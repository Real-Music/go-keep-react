import React, { Component } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Notes from "../components/Notes";
import NewNote from "../components/NewNote";

// actions
import {
  createNote,
  fetchPinNotes,
  fetchUnpinNotes
} from "../reducers/notes/actions";

// css
import "../css/_home.sass";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reload: false,
      isActive: "",
      showBody: false,
      placeHolder: "Take a note...",
      data: {
        title: "",
        body: "",
        pin: false
      }
    };
  }

  // Hooks
  componentDidMount() {
    if (!this.props.isLogin) {
      this.props.history.push("/");
    }
  }

  componentWillMount() {
    const { fetchPinNotes, fetchUnpinNotes, userId, token } = this.props;
    fetchPinNotes(userId, token);
    fetchUnpinNotes(userId, token);
  }

  handleRefresh = () =>
    this.setState({ ...this.state, reload: !this.state.reload });

  handleSideBar = () => {
    if (this.state.isActive === "") {
      this.setState({ ...this.state, isActive: "active" });
    } else {
      this.setState({ ...this.state, isActive: "" });
    }
  };

  handleKeyPress = event => {
    let body = event.target;
    setTimeout(function() {
      body.style.cssText = "height:auto; padding:0";
      body.style.cssText = "height:" + body.scrollHeight + "px";
    }, 0);

    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        body: event.target.value
      }
    });
  };

  handleFocus = () => {
    this.setState({
      ...this.state,
      showBody: true,
      placeHolder: "Title"
    });
  };

  // New Note title conten
  handleTitle = event =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, title: event.target.value }
    });

  // New Note body content
  handleBlur = event => {
    if (
      event.target.name === "body" ||
      event.target.name === "title" ||
      event.target.className === "icons" ||
      event.target.tagName === "BUTTON" ||
      event.target.className === "new_note_wrapper" ||
      event.target.className === "title" ||
      event.target.className === "icon_items" ||
      event.target.className === "icon_items " ||
      event.target.className === "icon_items pin"
    ) {
      return;
    } else {
      this.setState({
        ...this.state,
        showBody: false,
        placeHolder: "Take a note...",
        data: { title: "", body: "", pin: false }
      });
    }
  };

  // Handle Pin Note
  handlePin = () => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, pin: !this.state.data.pin }
    });
  };

  // New Note
  newNote = () => {
    const { userId } = this.props;
    let data = this.state.data;
    data["UserId"] = userId;
    data = JSON.stringify(data);

    this.props.createNote(data, this.props.token);
  };
  render() {
    const { pin, unpin, user } = this.props;
    return (
      <div className="home">
        <NavBar
          sideBar={this.handleSideBar}
          user={user}
          handleRefresh={this.handleRefresh}
        />
        <div className={`home_body_wrapper ${this.state.isActive}`}>
          <SideBar className={this.state.isActive} />

          <div className="home_body" onClick={this.handleBlur}>
            <div className="body_content_wrapper">
              <div className="create_note">
                <NewNote
                  handleFocus={this.handleFocus}
                  handleKeyPress={this.handleKeyPress}
                  handleTitle={this.handleTitle}
                  handlePin={this.handlePin}
                  showBody={this.state.showBody}
                  placeHolder={this.state.placeHolder}
                  pin={this.state.data.pin}
                  title={this.state.data.title}
                  newNote={this.newNote}
                />
              </div>

              {pin.notes ? (
                <div className="pin_note">
                  <Notes notes={pin.notes} />
                  <small className="pin_note_tag">{`PINNED ${pin.count}`}</small>
                </div>
              ) : (
                <small>Loading...</small>
              )}
              <div className="unpin_note">
                {unpin.notes ? (
                  <div className="pin_note">
                    <Notes notes={unpin.notes} />
                    <small className="pin_note_tag">{`OTHERS ${unpin.count}`}</small>
                  </div>
                ) : (
                  <small>Loading...</small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ spinner, isLogin, user, token, notes }) => ({
  spinner,
  isLogin,
  user,
  token,
  userId: user["id"],
  pin: notes["pin"],
  unpin: notes["unpin"]
});

// dispatch to store
const mapDispatchToProps = dispatch => ({
  createNote(note, token) {
    dispatch(createNote(note, token));
  },
  fetchPinNotes(userId, token) {
    dispatch(fetchPinNotes(userId, token));
  },
  fetchUnpinNotes(userId, token) {
    dispatch(fetchUnpinNotes(userId, token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
