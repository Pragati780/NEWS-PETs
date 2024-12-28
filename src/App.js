import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  
  constructor(){
    super();
    this.state={
      progress: 0,
    };
  }
  setprogress=(progress)=>{
    this.setState({progress});
  }
  render() {
    return (
      <div>
        <Router>
          
          <Navbar />
          <LoadingBar color="#f11946" height={4} progress={this.state.progress}/>
          <Routes>
            <Route path="/home" element={<News setprogress={this.setprogress} pageSize={6} category="General" country="us" />} />
            <Route path="/" element={<News setprogress={this.setprogress} pageSize={6} category="General" country="us" />} />
            <Route path="/Business" element={<News setprogress={this.setprogress} pageSize={6} category="Business" country="us" />} />
            <Route path="/entertainment" element={<News setprogress={this.setprogress} pageSize={6} category="Entertainment" country="us" />} />
            <Route path="/general" element={<News setprogress={this.setprogress} pageSize={6} category="General" country="us" />} />
            <Route path="/health" element={<News setprogress={this.setprogress} pageSize={6} category="Health" country="us" />} />
            <Route path="/science" element={<News setprogress={this.setprogress} pageSize={6} category="Science" country="us" />} />
            <Route path="/sports" element={<News setprogress={this.setprogress} pageSize={6} category="Sports" country="us" />} />
            <Route path="/technology" element={<News setprogress={this.setprogress} pageSize={6} category="Technology" country="us" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

