import React, { Component } from "react";
import "../style/profile.css";

class Profile extends Component {
  cutDescription(des, len) {
    if (des.length > len) {
      des = `${des.slice(0, len)}...`;
    }
    return des;
  }
  render() {
    const {
      companyName,
      sector,
      image,
      description,
      price
    } = this.props.profile;
    return (
      <div className="profile-component component component-bg">
        {this.props.searchMatches && <span>Did you mean</span>}
        <h3>Company Profile</h3>
        <p>Company Name: {companyName}</p>
        <p>Symbol: {this.props.symbol}</p>
        <p>Current Stock Price: ${price}</p>
        <p>Sector: {sector} </p>
        <p>
          Description: {description && this.cutDescription(description, 275)}
        </p>
        <img src={image} alt={companyName} />
      </div>
    );
  }
}

export default Profile;
