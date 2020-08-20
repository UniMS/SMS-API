module.exports = function (url, fieldname) {
  let prefix;
  if (url.includes("parent")) {
    if (fieldname === "fatherNrcFront") prefix = "f-nrc-front";
    else if (fieldname === "motherNrcFront") prefix = "m-nrc-front";
    else if (fieldname === "fatherNrcBack") prefix = "f-nrc-back";
    else if (fieldname === "motherNrcBack") prefix = "m-nrc-back";
  } else {
    if (fieldname === "nrcFront") prefix = "nrc-front";
    else if (fieldname === "nrcBack") prefix = "nrc-back";
    else if (fieldname === "photo") prefix = "student";
    else if (fieldname === "wardRecommendationLetter") prefix = "ward";
    else if (fieldname === "policeRecommendationLetter") prefix = "police";
  }

  return prefix;
};
