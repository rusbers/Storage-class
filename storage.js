const storageArguments = {
  storage: undefined,
  key: undefined,
  value: undefined,
}

class Storage {
  constructor (storageArguments) {
    const {storage, key, value} = storageArguments;

    this.storageType = this.storageValidation(storage ?? 'local');
    this.key = key ?? 'key';
    this.value = value;

    if (this.key) this.set(this.key, this.value);
  }

  set(key, value) {
    this.storageType.clear();
    this.storageType.setItem(key, JSON.stringify(value));

    this.key = key;
    this.value = value;
  }

  get(key) {
    return JSON.parse(this.storageType.getItem(key));
  }

  clear() {
    this.storageType.clear();

    this.key = undefined;
    this.value = undefined;
  }

  isEmpty() {
    return !this.get(this.key);
  }

  storageValidation(storageType) {
    const isStorageValid = (storageType === 'local' || storageType === 'session');

    if (!isStorageValid) return;

    return (storageType === 'local') ? localStorage : sessionStorage;
  }
}

const user = {
  name: 'Robert',
  age: 23,
  married: true
}

const id = new Storage({storage: 'local', key: 'person', value: user});

