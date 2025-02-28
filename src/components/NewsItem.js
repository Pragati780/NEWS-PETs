import React, { Component } from "react";
import "./NewsItem.css"; // Importing the new CSS file

export class NewsItem extends Component {
  render() {
    let { Title, description, imgUrl, newsurl, time } = this.props;

    return (
      <div className="news-card">
        <div className="card">
        <img src={imgUrl || "/pets.png"} alt="news" />
          <div className="card-body">
            <h5 className="card-title">{Title}</h5>
            <p className="card-text">
              {description ? description : "No description available"}
            </p>
            <a
              href={newsurl}
              className="btn btn-sm btn-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More...
            </a>
            <p className="card-text">
              <small className="text-muted">
                Last updated at {new Date(time).toLocaleString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
