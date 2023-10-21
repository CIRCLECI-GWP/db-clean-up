const axios = require("axios").default;
require("dotenv").config();
const API_BASE_URL = "https://circleci.com/api/v2/project";

const vcs = process.env.VCS_TYPE;
const org = process.env.ORG_NAME;
const project = process.env.REPO_NAME;
const token = process.env.CIRCLECI_TOKEN;
const postScheduleEndpoint = `${API_BASE_URL}/${vcs}/${org}/${project}/schedule`;

async function checkAndChangePermissionAccess() {
  try {
    let res = await axios.post(
      postScheduleEndpoint,
      {
        name: "Check and Change permission",
        description: "Check and revoke permissions assigned to users.",
        "attribution-actor": "current",
        parameters: {
          branch: "main",
          "run-schedule": true,
        },
        timetable: {
          "per-hour": 30,
          "hours-of-day": [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
          ],
          "days-of-week": ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
        },
      },
      {
        headers: { "circle-token": token },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error.response);
  }
}

checkAndChangePermissionAccess();
