import { select, call, put  } from 'redux-saga/effects';
import  axios  from 'axios';
import querystring from 'querystring'
// Fixtures
import groups, { groupDetails} from '../tests/fixtures/groups'

const root = "https://www.problemator.fi/t/problematorapi/v02";
function* getAPI (url, payload)  {
  if (payload == undefined) {
    console.log("Payload is missing in getAPI()");
  }
  const token = yield(select(authToken));
  if (!url.match(/\?/)) {
    return `${root}${url}?api-auth-token=${token}&react=true`; 
  } else {
    return `${root}${url}&api-auth-token=${token}&react=true`; 
  }
}
export const authToken = (state) => state.auth.token;
import problems from '../tests/fixtures/problems';
  const config = {

    responseType : 'json'
  }

export default class ProblematorAPI {

  static * removeUserFromGroup(payload) {
    return yield axios.get(yield getAPI("/remove_user_from_group/?gid="+payload.gid+"&uid="+payload.uid,payload),config)
  }
    static * group(payload) {
    //return yield axios.get(yield getAPI("/group/?id="+payload.groupid,payload),config)
    return yield { data: groupDetails};
  }
  static * myGroups(payload) {
    //return yield axios.get(yield getAPI("/groups/",payload),config)
    return yield { data : groups};
  }
   static * saveTick(payload) {
     const postData = querystring.stringify(payload);
     const url = yield getAPI(`/savetick/?`+postData,payload)
    return yield axios.post(url,config);
   }
   static * saveOpinion(payload) {
     payload.targetid = payload.problemid;
     const postData = querystring.stringify(payload);
     const url = yield getAPI(`/saveopinion/?`+postData,payload)
     return yield axios.post(url,config);
   }
   static * saveFeedback(payload) {
     payload.pid = payload.problemid;
     const postData = querystring.stringify(payload);
     const url = yield getAPI(`/savefeedback/?`+postData,payload)
     return yield axios.post(url,config);
   }

   static * delBetaVideo(payload) {
    return yield axios.post(yield getAPI(`/delbetavideo/?vid=${payload.videoid}`,payload),config);
   }
   static * addBetaVideo(payload) {
     const url =yield getAPI(`/savebetavideo/?pid=${payload.problemid}&url=${payload.video_url}`,payload);
    return yield axios.post(url,config);
   }
   static * getGlobalAscents(payload) {
     const url = yield getAPI(`/global_ascents/?pid=${payload.problemid}`,payload);
    return yield axios.get(url,config);
   }
  static * getProblem(payload) {
    return yield axios.get(yield getAPI("/problem/"+payload.id,payload),config);
  }
  static * deleteTick(payload) {
    return yield axios.get(yield getAPI(`/untick/?tickid=${payload.tickid}&pid=${payload.problemid}`,payload),config);
  }
  static * getProblems(payload) {
       let ret = JSON.stringify(problems);
    // Mock the response...
    // return yield new Promise((resolve, reject) => {
    //   console.log("Static response");
    //   resolve({data : ret});
    // });
    return yield { data : problems};
  }
}
