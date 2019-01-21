import  axios  from 'axios';

const root = "https://www.problemator.fi/t/problematorapi/v02";
// Find the token

export default class ProblematorAPI {
    /*
  static get() {
    return axios.get(root); }
    */
  static getProblem(payload) {
    return axios.get(`${root}/problem/{payload.id}`); 
  }
  static getProblems(payload) {
    console.log("payload to api",payload);
    return axios.get(`${root}/problems/?api-auth-token=${payload.token}`); 
  }
//   static add(payload) {
//     return axios.post(root, payload); }
//   static getProblem(payload) {
//     return axios.delete(`${root}/delete/${payload.id}`); 
}
