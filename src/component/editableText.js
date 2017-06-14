import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './editableText.css';

export default class EditableText extends Component {
  render() {
    return (
      <div className={style.editableText}>
        Some text
      </div>
    );
  }
}

EditableText.propTypes = {

};
