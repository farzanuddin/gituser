import styled from "styled-components";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { device } from "../styles/utils/theme";

import { LocationIcon } from "./icons/Location";
import { LinkIcon } from "./icons/Link";
import { CompanyIcon } from "./icons/Company";

const StatBlock = ({ name, stat }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{stat}</p>
    </div>
  );
};

const UserGithubStats = ({ repos, followers, following }) => {
  return (
    <UserStats>
      <StatBlock name="Repos" stat={repos} />
      <StatBlock name="Followers" stat={followers} />
      <StatBlock name="Following" stat={following} />
    </UserStats>
  );
};

const Info = ({ text, type, icon }) => {
  const getText = () => {
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
    <Information fade={availible ? 1 : 0.5}>
      <span>{icon}</span>
      {getText()}
    </Information>
  );
};

const UserInformation = ({ location, blog, company }) => {
  return (
    <UserInfo>
      <div>
        <Info text={location} type="text" icon={<LocationIcon />} />
        <Info text={company} type="text" icon={<CompanyIcon />} />
      </div>
      <Info text={blog} type="link" icon={<LinkIcon />} />
    </UserInfo>
  );
};

export const Display = ({ data }) => {
  return (
    <DisplayResults>
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
        blog={data.blog}
        company={data.company}
      ></UserInformation>
    </DisplayResults>
  );
};

StatBlock.propTypes = {
  name: PropTypes.string,
  stat: PropTypes.number,
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

const DisplayResults = styled.section`
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

const UserStats = styled.div`
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

const UserInfo = styled.div`
  grid-area: UserInformation;
  margin-top: 1.5rem;

  div {
    display: flex;

    & > *:first-child {
      margin-right: 30%;
    }
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

  a {
    color: ${({ theme }) => theme.userSocial.link};
    grid-column: span 3;
  }

  a:visited {
    color: ${({ theme }) => theme.userSocial.link};
  }
`;

const Information = styled.p`
  opacity: ${({ fade }) => fade};
`;
