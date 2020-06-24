import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import FormControl from "react-bootstrap/FormControl";
import "bootstrap/dist/css/bootstrap.css";

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: null, //The Username for the form
      FamilyName: null, // The FamilyName for the form
      Mobile: null, //The Mobile For Form
      ReceiveMarketing: 0, //For form to add the user\
      url:
        "https://winbb1m5hk.execute-api.us-east-1.amazonaws.com/Develop/users",
    };
  }
  handleFirstName = (event) => {
    this.setState({ FirstName: event.target.value });
  };
  handleFamilyName = (event) => {
    this.setState({
      FamilyName: event.target.value,
    });
  };
  handleMobile = (event) => {
    this.setState({ Mobile: event.target.value });
  };
  handleRecieveMarketing = (event) => {
    this.setState({ ReceiveMarketing: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    // alert(
    //   this.state.FirstName +
    //     "\t" +
    //     this.state.FamilyName +
    //     "\t" +
    //     this.state.ReceiveMarketing +
    //     "\t" +
    //     this.state.Mobile
    // );
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
            "The User with Name: " +
              this.state.FirstName +
              " " +
              this.state.FamilyName +
              "has been added successfully"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicText">
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              type="text"
              placeholder="John"
              onChange={this.handleFirstName}
            />
            <Form.Text className="text-muted">
              We'll never share your personal details with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label>FamilyName</Form.Label>
            <Form.Control
              type="text"
              placeholder="John"
              onChange={this.handleFamilyName}
            />
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label>Mobile:</Form.Label>
            <Form.Control
              type="text"
              placeholder="John"
              onChange={this.handleMobile}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="radio"
              label="Recieve Marketing:"
              value="1"
              onClick={this.handleRecieveMarketing}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddUserForm;
