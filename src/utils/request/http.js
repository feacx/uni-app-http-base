/**
 * Http 1.0.0
 * @Class Http
 * @Author fea.cx
 */

export default class Http {
	constructor() {
		this.config = {
			baseURL: '',
			header: {},
			method: 'GET',
			dataType: 'json',
			custom: {},
		}
	}

	static posUrl(url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
	}

	static mergeUrl(url, baseUrl, params) {
		let mergeUrl = Http.posUrl(url) ? url : `${baseUrl}${url}`;
		if (Object.keys(params).length !== 0) {
			const paramsH = Http.addQueryString(params);
			mergeUrl += mergeUrl.includes('?') ? `&${paramsH}` : `?${paramsH}`;
		}
		return mergeUrl;
	}

	static addQueryString(params) {
		let paramsData = '';
		Object.keys(params).forEach(function(key) {
			paramsData += key + '=' + encodeURIComponent(params[key]) + '&';
		});
		return paramsData.substring(0, paramsData.length - 1);
	}

	interceptor = {
		request: cb => {
			if (cb) {
				this.requestBeforeFun = cb;
			}
		},
		response: (cb, ecb) => {
			if (cb) {
				this.requestComFun = cb;
			}
			if (ecb) {
				this.requestComFail = ecb;
			}
		}
	};

	requestBeforeFun(config) {
		return config;
	}

	requestComFun(response) {
		return response;
	}

	requestComFail(response) {
		return response;
	}

	validateStatus(statusCode) {
		return statusCode === 200;
	}

	setConfig(fn) {
		this.config = fn(this.config);
	}

	async request(options = {}) {
		options.baseUrl = this.config.baseUrl;
		options.dataType = options.dataType || this.config.dataType;
		options.url = options.url || '';
		options.data = options.data || {};
		options.params = options.params || {};
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		options.custom = { ...this.config.custom, ...(options.custom || {}) };
		options.getTask = options.getTask || this.config.getTask;
		return new Promise((resolve, reject) => {
			let next = true;
			const cancel = (t = 'handle cancel', config = options) => {
				const err = {
					errMsg: t,
					config: config
				};
				reject(err);
				next = false;
			};
			const handleRe = { ...this.requestBeforeFun(options, cancel) };
			const _config = { ...handleRe };
			if (!next) return;
			const requestTask = uni.request({
				url: Http.mergeUrl(_config.url, _config.baseUrl, _config.params),
				data: _config.data,
				header: _config.header,
				method: _config.method,
				dataType: _config.dataType,
				complete: response => {
					response.config = handleRe;
					if (this.validateStatus(response.statusCode)) {
						response = this.requestComFun(response);
						resolve(response);
					} else {
						response = this.requestComFail(response);
						reject(response);
					}
				}
			});
			if (handleRe.getTask) {
				handleRe.getTask(requestTask, handleRe);
			}
		});
	}

	get(url, params = {}) {
		const options = {};
		options.params = params;
		return this.request({
			url,
			method: 'GET',
			...options
		});
	}

	post(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'POST',
			...options
		});
	}

	delete(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'DELETE',
			...options
		});
	}

	connect(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'CONNECT',
			...options
		});
	}

	head(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'HEAD',
			...options
		});
	}
	
	options(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'OPTIONS',
			...options
		});
	}
	
	trace(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'TRACE',
			...options
		});
	}

	upload(
		url,
		{
			filePath,
			name,
			header,
			formData = {},
			custom = {},
			params = {},
			getTask
		}
	) {
		return new Promise((resolve, reject) => {
			let next = true;
			const globalHeader = { ...this.config.header };
			delete globalHeader['content-type'];
			delete globalHeader['Content-Type'];
			const pubConfig = {
				baseUrl: this.config.baseUrl,
				url,
				filePath,
				method: 'UPLOAD',
				name,
				header: header || globalHeader,
				formData,
				params,
				custom: { ...this.config.custom, ...custom },
				getTask: getTask || this.config.getTask
			};
			const cancel = (t = 'handle cancel', config = pubConfig) => {
				const err = {
					errMsg: t,
					config: config
				};
				reject(err);
				next = false;
			};

			const handleRe = { ...this.requestBeforeFun(pubConfig, cancel) };
			const _config = {
				url: Http.mergeUrl(handleRe.url, handleRe.baseUrl, handleRe.params),
				filePath: handleRe.filePath,
				name: handleRe.name,
				header: handleRe.header,
				formData: handleRe.formData,
				complete: response => {
					response.config = handleRe;
					if (typeof response.data === 'string') {
						response.data = JSON.parse(response.data);
					}
					if (this.validateStatus(response.statusCode)) {
						response = this.requestComFun(response);
						resolve(response);
					} else {
						response = this.requestComFail(response);
						reject(response);
					}
				}
			};
			if (!next) return;
			const requestTask = uni.uploadFile(_config);
			if (handleRe.getTask) {
				handleRe.getTask(requestTask, handleRe);
			}
		});
	}

	download(url, options = {}) {
		return new Promise((resolve, reject) => {
			let next = true;
			const pubConfig = {
				baseUrl: this.config.baseUrl,
				url,
				method: 'DOWNLOAD',
				header: options.header || this.config.header,
				params: options.params || {},
				custom: { ...this.config.custom, ...(options.custom || {}) },
				getTask: options.getTask || this.config.getTask
			};
			const cancel = (t = 'handle cancel', config = pubConfig) => {
				const err = {
					errMsg: t,
					config: config
				};
				reject(err);
				next = false;
			};

			const handleRe = { ...this.requestBeforeFun(pubConfig, cancel) };
			if (!next) return;
			const requestTask = uni.downloadFile({
				url: Http.mergeUrl(handleRe.url, handleRe.baseUrl, handleRe.params),
				header: handleRe.header,
				complete: response => {
					response.config = handleRe;
					if (this.validateStatus(response.statusCode)) {
						// 成功
						response = this.requestComFun(response);
						resolve(response);
					} else {
						response = this.requestComFail(response);
						reject(response);
					}
				}
			});
			if (handleRe.getTask) {
				handleRe.getTask(requestTask, handleRe);
			}
		});
	}
}
