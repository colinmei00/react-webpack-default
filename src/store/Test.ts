import { makeAutoObservable } from 'mobx';

class TestStore {
  store = {
    text: 'home',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setTestText(val: string) {
    this.store.text = val;
  }
}

const testStore = new TestStore();

export default testStore;
