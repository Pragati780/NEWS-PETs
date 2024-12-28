import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { Title, description, imgUrl, newsurl, time } = this.props;
    
    return (
      <div>
        <div className="card mx-4" style={{ width: "18rem" , display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto",}} >
          <img src={imgUrl} className="card-img-top" alt="News" />
          <div className="card-body">
            <h5 className="card-title">{Title}
            </h5>
            <p className="card-text">
              {description ? description : "No description available"}
            </p>
            <a href={newsurl} className="btn btn-sm btn-dark" target="_blank" rel="noopener noreferrer">
              Read More...
            </a>
            <p className="card-text"><small className="text-muted">Last updated at {time}</small></p>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
