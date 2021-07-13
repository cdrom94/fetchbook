//@ts-nocheck

import { IProfileBannerProps } from '../types';

export const ProfileBanner: React.FunctionComponent<IProfileBannerProps> = ({
  imageURL,
  imageRef,
}): JSX.Element => {
  return (
    <section className="profile-banner">
      <img
        className="profile-picture"
        src={imageURL}
        alt="upload-preview"
        ref={imageRef}
        loading="lazy"
      />
    </section>
  );
};
