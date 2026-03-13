import styled from "styled-components";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { device } from "../styles/utils/theme";

import { CompanyIcon, LinkIcon, LocationIcon } from "../icons";

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
    if (!text) return "Not Available";
    else if (type === "link")
      return (
        <a target="_blank" rel="noopener noreferrer" href={text}>
          {text}
        </a>
      );
    else return text;
  };

  const available = Boolean(text);

  return (
    <Information fade={available ? 1 : 0.5}>
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
        <a target="_blank" rel="noopener noreferrer" href={data.html_url}>
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
  margin-top: clamp(0.8rem, 1.2vh, 1.4rem);
  padding: clamp(1.2rem, 1.8vh, 1.8rem) clamp(1.2rem, 1.8vw, 1.7rem);
  border-radius: ${({ theme }) => theme.radius.lg};

  display: grid;
  grid-template-areas:
    "userImage userName"
    "UserBio UserBio"
    "UserGitHubStats UserGitHubStats"
    "UserInformation UserInformation";
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: auto 1fr;

  @media ${device.laptop} {
    grid-template-areas:
      "userImage userName"
      "userImage UserBio"
      "userImage UserGitHubStats"
      "userImage UserInformation";

    grid-template-columns: 1fr 3fr;
  }
`;

const UserImage = styled.div`
  width: clamp(7rem, 10vw, 10rem);
  grid-area: userImage;

  img {
    border-radius: ${({ theme }) => theme.radius.full};
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

    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const UserBio = styled.p`
  grid-area: UserBio;
  line-height: 1.6;
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.userBio};
`;

const UserStats = styled.div`
  grid-area: UserGitHubStats;
  background-color: ${({ theme }) => theme.userStats.background};
  text-align: center;
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 1.2em 1.6em;
  margin-top: ${({ theme }) => theme.spacing.sm};

  @media ${device.tablet} {
    text-align: left;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.6em;
    font-weight: 400;
    color: ${({ theme }) => theme.userStats.statTitle};
  }

  p {
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.userStats.statNum};

    @media ${device.laptop} {
      font-size: 2.2rem;
    }
  }
`;

const UserInfo = styled.div`
  grid-area: UserInformation;
  margin-top: ${({ theme }) => theme.spacing.sm};

  div {
    display: flex;

    & > *:first-child {
      margin-right: 30%;
    }
  }

  p {
    display: flex;
    gap: 1.2rem;
    margin-top: ${({ theme }) => theme.spacing.sm};
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
