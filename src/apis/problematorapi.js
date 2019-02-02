import { select, call, put  } from 'redux-saga/effects';
import  axios  from 'axios';
import querystring from 'querystring'
// Fixtures
import groups, { groupDetails} from '../tests/fixtures/groups'

const root = "https://beta.problemator.fi/t/problematorapi/v02";
function* getAPI (url )  {
  const token = yield(select(authToken));
  if (!url.match(/\?/)) {
    url = `${root}${url}?api-auth-token=${token}&react=true`
  } else {
    url = `${root}${url}&api-auth-token=${token}&react=true`;
  }
  console.log("URL",url);
  return url; 
}
export const authToken = (state) => state.auth.token;
import problems from '../tests/fixtures/problems';
  const config = {

    responseType : 'text'
  }

export default class ProblematorAPI {

  static * sendInvitations(payload) {
    const postData = {
      emails : payload.emails.join(","),
      msg : payload.invitationText,
      add_admin : (payload.giveAdminRight ? 1 : 0),
      groupid : payload.groupid
    }
     const postDataStr = querystring.stringify(postData);
     console.log(postDataStr);
    return yield axios.get(yield getAPI("/send_invitations/?"+postDataStr),config)
  }
  static * removeUserFromGroup(payload) {
     const postData = querystring.stringify(payload);
    return yield axios.post(yield getAPI(`/remove_user_from_group/?`+postData,payload),config);
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
    return yield axios.post(yield getAPI(`/savetick/?`+postData,payload),config);
   }
   static * saveOpinion(payload) {
     payload.targetid = payload.problemid;
     const postData = querystring.stringify(payload);
     return yield axios.post(yield getAPI(`/saveopinion/?`+postData,payload),config);
   }
   static * saveFeedback(payload) {
     payload.pid = payload.problemid;
     const postData = querystring.stringify(payload);
     return yield axios.post(yield getAPI(`/savefeedback/?`+postData,payload),config);
   }

   static * delBetaVideo(payload) {
    return yield axios.post(yield getAPI(`/delbetavideo/?vid=${payload.videoid}`,payload),config);
   }
   static * addBetaVideo(payload) {
    return yield axios.post(yield getAPI(`/savebetavideo/?pid=${payload.problemid}&url=${payload.video_url}`,payload),config);
   }
   static * getGlobalAscents(payload) {
    return yield axios.get(yield getAPI(`/global_ascents/?pid=${payload.problemid}`,payload),config);
   }
  static * getProblem(payload) {
    return yield axios.get(yield getAPI("/problem/"+payload.id,payload),config);
  }
  static * deleteTick(payload) {
    return yield axios.get(yield getAPI(`/untick/?tickid=${payload.tickid}&pid=${payload.problemid}`,payload),config);
  }
  static * getProblems(payload) {
    //return yield axios.get(yield getAPI(`/problems/`,payload),config);
    return yield { data : problems};
  }
}
