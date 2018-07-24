import React from 'react';

import ReactDOM from 'react-dom';
import App from './components/App';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {loadContacts} from './actions/contactActions';
import {Provider} from 'react-redux';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import 'react-table/react-table.css'


const store = configureStore();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('contacts-list')
);