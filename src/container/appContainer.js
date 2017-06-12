import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { setOpen } from '../action/menu';
import style from './appContainer.css';

class AppContainer extends Component {
  render() {
    const { setOpen, open, children } = this.props;
    return (
      <div className={classNames(style.appContainer, { [style.open]: open })}>
        <div className={style.sideMenu}>
          This is a side menu.
        </div>
        <div className={style.content}>
          { children }
        </div>
        <div className={style.menuFill} onClick={setOpen.bind(null, false)} />
      </div>
    );
  }
}

AppContainer.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  setOpen: PropTypes.func,
};

export default connect(
  ({ menu: { open } }) => ({ open }),
  { setOpen }
)(AppContainer);
