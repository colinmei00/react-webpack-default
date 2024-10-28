import { createContext, useContext } from 'react';
import userStore from './User';

class RootStore {
  user = userStore;
}

const rootStore = new RootStore();

const storeContext = createContext(rootStore);

export function useStore() {
  return useContext(storeContext);
}
