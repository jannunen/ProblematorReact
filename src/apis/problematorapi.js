import  axios  from 'axios';

const root = "https://www.problemator.fi/t/problematorapi/v02";
// Find the token

export default class LayoutAPI {
    /*
  static get() {
    return axios.get(root); }
    */
  static getProblem(payload) {
    return axios.get(`${root}/problem/{payload.id}`); }
    static getProblems(payload) {
    return axios.get(`${root}/problems/?token=${this.token}`); }
//   static add(payload) {
//     return axios.post(root, payload); }
//   static getProblem(payload) {
//     return axios.delete(`${root}/delete/${payload.id}`); 
}
