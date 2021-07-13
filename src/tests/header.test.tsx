import { render, screen } from '@testing-library/react';
import { Header } from '../components/header';

test('renders header component', (): void => {
  render(<Header />);
  const linkElement = screen.getByText(/fetchbook/i);
  expect(linkElement).toBeInTheDocument();
});
