/* eslint-disable */
import Http from './http';
import indexConfig from '@/config/http.config';

const http = new Http();
http.setConfig(config => {
	config.baseUrl = indexConfig.baseUrl;
	config.header = {...config.header};
	return config;
});

http.interceptor.request(config => {
	config.header['openid'] = 'openid';
	return config;
}, error => {
	return Promise.reject(error);
});

http.interceptor.response(response => {
	switch (response.statusCode) {
		case 200:
			return response.data;
			break;
		default:
			return Promise.reject(response.data);
			break;
	}
}, error => {
	return Promise.reject(error);
});

export { http };
