import {
    REQUEST_SET_LANGUAGE,
    SET_LANGUAGE
} from './actionTypes';
import { lang } from '../../utils/constants';

export const requestLan = () => {
	const searchLan = sessionStorage.getItem('lan');
	console.log(searchLan);
	if (searchLan) {
		return {
			type: REQUEST_SET_LANGUAGE,
			payload: searchLan
		};
	} else {
		sessionStorage.setItem('lan', 'uz');
		return {
			type: REQUEST_SET_LANGUAGE,
			payload: 'uz'
		};
	}
};

export const setLan = lan => {
	return {
		type: SET_LANGUAGE,
		payload: lan
	};
};


