import axios from 'axios';

import { isBrowser, getUrlParams } from './utils';

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

export const getDMSDataByCDN = async (dmsUrl, queryString = '') => {
  try {
    if (isBrowser) {
      const { enableReview } = getUrlParams(location.search);
      if (parseInt(enableReview) === 1) {
        const response = await axios.get(`${dmsUrl}_review.json`);
        return response.data.data;
      }
      const response = await axios.get(`${dmsUrl}.json`);
      return response.data.data;
    }
    const { enableReview } = getUrlParams(queryString);
    if (parseInt(enableReview) === 1) {
      const response = await axios.get(`${dmsUrl}_review.json`);
      return response.data.data;
    }
    const response = await axios.get(`${dmsUrl}.json`);
    return response.data.data;
  } catch (e) {
    return false;
  }
};
