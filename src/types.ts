import * as tf from '@tensorflow/tfjs';

export interface IStateMachine {
    initial: string;
    states: {
        initial: {
            next: string;
        };
        fetchingData: {
            next: string;
        };
        dataReady: {
            next: string;
        };
        imageReady: {
            next: string;
        };
        scanning: {
            next: string;
        };
    };
}

export interface IStateToggle {
    initial: {
        action: () => Promise<void>;
        text: string;
    };
    fetchingData: {
        text: string;
    };
    dataReady: {
        action: () => void | undefined;
        text: string;
    };
    imageReady: {
        action: () => Promise<void>;
        text: string;
    };
    scanning: {
      text: string;
    };
}

export interface IProfile {
  name: string;
  city: string;
  treat: string;
}

export interface IPrediction {
  breed: string;
  probability: string;
}

export interface IProfileBannerProps {
  imageURL: string;
  imageRef: React.MutableRefObject<
  | tf.Tensor3D
  | ImageData
  | HTMLImageElement
  | HTMLCanvasElement
  | null
  >
}

export interface IProfileTextProps {
  stateToggle: any;
  appState: any;
  profile: {
    name: string;
    city: string;
    treat: string;
  };
  prediction: {
    breed: string;
    probability: string;
  };
  handleUpload: React.ChangeEventHandler<HTMLInputElement>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

export interface IFriendsListProps {
  images: string[];
}
