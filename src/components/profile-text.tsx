import { IProfileTextProps } from '../types';

export const ProfileText: React.FunctionComponent<IProfileTextProps> = ({
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
      <input
        name="imageInput"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        ref={inputRef}
      />
    </article>
  );
};
