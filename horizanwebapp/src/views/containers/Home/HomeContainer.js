import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../../components/Home/Home';

const mapStateToProps = state => ({});
const mapDispatchToProps = {};

class HomeContainer extends Component {
  render() {
    return (
      <div className="Home">
				Home
			</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);