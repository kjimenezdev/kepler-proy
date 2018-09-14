import React from 'react';
import ReactDOM from 'react-dom';
import QuestionOption from './QuestionOption.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuestionOption />, div);
  ReactDOM.unmountComponentAtNode(div);
});
