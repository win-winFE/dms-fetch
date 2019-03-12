import axios from 'axios';
import MD5 from 'md5.js';

import { isBrowser, getUrlParams } from './utils';

const baseUrl = 'http://127.0.0.1:5000/dms/data/';
const salt = 'winwinfe';

export const getDMSDataByServer = async (dmsUrl, queryString = '') => {
  try {
    if (isBrowser) {
      const { enableReview } = getUrlParams(location.search);
      const response = await axios.get(`${dmsUrl}&enableReview=${enableReview}`);
      return response.data.data;
    }
    const { enableReview } = getUrlParams(queryString);
    const response = await axios.get(`${dmsUrl}&enableReview=${enableReview}`);
    return response.data.data;
  } catch (e) {
    return false;
  }
};

export const getDMSDataByCDN = async (dmsMark, queryString = '') => {
  try {
    const hashTempStr = new MD5().update('y' + dmsMark + salt).digest('hex'); // 临时数据标示hash
    const hashStr = new MD5().update('n' + dmsMark + salt).digest('hex'); // 正式数据标示hash
    if (isBrowser && location.search) {
      const { enableReview } = getUrlParams(location.search);
      if (parseInt(enableReview) === 1) {
        const response = await axios.get(`${baseUrl + hashTempStr}.json`);
        return response.data;
      }
      const response = await axios.get(`${baseUrl + hashStr}.json`);
      return response.data;
    }
    const { enableReview } = getUrlParams(queryString);
    if (parseInt(enableReview) === 1) {
      const response = await axios.get(`${baseUrl + hashTempStr}.json`);
      return response.data;
    }
    const response = await axios.get(`${baseUrl + hashStr}.json`);
    return response.data;
  } catch (e) {
    return false;
  }
};
