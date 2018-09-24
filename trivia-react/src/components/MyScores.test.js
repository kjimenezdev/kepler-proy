import React from 'react';
import ReactDOM from 'react-dom';
import MyScores from './MyScores.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyScores />, div);
  ReactDOM.unmountComponentAtNode(div);
});
