export default function fixJSONP(payload) {
  // Remove first and last, because of JSONP
  console.log("Fixing JSONP");
  if (payload.substr(0, 1) == "(") {
    console.log("... but only if needed...");
    payload= JSON.parse(payload.substr(1).slice(0, -1));
  } else {
    payload= JSON.parse(payload);
  }
  return payload;
}
