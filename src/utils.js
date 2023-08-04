import { Octokit } from "octokit";

export const getGithubUserInfo = async (userName) => {
  const octokit = new Octokit();
  
  let response;
  response = await octokit.request("GET /users/{username}", {
    username: userName,
  });

  return response.data;
};

export const convertDate = (dateString) => {
  const dateObject = new Date(dateString);
  const monthData = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthText = monthData[dateObject.getMonth()];

  return `${dateObject.getDate()} ${monthText} ${dateObject.getFullYear()}`;
};
