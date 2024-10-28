import { createContext, useContext } from 'react';
import userStore from './User';
import testStore from './Test';

class RootStore {
  user = userStore;

  test = testStore;
}

const rootStore = new RootStore();

const storeContext = createContext(rootStore);

export function useStore() {
  return useContext(storeContext);
}
