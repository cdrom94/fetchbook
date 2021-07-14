import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IFriendsListProps } from '../types';

export const FriendsList: React.FunctionComponent<IFriendsListProps> = ({
  images,
}): JSX.Element => {
  const [items, setItems] = React.useState(images);
  const [hasMore, setHasMore] = React.useState(true);

  const fetchData = () => {
    if (items.length >= 500) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 6 })));
    }, 500);
  };

  return (
    <div className="carousel-outer">
      <p className="carousel-friend-count">Friends ({images.length})</p>
      <InfiniteScroll
        dataLength={images.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        // refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
      >
        {images.map((x, i) => (
          <div key={'image' + i} className="carousel-image">
            <img src={x} alt="" loading="lazy" />
          </div>
        ))}
      </InfiniteScroll>
      <section className="carousel">
        {images.map((x, i) => (
          <div key={'image' + i} className="carousel-image">
            <img src={x} alt="" loading="lazy" />
          </div>
        ))}
      </section>
    </div>
  );
};
