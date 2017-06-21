import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

import style from './searchBox.css';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '', items: props.items || [] };
    // Get current query...
    this.handleQuery('');
  }
  componentWillReceiveProps(nextProps) {
    // Immutable?
    if (this.props.items !== nextProps.items) {
      this.setState({ items: nextProps.items });
    }
  }
  handleQuery(query) {
    // Do nothing if onQuery is not provided
    if (this.props.onQuery == null) return;
    // Update items list according to the onQuery's result.
    let result = this.props.onQuery(query);
    if (Array.isArray(result)) {
      // If an array is returned, just render them right away
      this.setState({ items: result });
    } else if (result != null && typeof result.then === 'function') {
      // Or... a Promise.
      // TODO Implement loading state
      result.then(items => this.setState({ items }));
    }
    // Otherwise, do absolutely nothing - it would be delivered by setting
    // props.
  }
  handleQueryChange(e) {
    this.setState({ query: e.target.value });
    this.handleQuery(e.target.value);
  }
  render() {
    const { onSelect } = this.props;
    const { query, items } = this.state;
    return (
      <div className={style.searchBox}>
        <div className={style.query}>
          <input type='text' value={query}
            onChange={this.handleQueryChange.bind(this)} />
        </div>
        <ul className={style.list}>
          { items.map((item, key) => (
            // This simply links onSelect to top-level - which means that
            // underlying element is responsible for handling onSelect.
            cloneElement(item, { onSelect, key })
          )) }
        </ul>
      </div>
    );
  }
}

SearchBox.propTypes = {
  onQuery: PropTypes.func,
  onSelect: PropTypes.func,
  // It shouldn't do any filtering by itself - onQuery should take care of it.
  items: PropTypes.array,
};

