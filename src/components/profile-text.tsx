import * as React from 'react';
import { IProfileTextProps } from '../types';

export const ProfileText: React.FunctionComponent<IProfileTextProps> = React.memo(
  ({
    stateToggle,
    appState,
    profile,
    prediction,
    handleUpload,
    inputRef,
  }): JSX.Element => {
    return (
      <article className="profile-text">
        <section className="profile-info">
          <button onClick={stateToggle[appState].action || (() => {})}>
            {stateToggle[appState].text}
          </button>
          <p>Name: {profile.name}</p>
          <p>City: {profile.city}</p>
          <p>Favorite Treat: {profile.treat}</p>
          <p>
            Breed: {prediction.probability}% chance of {prediction.breed}
          </p>
        </section>
        <form>
          <label className="imageInputLabel" htmlFor="imageInput">
            Upload Image
          </label>
          <input
            id="imageInput"
            name="imageInput"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            ref={inputRef}
          />
        </form>
      </article>
    );
  },
);
