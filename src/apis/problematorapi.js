import  axios  from 'axios';

const root = "https://www.problemator.fi/t/problematorapi/v02";
const getAPI = (url, payload) => {
  if (!url.match(/\?/)) {
    return `${root}${url}?api-auth-token=${payload.token}&test=true`; 
  } else {
    return `${root}${url}&api-auth-token=${payload.token}&test=true`; 
  }
}
export const authToken = (state) => state.auth.token;
import problems from '../tests/fixtures/problems';

export default class ProblematorAPI {
    /*
  static get() {
    return axios.get(root); }
    */
   static getGlobalAscents(payload) {
     const url = getAPI(`/global_ascents/?pid=${payload.problemid}`,payload);
    return axios.get(url);
   }
  static getProblem(payload) {
    return axios.get(getAPI(`/problem/${payload.id}`,payload));
  }
  static deleteTick(payload) {
    return axios.get(getAPI(`/untick/?tickid=${payload.tickid}&pid=${payload.problemid}`,payload));
  }
  static getProblems(payload) {
    //return axios.get(`${root}/problems/?api-auth-token=${payload.token}`); 
    // Mock the response...
    return new Promise((resolve, reject) => {
      let ret = JSON.stringify(problems);
      console.log("Static response");
      resolve({data : ret});
    });
  }
//   static add(payload) {
//     return axios.post(root, payload); }
//   static getProblem(payload) {
//     return axios.delete(`${root}/delete/${payload.id}`); 
}
