import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../Assets/logo.jpg";
import axios from "axios";
import Card from "react-bootstrap/Card";
import AddUserForm from "./AddUserForm";

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { width: "80px", height: "80px" },
      userName: null,
      search: false,
      users: null, // the response coming from server
      listItems: null, // the tags of html that will be used
      url:
        "https://winbb1m5hk.execute-api.us-east-1.amazonaws.com/Develop/users",

      form: null,
      AddUser: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch = (event) => {
    event.preventDefault();

    axios({
      method: "POST",
      url: this.state.url,
      data: {
        action: "get",
        FirstName: this.state.userName,
      },
    })
      .then((res) => {
        console.log(res.data.body);
        this.setState({
          users: res.data.body,
        });
        if (this.state.users != null) {
          this.setState({
            listItems: this.state.users.map((d) => (
              <Card border="primary" className="text-center" key={d.FirstName}>
                <Card.Body border="primary">
                  <Card.Title>
                    {d.FirstName} {d.FamilyName}
                  </Card.Title>
                  <Card.Text>Mobile: {d.Mobile}</Card.Text>
                  <Card.Text>
                    Receive Marketing: {(d.ReceiveMarketing = 1 ? "yes" : "no")}
                  </Card.Text>
                </Card.Body>
              </Card>
            )),
          });
        }

        console.log(this.state.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = (event) => {
    this.setState({ userName: event.target.value });
  };
  handleAddUser = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: this.state.url,
      data: {
        action: "insert",
        FirstName: this.state.FirstName,
        FamilyName: this.state.FamilyName,
        Mobile: this.state.Mobile,
        ReceiveMarketing: this.state.ReceiveMarketing,
      },
    })
      .then((res) => {
        console.log(res.body);
        if (res.data.body.affectedRow !== 0) {
          alert(
            "The User with First Name: " +
              this.state.FirstName +
              "has been added successfully"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleAddUserSt = () => {
    this.setState({
      AddUser: true,
    });
  };
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="https://www.e-goodmanners.com.au/">
            e-GoodManners
          </Navbar.Brand>

          <Nav className="mr-auto">
            <img
              src={logo}
              alt="e-Good Manners Logo "
              style={this.state.style}
            />
            <Button style={this.state.style} onClick={this.handleAddUserSt}>
              Add New User
            </Button>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={this.handleChange}
            />
            <Button variant="outline-info" onClick={this.handleSearch}>
              Search
            </Button>
          </Form>
        </Navbar>
        <div>
          {this.state.users !== null ? <div>{this.state.listItems}</div> : ""}
        </div>
        <div>{this.state.AddUser !== false ? <AddUserForm /> : ""}</div>
      </>
    );
  }
}

export default header;
