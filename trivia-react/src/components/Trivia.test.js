import React from 'react';
import ReactDOM from 'react-dom';
import Trivia from './Trivia.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Trivia />, div);
  ReactDOM.unmountComponentAtNode(div);
});
