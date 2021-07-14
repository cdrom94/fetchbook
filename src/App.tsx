import * as React from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { dogBreeds } from './data/dog_breeds';
import { profileInfo } from './data/profile_info';
import { defaultImages } from './data/default_images';
import { Header } from './components/header';
import { ProfileBanner } from './components/profile-banner';
import { ProfileText } from './components/profile-text';
import { FriendsList } from './components/friends-list';
import { IProfile, IStateMachine, IPrediction, IStateToggle } from './types';
import './App.css';

//STATE MACHINE
const stateMachine: IStateMachine = {
  initial: 'initial',
  states: {
    initial: { next: 'fetchingData' },
    fetchingData: { next: 'dataReady' },
    dataReady: { next: 'imageReady' },
    imageReady: { next: 'scanning' },
    scanning: { next: 'dataReady' },
  },
};

export const App = (): JSX.Element => {
  tf.setBackend('cpu');

  //STATE VARIABLES
  const [imageURL, setImageURL] = React.useState<string>(
    'https://pbs.twimg.com/media/E3oJUg1XIAkDQVK?format=jpg&name=large',
  );
  const [model, setModel] = React.useState<mobilenet.MobileNet | null>(null);
  const [images, setImages] = React.useState<string[]>(defaultImages);
  const [profile, setProfile] = React.useState<IProfile>({
    name: 'Bodhi',
    city: 'New York',
    treat: 'Kith',
  });
  const [prediction, setPrediction] = React.useState<IPrediction>({
    breed: 'Shiba',
    probability: '100',
  });

  //REFS
  const imageRef = React.useRef<HTMLImageElement>();
  const inputRef = React.useRef<HTMLInputElement>();

  //REDUCER
  const reducer = (state: string, action: 'next' = 'next') =>
    stateMachine.states[state][action] || stateMachine.initial;

  const [appState, dispatch] = React.useReducer(reducer, stateMachine.initial);
  const next = () => dispatch();

  React.useEffect(() => {
    document.title = `${profile.name} | Fetchbook`;
  }, [profile.name]);

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const fetchData = async () => {
    next();
    const model = await mobilenet.load({ version: 2, alpha: 1 });
    setModel(model);
    next();
  };

  const upload = () => inputRef.current?.click();

  const handleUpload = (event: { target: { files: any } }) => {
    const { files } = event.target;
    const url: React.SetStateAction<string> = URL.createObjectURL(
      event.target.files[0],
    );
    if (/^image\/+/.test(files[0].type)) {
      setImageURL(url);
      next();
    }
  };

  const findFriends = async (breed: string) => {
    fetch(
      `https://dog.ceo/api/breed/${
        dogBreeds[breed]
      }/images/random/${getRandomInt(20, 50)}`,
    )
      .then(res => res.json())
      .then(data =>
        Array.isArray(data.message) && data.status !== 'error'
          ? setImages(data.message)
          : setImages([]),
      )
      .catch(() => {
        setImages([]);
      });
  };

  const getRandomProperty = (prop: any): string =>
    profileInfo[prop][~~(Math.random() * profileInfo[prop].length)];

  const updateProfile: () => Promise<void> = async () => {
    next();

    const results:
      | {
          className: string;
          probability: number;
        }[]
      | undefined = await model?.classify(imageRef.current, 1);
    const breed: string = results[0].className;
    const probability: string = Math.floor(
      results[0].probability * 100,
    ).toString();
    setPrediction({
      breed: breed,
      probability: probability,
    });

    if (dogBreeds[breed]) {
      findFriends(breed);
      setProfile({
        name: getRandomProperty('names'),
        city: getRandomProperty('cities'),
        treat: getRandomProperty('treats'),
      });
    } else {
      setProfile({
        name: 'N/A',
        city: 'N/A',
        treat: 'N/A',
      });
      setImages([]);
    }

    next();
  };

  const stateToggle: IStateToggle = {
    initial: { action: fetchData, text: 'Fetch Data' },
    fetchingData: { text: 'Fetching...' },
    dataReady: { action: upload, text: 'Upload New Dog' },
    imageReady: { action: updateProfile, text: 'Update Profile' },
    scanning: { text: 'Scanning...' },
  };

  return (
    <div>
      <Header />
      <ProfileBanner imageURL={imageURL} imageRef={imageRef} />
      <ProfileText
        stateToggle={stateToggle}
        appState={appState}
        profile={profile}
        prediction={prediction}
        handleUpload={handleUpload}
        inputRef={inputRef}
      />
      <FriendsList images={images} />
    </div>
  );
};
