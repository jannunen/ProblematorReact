import { select, call, put  } from 'redux-saga/effects';
import  axios  from 'axios';
import querystring from 'querystring'

const root = "https://www.problemator.fi/t/problematorapi/v02";
function* getAPI (url, payload)  {
  if (payload == undefined) {
    console.log("Payload is missing in getAPI()");
  }
  const token = yield(select(authToken));
  console.log("using token",token);
  if (!url.match(/\?/)) {
    return `${root}${url}?api-auth-token=${token}&react=true`; 
  } else {
    return `${root}${url}&api-auth-token=${token}&react=true`; 
  }
}
export const authToken = (state) => state.auth.token;
import problems from '../tests/fixtures/problems';

export default class ProblematorAPI {
  
  static * group(payload) {
    return yield axios.get(yield getAPI("/group/?id="+payload.groupid,payload))
  }
  static * myGroups(payload) {
    return yield axios.get(yield getAPI("/groups/",payload))
  }
   static * saveTick(payload) {
     const postData = querystring.stringify(payload);
     const url = yield getAPI(`/savetick/?`+postData,payload)
    return axios.post(url);
   }
   static saveOpinion(payload) {
     payload.targetid = payload.problemid;
     const postData = querystring.stringify(payload);
     const url = getAPI(`/saveopinion/?`+postData,payload)
     return axios.post(url);
   }
   static saveFeedback(payload) {
     payload.pid = payload.problemid;
     const postData = querystring.stringify(payload);
     const url = getAPI(`/savefeedback/?`+postData,payload)
     return axios.post(url);
   }

   static delBetaVideo(payload) {
    return axios.post(getAPI(`/delbetavideo/?vid=${payload.videoid}`,payload));
   }
   static addBetaVideo(payload) {
     const url =getAPI(`/savebetavideo/?pid=${payload.problemid}&url=${payload.video_url}`,payload);
    return axios.post(url);
   }
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
