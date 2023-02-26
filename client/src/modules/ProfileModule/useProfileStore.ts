import axios from 'axios';
import create from 'zustand';

interface profileStore {
  username: string;
  email: string;
  loadProfile: () => void;
}

const useProfileStore = create<profileStore>((set, get) => ({
  username: '',
  email: '',
  loadProfile: () => {
    // axios.get();
    set({ username: 'username', email: 'email' });
  },
}));

export default useProfileStore;
