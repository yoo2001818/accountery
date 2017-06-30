import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portal from 'react-portal-minimal';

import style from './dropDown.css';

export const Entry = ({ children, onClick }) => (
  <li>
    <button>{ children }</button>
  </li>
);

export const List = ({ children }) => (
  <ul className={style.list}>
    { children }
  </ul>
);

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      x: 0,
      y: 0,
    };
    this.layoutValid = false;
    this.root = null;
    this.node = null;
    this.cover = null;
    // Used to update layout if the window is resized.
    this.requestLayout = () => {
      this.layoutValid = false;
      this.calcLayout();
    };
  }
  componentDidMount() {
    this.mounted = true;
    if (this.state.open) {
      this.calcLayout();
      window.addEventListener('resize', this.requestLayout);
    }
  }
  componentWillUnmount() {
    this.mounted = false;
    if (this.state.open) {
      window.removeEventListener('resize', this.requestLayout);
    }
  }
  componentDidUpdate() {
    if (this.state.open) this.calcLayout();
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.open !== nextState.open) {
      if (nextState.open) {
        window.addEventListener('resize', this.requestLayout);
      } else {
        window.removeEventListener('resize', this.requestLayout);
      }
    }
  }
  registerRoot(root) {
    this.root = root;
  }
  registerNode(node) {
    this.node = node;
  }
  registerCover(cover) {
    // Cover will disappear right after closing - we don't need to handle
    // closing events.
    if (this.cover !== cover && cover != null) {
      this.cover = cover;
      cover.addEventListener('click', this.handleClick.bind(this));
    }
  }
  calcLayout() {
    // Don't do layout if one of the nodes are missing.
    if (this.root == null || this.node == null) return;
    if (this.layoutValid) return;
    let { innerWidth, innerHeight } = window;
    this.layoutValid = true;
    let x, y;
    let nodeRect = this.node.getBoundingClientRect();
    let alignRect = this.root.getBoundingClientRect();
    // We need this to get exact location of the node...
    let body = document.body;
    let docEl = document.documentElement;
    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;
    let diffTop = scrollTop - clientTop;
    let diffLeft = scrollLeft - clientLeft;
    if (this.props.top) {
      y = alignRect.top + diffTop - nodeRect.height;
      if (y < diffTop) {
        y = Math.min(innerHeight - nodeRect.height, alignRect.bottom + diffTop);
      }
    } else {
      y = alignRect.bottom + diffTop;
      if (y + nodeRect.height > innerHeight + diffTop) {
        y = Math.max(0, alignRect.top + diffTop - nodeRect.height);
      }
    }
    if (this.props.left) {
      x = alignRect.left + diffLeft;
      if (x + nodeRect.width > innerWidth + diffLeft) {
        x = Math.max(0, alignRect.right + diffLeft - nodeRect.width);
      }
    } else {
      x = alignRect.right + diffLeft - nodeRect.width;
      if (x < diffLeft) {
        x = Math.min(innerWidth - nodeRect.width, alignRect.right + diffLeft);
      }
    }
    this.setState({ x, y });
  }
  handleClick(e) {
    const { open } = this.state;
    if (this.mounted) {
      this.setState({
        open: !open,
      });
      this.layoutValid = false;
    }
    e.preventDefault();
  }
  open() {
    if (!this.state.open) this.setState({ open: true });
  }
  close() {
    if (this.state.open) this.setState({ open: false });
  }
  render() {
    const { open, x, y } = this.state;
    const { title, children, preventClose, top, left, noArrow,
      className, openClassName } = this.props;
    return (
      <div
        className={classNames(style.dropDown, className,
          open && style.open, open && openClassName)}
        ref={this.registerRoot.bind(this)}
      >
        <button className={style.button} onClick={this.handleClick.bind(this)}>
          { title }
        </button>
        { open && (
          <Portal>
            <div className={classNames(style.dropDownPortal, {
              [style.top]: top,
              [style.left]: left,
              [style.noArrow]: noArrow,
            })} style={{
              position: 'absolute',
              left: x + 'px',
              top: y + 'px',
            }}>
              <div className={style.cover}
                ref={this.registerCover.bind(this)} />
              <div className={style.content}
                onClick={!preventClose && this.handleClick.bind(this)}
                ref={this.registerNode.bind(this)}
              >
                { children }
              </div>
            </div>
          </Portal>
        ) }
      </div>
    );
  }
}

DropDown.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.node,
  preventClose: PropTypes.bool,
  top: PropTypes.bool,
  left: PropTypes.bool,
  noArrow: PropTypes.bool,
  className: PropTypes.string,
  openClassName: PropTypes.string,
};
