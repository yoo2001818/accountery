import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FaBars from 'react-icons/lib/fa/bars';

import { toggleOpen } from '../action/menu';
import style from './titleBar.css';

class TitleBar extends Component {
  render() {
    const { title, toggleOpen } = this.props;
    return (
      <div className={style.titleBar}>
        <div className={style.bar}>
          <button className={style.menuButton} onClick={toggleOpen}>
            <FaBars />
          </button>
          <h1 className={style.title}>{ title }</h1>
        </div>
      </div>
    );
  }
}

TitleBar.propTypes = {
  title: PropTypes.node,
  open: PropTypes.bool,
  toggleOpen: PropTypes.func,
};

export default connect(
  ({ menu: { open } }) => ({ open }),
  { toggleOpen },
)(TitleBar);
