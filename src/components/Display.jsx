import styled from "styled-components";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { device } from "../styles/utils/theme";

import { LocationIcon } from "./icons/Location";
import { LinkIcon } from "./icons/Link";
import { TwitterIcon } from "./icons/Twitter";
import { CompanyIcon } from "./icons/Company";

const Icon = ({ icon }) => {
  return <styledIcon>{icon}</styledIcon>;
};

const UserGithubStats = ({ repos, followers, following }) => {
  return (
    <UserGitHubStatsStyled>
      <div>
        <h3>Repos</h3>
        <p>{repos}</p>
      </div>
      <div>
        <h3>Followers</h3>
        <p>{followers}</p>
      </div>
      <div>
        <h3>Following</h3>
        <p>{following}</p>
      </div>
    </UserGitHubStatsStyled>
  );
};

const Info = ({ text, type, icon }) => {
  const writeSomething = () => {
    if (!text) return "Not Availible";
    else if (type === "link")
      return (
        <a target="__blank" href={text}>
          {text}
        </a>
      );
    else return text;
  };
  const availible = text ? true : false;
  return (
    <InfoStyled fade={availible ? 1 : 0.5}>
      <span>{icon}</span>
      {writeSomething()}
    </InfoStyled>
  );
};

const UserInformation = ({ location, twitter, blog, company }) => {
  return (
    <UserInformationStyled>
      <Info text={location} type="text" icon={<LocationIcon />} />
      <Info text={blog} type="link" icon={<LinkIcon />} />
      <Info text={twitter} type="text" icon={<TwitterIcon />} />
      <Info text={company} type="text" icon={<CompanyIcon />} />
    </UserInformationStyled>
  );
};

export const Display = ({ data }) => {
  return (
    <DisplayResultsStyled>
      <UserImage>
        <img src={data.avatar_url} alt="User Profile" />
      </UserImage>
      <UserName>
        <h2>{data.name}</h2>
        <a target="__blank" href={data.html_url}>
          @{data.login}
        </a>
        <p>Joined {dayjs(data.created_at).format("MMMM YYYY")}</p>
      </UserName>
      {data.bio ? <UserBio>{data.bio}</UserBio> : <UserBio>This Profile has no bio.</UserBio>}
      <UserGithubStats
        repos={data.public_repos}
        followers={data.followers}
        following={data.following}
      ></UserGithubStats>
      <UserInformation
        location={data.location}
        twitter={data.twitter_username}
        blog={data.blog}
        company={data.company}
      ></UserInformation>
    </DisplayResultsStyled>
  );
};

Icon.propTypes = {
  icon: PropTypes.node,
};

UserGithubStats.propTypes = {
  repos: PropTypes.number,
  followers: PropTypes.number,
  following: PropTypes.number,
};

Info.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(["text", "link"]),
  icon: PropTypes.node,
};

UserInformation.propTypes = {
  location: PropTypes.string,
  twitter: PropTypes.string,
  blog: PropTypes.string,
  company: PropTypes.string,
};

Display.propTypes = {
  data: PropTypes.shape({
    html_url: PropTypes.string,
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    login: PropTypes.string,
    created_at: PropTypes.string,
    bio: PropTypes.string,
    public_repos: PropTypes.number,
    followers: PropTypes.number,
    following: PropTypes.number,
    location: PropTypes.string,
    twitter_username: PropTypes.string,
    blog: PropTypes.string,
    company: PropTypes.string,
  }),
};

const DisplayResultsStyled = styled.section`
  background-color: ${({ theme }) => theme.resultsBackground};
  margin-top: 3rem;
  padding: 2.2em 1.7em;
  border-radius: 15px;

  display: grid;
  grid-template-areas:
    "userImage userName"
    "UserBio UserBio"
    "UserGitHubStats UserGitHubStats"
    "UserInformation UserInformation";
  gap: 1rem;
  grid-template-columns: auto 1fr;

  @media ${device.laptop} {
    grid-template-areas:
      "userImage userName"
      "userImage UserBio"
      "UserImage UserGitHubStats"
      "UserImage UserInformation";

    grid-template-columns: 1fr 3fr;
  }
`;

const UserImage = styled.div`
  width: 12rem;
  grid-area: userImage;

  img {
    border-radius: 50%;
  }

  @media ${device.laptop} {
    justify-self: center;
  }
`;

const UserName = styled.div`
  grid-area: userName;
  margin-left: 1.5rem;

  @media ${device.laptop} {
    margin-left: 0;
  }
  h2 {
    color: ${({ theme }) => theme.userName};
    grid-area: name;
  }

  a {
    color: ${({ theme }) => theme.searchName};
    grid-area: username;
  }

  p {
    color: ${({ theme }) => theme.dateJoined};
    grid-area: join-date;
    justify-self: end;
    align-self: center;
    margin-top: 1.5rem;

    @media ${device.laptop} {
      margin-top: 0;
    }
  }

  @media ${device.laptop} {
    display: grid;
    grid-template-areas:
      "name join-date"
      "username username";

    gap: 1rem;
  }
`;

const UserBio = styled.p`
  grid-area: UserBio;
  line-height: 2;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.userBio};
`;

const UserGitHubStatsStyled = styled.div`
  grid-area: UserGitHubStats;
  background-color: ${({ theme }) => theme.userStats.background};
  text-align: center;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 10px;
  padding: 1.5em 2.2em;
  margin-top: 1.5rem;

  @media ${device.tablet} {
    text-align: left;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.6em;
    font-weight: normal;
    color: ${({ theme }) => theme.userStats.statTitle};
  }

  p {
    font-size: 1.6rem;
    font-weight: bold;
    color: ${({ theme }) => theme.userStats.statNum};

    @media ${device.laptop} {
      font-size: 2.2rem;
    }
  }
`;

const UserInformationStyled = styled.div`
  grid-area: UserInformation;
  margin-top: 1.5rem;

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  p {
    display: flex;
    gap: 1.2rem;
    margin-top: 1.5rem;
    align-items: center;
    color: ${({ theme }) => theme.userSocial.color};
  }

  span {
    width: 2.5rem;
    text-align: center;

    svg path {
      fill: ${({ theme }) => theme.userSocial.color};
    }
  }

  a:visited {
    color: ${({ theme }) => theme.userSocial.color};
  }
`;

const InfoStyled = styled.p`
  opacity: ${({ fade }) => fade};
`;
