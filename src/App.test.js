import { render, screen } from '@testing-library/react';
import App from './App';

//Usada para las pruebas unitarias de la app
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
