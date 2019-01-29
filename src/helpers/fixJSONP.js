export default function fixJSONP(payload) {
  // Remove first and last, because of JSONP
  if (payload.substr(0, 1) == "(") {
    payload= JSON.parse(payload.substr(1).slice(0, -1));
  } else {
    payload= JSON.parse(payload);
  }
  return payload;
}
