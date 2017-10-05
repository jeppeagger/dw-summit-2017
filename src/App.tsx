import * as React from 'react';
import { Provider } from 'react-redux';

import store from './reducers/store';
import Framework7iOS from './components/Framework7iOS';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Framework7iOS />
      </Provider>
    );
  }
}

export default App;
