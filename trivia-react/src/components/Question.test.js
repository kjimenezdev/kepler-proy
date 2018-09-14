import React from 'react';
import ReactDOM from 'react-dom';
import Question from './Question.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Question />, div);
  ReactDOM.unmountComponentAtNode(div);
});
