import React from 'react';
import { render } from 'react-dom';

import App from './view/app';

// Create container element
let container = document.createElement('div');
document.body.appendChild(container);
container.className = 'root';

// TODO We'll add state manager later...
render(<App />, container);
