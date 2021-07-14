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
  imageRef: React.MutableRefObject<HTMLImageElement>;
}

export interface IProfileTextProps {
  stateToggle: IStateToggle;
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

export interface IProfileInfo {
  names: string[];
  cities: string[];
  treats: string[];
}
