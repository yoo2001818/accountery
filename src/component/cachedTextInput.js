import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class CachedTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      editValue: '',
    };
    this.focus = false;
  }
  handleChange(e) {
    this.setState({
      editValue: e.target.value,
    });
    if (!this.state.locked) {
      if (this.props.onChange) this.props.onChange(e);
    }
  }
  handleFocus(e) {
    this.focus = true;
    this.setState({
      locked: true,
      editValue: e.target.value,
    });
    if (this.props.onFocus) this.props.onFocus(e);
  }
  handleBlur(e) {
    this.focus = false;
    this.setState({
      locked: false,
    });
    // Emit change event
    if (this.props.onChange) this.props.onChange(e);
    if (this.props.onBlur) this.props.onBlur(e);
  }
  handleKeyDown(e) {
    if (e.keyCode === 9) {
      if (e.shiftKey) {
        if (this.props.onPrevFocus) this.props.onPrevFocus(e);
      } else {
        if (this.props.onNextFocus) this.props.onNextFocus(e);
      }
    }
  }
  render() {
    const { value, type = 'text', tabIndex,
      className, lockedClassName } = this.props;
    const { locked, editValue } = this.state;
    return (
      <input
        className={classNames(className, locked && lockedClassName)}
        type={type}
        tabIndex={tabIndex}
        value={locked ? editValue : (value || '')}
        onChange={this.handleChange.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
        ref={input => this.input = input}
        />
    );
  }
}

CachedTextInput.propTypes = {
  value: PropTypes.any,
  tabIndex: PropTypes.number,
  type: PropTypes.string,
  className: PropTypes.string,
  lockedClassName: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onNextFocus: PropTypes.func,
  onPrevFocus: PropTypes.func,
};
