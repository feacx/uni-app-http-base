/**
 *@description 公共请求url及参数列表
 */

import config from '@/config/http.config'

export default {
	idiomJie: {
		url: `/idiomJie/query?key=${config.key}`,
		params: {
			wd: '望子成龙',
		}
	}
}
