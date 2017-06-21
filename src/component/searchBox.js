import React, { Component } from 'react';

import style from './searchBox.css';

export default class SearchBox extends Component {
  render() {
    return (
      <div className={style.searchBox}>
        The search box
      </div>
    );
  }
}

SearchBox.propTypes = {
};

