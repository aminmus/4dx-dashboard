import React, { Component } from "react";

export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
    }

  componentDidMount() {
    const { clientScore, clientName } = this.props;
    const canvas = document.getElementById(clientName);
    const ctx = canvas.getContext("2d");
    const x = parseInt(clientScore) / 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width * x, canvas.height);
  }

  componentDidUpdate() {
  }

  render() {
    const { clientName } = this.props;
    return (
      <li className="justify-content-center"><span>{clientName}</span>
        <canvas
          id={clientName}
          style={{ backgroundColor: "black", width: "100%", height: "10px" }}
        />
      </li>
    );
  }
}