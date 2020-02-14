import React, { Component } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Notes from "../components/Notes";
import NewNote from "../components/NewNote";
import Spinner from "../components/Spinner";

// actions
import {
  createNote,
  fetchPinNotes,
  fetchUnpinNotes,
  setNoteId
} from "../reducers/notes/actions";

// css
import "../css/_home.sass";
import { connect } from "react-redux";
import EditNote from "../components/EditNote";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reload: false,
      isActive: "",
      showBody: false,
      layout: false,
      placeHolder: "Take a note...",
      updateNote: false,
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

  UNSAFE_componentWillMount() {
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
      body.style.cssText =
        "height:" + body.scrollHeight + "px; padding-top:14px";
    }, 0);

    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
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

  handleLayout = () => {
    this.setState({
      ...this.state,
      layout: !this.state.layout
    });
  };

  // New Note
  newNote = () => {
    const { userId } = this.props;
    const { title, body } = this.state.data;
    if (title === "" && body === "") return;
    let data = this.state.data;
    data["UserId"] = userId;
    data = JSON.stringify(data);

    this.props.createNote(data, this.props.token);
    setTimeout(() => {
      this.setState({
        ...this.state,
        showBody: false,
        placeHolder: "Take a note...",
        data: { title: "", body: "", pin: false }
      });
    }, 2000);
  };

  handleEditNote = (id, pin) => event => {
    event.persist();
    this.setState({ ...this.state, updateNote: true });
    const { setId } = this.props;
    setId({ id, pin });
  };

  handleUpdateNote = name => {
    if (name === "google-edit-note show")
      return this.setState({ ...this.state, updateNote: false });
  };

  render() {
    const { pin, unpin, user, layout } = this.props;
    return (
      <div className="home">
        <NavBar
          sideBar={this.handleSideBar}
          user={user}
          handleRefresh={this.handleRefresh}
        />
        <div className={`home_body_wrapper ${this.state.isActive}`}>
          <EditNote
            show={this.state.updateNote}
            handleUpdateNote={this.handleUpdateNote}
          />
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
                <div className={`pin_note ${layout ? "layout" : ""}`}>
                  <Notes
                    handleEditNote={this.handleEditNote}
                    notes={pin.notes}
                  />
                  <small className="pin_note_tag">{`PINNED ${pin.count}`}</small>
                </div>
              ) : (
                <Spinner border={true} />
              )}
              <div className="unpin_note">
                {unpin.notes ? (
                  <div className={`pin_note ${layout ? "layout" : ""}`}>
                    <Notes
                      notes={unpin.notes}
                      handleEditNote={this.handleEditNote}
                    />
                    <small className="pin_note_tag">{`OTHERS ${unpin.count}`}</small>
                  </div>
                ) : (
                  <Spinner border={true} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ spinner, isLogin, user, token, notes, layout }) => ({
  spinner,
  isLogin,
  user,
  token,
  userId: user["id"],
  pin: notes["pin"],
  unpin: notes["unpin"],
  layout: layout["layout"]
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
  },
  setId(id) {
    dispatch(setNoteId(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
