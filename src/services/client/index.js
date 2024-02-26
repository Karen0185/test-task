import axios from 'axios';
import CryptoJS from 'crypto-js';
import config from "../../config";

const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const xAuth = `${config.password}_${timestamp}`;
const xAuthMd5 = CryptoJS.MD5(xAuth).toString(CryptoJS.enc.Hex);
const headers = { "X-Auth": xAuthMd5 };

const post = async (endPoint, data) => {
  try {
    const res = await axios.post(`${config.serverPath}${endPoint}`, data, { headers });
    return res.data; 
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default post;
