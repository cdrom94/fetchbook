import { IFriendsListProps } from '../types';

export const FriendsList: React.FunctionComponent<IFriendsListProps> = ({
  images,
}): JSX.Element => {
  return (
    <div className="carousel-outer">
      <p className="carousel-friend-count">Friends ({images.length})</p>
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
