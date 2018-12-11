import axios from 'axios'
const ERR_OK = 200
const TIME_OUT = 30000
axios.defaults.headers.post['Content-Type'] = 'application/json'
let apiHost = window.Config.api;
if (location.href.indexOf('/baoziwallet-v2-sit') > -1) {
  apiHost = window.Config.sitApi;
} else if (location.href.indexOf('/baoziwallet-v2-uat') > -1) {
  apiHost = window.Config.uatApi;
} else if (location.href.indexOf('/baoziwallet-v2-beta') > -1) {
  apiHost = window.Config.betaApi;
}
axios.defaults.baseURL = apiHost;

export function doPost(url, para) {
  if (window.wallet.params.api) {
    axios.defaults.baseURL = window.wallet.params.api;
  }
  const header = {
    'Content-Type': 'application/json',
    'osType': 'h5'
  }
  if (window.wallet.appInfo) {
    for (const key in window.wallet.appInfo) {
      key && (header[key] = window.wallet.appInfo[key]);
    }
  }
  return axios({
    method: 'post',
    url: url,
    data: para || {},
    headers: header,
    timeout: TIME_OUT,
  })
    .then(res => {
      if (res.status === 200) {
        const ret = res.data || {};
        if (ret.code === ERR_OK) {
          return Promise.resolve(ret.payload);
        } else {
          return Promise.reject(res);
        }
      } else {
        return Promise.reject(res);
      }
    })
    .catch(e => {
      if (e.code) {
        return Promise.reject(`[${e.code}]获取数据失败,请稍后再试`);
      } else if (e.data && e.data.code) {
        return Promise.reject(`[${e.data.code}]获取数据失败,请稍后再试`);
      } else {
        return Promise.reject(`请求异常,请稍后再试`);
      }
    });
}

export function doGet(url) {
  if (window.wallet.params.api) {
    axios.defaults.baseURL = window.wallet.params.api;
  }
  return axios({
    method: 'get',
    url: url,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: TIME_OUT,
  })
    .then(res => {
      if (res.status === 200) {
        const ret = res.data || {};
        if (ret.code === ERR_OK) {
          return Promise.resolve(ret.payload);
        } else {
          return Promise.reject(res);
        }
      } else {
        return Promise.reject(res);
      }
    })
    .catch(e => {
      if (e.code) {
        return Promise.reject(`[${e.code}]请求异常,请稍后再试`);
      } else if (e.data && e.data.code) {
        return Promise.reject(`[${e.data.code}]请求异常,请稍后再试`);
      } else {
        return Promise.reject(`请求异常,请稍后再试`);
      }
    });
}

/* 请求拦截器 */
axios.interceptors.request.use(function (config) {
  if (!window.wallet.isApp) {
    const token = '';
    const custId = '1000'
    const key = 'X-Access-Token'
    config.headers[key] = token;
    if (config.method === 'post') {
      config.data = {
        custId: custId,
        ...config.data
      }
    } else if (config.method === 'get') {
      config.params = {
        custId: custId,
        ...config.params
      }
    }
    console.log(config);
    return config;
  }

  return new Promise(resolve => {
    window.wallet.getUserInfo((data) => {
      if (data.token) {
        const key = data.tokenKey || 'X-Access-Token'
        config.headers[key] = data.token;
      }

      if (data.userId) {
        if (config.method === 'post') {
          config.data = {
            custId: data.userId,
            ...config.data
          };
        } else if (config.method === 'get') {
          config.params = {
            custId: data.userId,
            ...config.params
          };
        }
      }
      console.log(config);
      resolve(config)
    })
  })

}, function (err) {
  console.log(`axios请求拦截器--err: ${err}`)
  return Promise.reject(err)
})

/* 响应拦截器 */
axios.interceptors.response.use(function (response) {
  return response
}, function (err) {
  console.log(`axios响应拦截器--err: ${err}`)
  return Promise.reject(err)
})

