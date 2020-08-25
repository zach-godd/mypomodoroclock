import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Timer from "./Timer.js";

//https://testing-library.com/docs/react-testing-library/example-intro
test('renders timer; tests if Pomodoro Clock renders', () => {
  const { getByText } = render(<Timer />);
  const linkElement = getByText(/Pomodoro Clock/i);
});
