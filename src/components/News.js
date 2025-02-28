import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "ind",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      loadingMore: false, 
      page: 1,
      totalResults: 0,
    };
  }

  async fetchData(page = 1) {
    this.props.setprogress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db9bce3b33a848dd9540a00d134a580f&page=${page}&pageSize=${this.props.pageSize}`;
    try {
      const data = await fetch(url);
      const parsedData = await data.json();

      const newArticles = parsedData.articles.filter(
        (article) =>
          !this.state.articles.some(
            (existingArticle) => existingArticle.title === article.title
          )
      );

      this.setState((prevState) => ({
        articles: [...prevState.articles, ...newArticles],
        loading: false,
        loadingMore: false, 
        totalResults: parsedData.totalResults,
        page,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false, loadingMore: false });
    }
    this.props.setprogress(100);
  }

  async componentDidMount() {
    this.fetchData();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  async componentDidUpdate(prevProps) {

    if (prevProps.category !== this.props.category) {
      document.title = `${this.props.category}: News-PET`;
      this.setState({ loading: true, page: 1, articles: [] }, () =>
        this.fetchData(1)
      );
    }
  }

  handleScroll = () => {
    const { loading, loadingMore, page, totalResults } = this.state;
    const { pageSize } = this.props;

    if (loading || loadingMore || page * pageSize >= totalResults) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      this.setState({ loadingMore: true }); 
      this.fetchData(page + 1);
    }
  };

  render() {
    const { articles, loading, loadingMore } = this.state;
    const defaultImage = "/pets.png";

    return (
      <div className="container my-5" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="text-center my-6">
  <h1 className="text-4xl font-bold text-gray-800 relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-blue-500 after:left-0 after:bottom-0 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
    News-PET Top {this.props.category} Headlines
  </h1>
  <p className="text-lg text-gray-600 mt-2">Stay updated with the latest news from around the world.</p>
</div>




        <div className="container">
  <div className="row justify-content-center">
    {articles.map((article, index) => (
      <div className="col-md-4 d-flex justify-content-center my-3" key={index}>
        <NewsItem
          Title={article.title || "No Title"}
          description={article.description || "No Description"}
          imgUrl={article.urlToImage || defaultImage}
          newsurl={article.url || "#"}
          time={article.publishedAt}
        />
      </div>
    ))}
  </div>
</div>


        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}

        {loadingMore && (
          <div className="text-center my-3">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default News;

