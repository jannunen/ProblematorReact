import  axios  from 'axios';

const root = "https://www.problemator.fi/t/problematorapi/v02";
export const authToken = (state) => state.auth.token;
import problems from '../tests/fixtures/problems';

export default class ProblematorAPI {
    /*
  static get() {
    return axios.get(root); }
    */
  static getProblem(payload) {
    return axios.get(`${root}/problem/{payload.id}`); 
  }
  static getProblems(payload) {
    //return axios.get(`${root}/problems/?api-auth-token=${payload.token}`); 
    return new Promise((resolve, reject) => {
      let ret = JSON.stringify(problems);
      console.log("eot",ret);
      
      resolve({data : ret});
    });
  }
//   static add(payload) {
//     return axios.post(root, payload); }
//   static getProblem(payload) {
//     return axios.delete(`${root}/delete/${payload.id}`); 
}
