import { render, unmountComponentAtNode } from 'react-dom';
import { FriendsList } from '../components/friends-list';

let container: any = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders friend count as 0 when image array is empty', () => {
  render(<FriendsList images={[]} />, container);
  expect(container.querySelector('.carousel-friend-count').textContent).toBe(
    'Friends (0)',
  );
});
