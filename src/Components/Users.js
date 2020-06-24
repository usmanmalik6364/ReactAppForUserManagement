import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_user: null,
      users: null,
      listItems: null,
      showUsers: true,
      url:
        "https://winbb1m5hk.execute-api.us-east-1.amazonaws.com/Develop/users",
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleGET = this.handleGET.bind(this);
  }

  handleDelete = (NameToDel) => {
    console.log("On Delete: " + NameToDel);
    axios({
      method: "POST",
      url: this.state.url,
      data: {
        action: "delete",
        FirstName: NameToDel,
      },
    })
      .then((res) => {
        console.log(res.body);
        if (res.data.body.affectedRow !== 0) {
          alert(
            "The User with First Name: " +
              NameToDel +
              "has been deleted successfully"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleGET = (event) => {
    event.preventDefault();

    axios({
      method: "POST",
      url: this.state.url,
      data: {
        action: "get",
      },
    })
      .then((res) => {
        //console.log(res.data.body);
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
                  <Button
                    variant="danger"
                    onClick={() => this.handleDelete(d.FirstName)}
                  >
                    Delete
                  </Button>
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

  render() {
    return (
      <>
        <div>
          <span></span>
          <Button onClick={this.handleGET}>View Users </Button>
        </div>
        <div>
          {this.state.users != null ? <div>{this.state.listItems}</div> : ""}
        </div>
      </>
    );
  }
}

export default Users;
