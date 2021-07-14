import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IFriendsListProps } from '../types';

export const FriendsList: React.FunctionComponent<IFriendsListProps> = ({
  images,
}): JSX.Element => {
  const [items, setItems] = React.useState(images);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    setItems(images);
  }, [images]);

  const fetchData = () => {
    if (items.length >= 500) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items => items.concat(items));
    }, 500);
  };

  return (
    <div className="carousel-outer">
      <p className="carousel-friend-count">Friends ({images.length})</p>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4></h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Down to the bone! 🦴</b>
          </p>
        }
      >
        {items.map((x, i) => (
          <div key={'image' + i} className="carousel-image">
            <img src={x} alt="" loading="lazy" />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
