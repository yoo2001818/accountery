import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './searchBox.css';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '', data: props.data || [], filtered: [] };
  }
  componentWillMount() {
    // Get current query...
    this.handleQuery('');
  }
  componentWillReceiveProps(nextProps) {
    // Immutable?
    if (this.props.children !== nextProps.children) {
      this.setState({ items: nextProps.children });
    }
  }
  handleQuery(query) {
    // Do built-in query if onQuery is not provided
    if (this.props.onQuery == null) {
      this.handleFilter(query);
      return;
    }
    // Update items list according to the onQuery's result.
    let result = this.props.onQuery(query);
    if (Array.isArray(result)) {
      // If an array is returned, just render them right away
      this.handleFilter(query, result);
    } else if (result != null && typeof result.then === 'function') {
      // Or... a Promise.
      // TODO Implement loading state
      result.then(data => this.handleFilter(query, data));
    }
    // Otherwise, do absolutely nothing - it would be delivered by setting
    // props.
  }
  handleQueryChange(e) {
    this.setState({ query: e.target.value });
    this.handleQuery(e.target.value);
  }
  handleFilter(query, data) {
    const { titleName = 'name' } = this.props;
    if (data != null) this.setState({ data });
    let filtered = (data || this.state.data).filter(v =>
      v[titleName] && v[titleName].indexOf(query) !== -1);
    this.setState({ filtered });
  }
  handleSelect(index) {
    const { onSelect } = this.props;
    const { data } = this.state;
    if (onSelect == null) return;
    onSelect(data[index]);
  }
  render() {
    const {
      titleName = 'name',
      idName = 'id',
      renderChild = entry => entry[titleName],
      selectedId,
    } = this.props;
    const { query, filtered: data } = this.state;
    return (
      <div className={style.searchBox}>
        <div className={style.query}>
          <input type='text' value={query}
            onChange={this.handleQueryChange.bind(this)} />
        </div>
        <ul className={style.list}>
          { data.map((entry, index) => (
            <li key={entry[idName]}>
              <button className={classNames(style.entry,
                  entry[idName] === selectedId && style.selected)}
                onClick={this.handleSelect.bind(this, index)}
              >
                { renderChild(entry) }
              </button>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

SearchBox.propTypes = {
  onQuery: PropTypes.func,
  onSelect: PropTypes.func,
  renderList: PropTypes.func,
  data: PropTypes.array,
  titleName: PropTypes.string,
  idName: PropTypes.string,
  selectedId: PropTypes.any,
};

