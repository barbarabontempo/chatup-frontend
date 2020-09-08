import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    registrationErrors: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/registrations",
        { user: this.state },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <div className="">
        <div className="ui card">
        <form className="ui form"onSubmit={this.handleSubmit}>
        {/* "https://icon-library.com/images/cat-icon-png/cat-icon-png-0.jpg */}
          <div className="ui container content" >
            <h3 className="ui center aligned icon header">Chiśme Up
              <img src="https://icon-library.com/images/cat-icon-png/cat-icon-png-0.jpg"/>
           </h3>
          </div>     
                 
                <div className="">
                      <div calssName = "ui focus field">
                        <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                        />
                      </div>

                      <div className= "field">
                          <input
                          type="text"
                          name="username"
                          placeholder="username"
                          value={this.state.username}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                </div>
         

            <div className="ui right labeled input">
              <input
              type="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
              />
              <div className="ui label">
                <div class="text">.com</div>
              </div>
            </div>

            <div className="">

              <div className="">
    

                <div className="field">
                  <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                  />
                </div>

                <div className="field">
                  <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Password Confirmation"
                  value={this.state.password_confirmation}
                  onChange={this.handleChange}
                  required
                  />
                </div>

              </div>
            </div>

          <button className="ui button teal" type="submit"> Register </button>
        </form>
        </div>
      </div>
    );
  }
}
