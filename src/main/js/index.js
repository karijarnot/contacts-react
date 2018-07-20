import React from 'react';

import ReactDOM from 'react-dom';
import App from './components/App';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {loadContacts} from './actions/contactActions';
import {Provider} from 'react-redux';


const store = configureStore();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('contacts-list')
);