import React from "react";
import "./App.css";
import Auth from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import "@aws-amplify/ui/dist/style.css";
import Header from "./Components/Header";
import Users from "./Components/Users";
Auth.configure(awsconfig);

function App() {
  return (
    <>
      <div className="App">
        <div>
          <Header />
          <div>
            <Users />
          </div>
        </div>
      </div>
    </>
  );
}
export default withAuthenticator(App, { includeGreetings: true });
