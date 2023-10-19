import { Provider } from 'react-redux';
import { Store } from 'redux';

const createTestProvider = (store: Store) => ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default createTestProvider;
