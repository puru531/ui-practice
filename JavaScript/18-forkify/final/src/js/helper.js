//contains the functions that we use over and over again in the project.
import { TIMEOUT_SEC } from "./config.js";
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJSON = async function(url) {
    try{
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);  //Running two promises simultaneously which resolve or reject first, will be fulfilled
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch(err) {
        throw err;
    }
}