import styled from "styled-components";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { device } from "../styles/utils/theme";
import { CompanyIcon, LinkIcon, LocationIcon } from "../icons";
import { githubRepoShape, githubUserShape, nullableStringProp } from "../utils/githubUser";

const EMPTY_BIO_TEXT = "This Profile has no bio.";

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
  const available = Boolean(text);
  const content = !text ? (
    "Not Available"
  ) : type === "link" ? (
    <a target="_blank" rel="noopener noreferrer" href={text}>
      {text}
    </a>
  ) : (
    text
  );

  return (
    <Information $fade={available ? 1 : 0.5}>
      <span>{icon}</span>
      {content}
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

const RecentRepos = ({ repos }) => {
  if (!repos.length) {
    return null;
  }

  return (
    <RecentReposSection>
      <h3>Recent Repositories</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{dayjs(repo.pushed_at).format("DD MMM YYYY")}</p>
          </li>
        ))}
      </ul>
    </RecentReposSection>
  );
};

export const Display = ({ data }) => {
  const bioText = data.bio || EMPTY_BIO_TEXT;

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
      <UserBio>{bioText}</UserBio>
      <UserGithubStats
        repos={data.public_repos}
        followers={data.followers}
        following={data.following}
      />
      <UserInformation location={data.location} blog={data.blog} company={data.company} />
      <RecentRepos repos={data.recent_repos} />
    </DisplayResults>
  );
};

StatBlock.propTypes = {
  name: PropTypes.string.isRequired,
  stat: PropTypes.number.isRequired,
};

UserGithubStats.propTypes = {
  repos: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
};

Info.propTypes = {
  text: nullableStringProp,
  type: PropTypes.oneOf(["text", "link"]).isRequired,
  icon: PropTypes.node.isRequired,
};

UserInformation.propTypes = {
  location: nullableStringProp,
  blog: nullableStringProp,
  company: nullableStringProp,
};

RecentRepos.propTypes = {
  repos: PropTypes.arrayOf(githubRepoShape).isRequired,
};

Display.propTypes = {
  data: githubUserShape.isRequired,
};

const DisplayResults = styled.section`
  background-color: ${({ theme }) => theme.resultsBackground};
  margin: clamp(1.2rem, 1.8vh, 2rem) 0 clamp(1rem, 1.6vh, 1.8rem);
  padding: clamp(1.8rem, 2.6vh, 2.2rem) clamp(2rem, 6vw, 2.8rem);
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.elevation.cardShadow};

  display: grid;
  grid-template-areas:
    "user-image user-name"
    "user-bio user-bio"
    "user-github-stats user-github-stats"
    "user-information user-information"
    "recent-repos recent-repos";
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: auto 1fr;

  @media (max-width: 520px) {
    padding-top: 2rem;
    padding-bottom: 2.4rem;
    padding-left: 2.2rem;
    padding-right: 2.2rem;
  }

  @media ${device.laptop} {
    grid-template-areas:
      "user-image user-name"
      "user-image user-bio"
      "user-image user-github-stats"
      "user-image user-information"
      "user-image recent-repos";

    grid-template-columns: auto minmax(0, 1fr);
    column-gap: 2rem;
  }
`;

const UserImage = styled.div`
  width: clamp(7rem, 10vw, 10rem);
  grid-area: user-image;

  img {
    border-radius: ${({ theme }) => theme.radius.full};
  }

  @media ${device.laptop} {
    justify-self: start;
  }
`;

const UserName = styled.div`
  grid-area: user-name;
  display: grid;
  grid-template-areas:
    "name"
    "username"
    "join-date";
  gap: 0.3rem;
  margin-left: 1.8rem;

  @media ${device.laptop} {
    margin-left: 0;
    grid-template-areas:
      "name join-date"
      "username username";

    gap: ${({ theme }) => theme.spacing.sm};
  }

  h2 {
    color: ${({ theme }) => theme.userName};
    grid-area: name;
    font-size: clamp(2rem, 2.3vw, 2.8rem);
    line-height: 1.15;
  }

  a {
    color: ${({ theme }) => theme.searchName};
    grid-area: username;
    font-size: 1.4rem;
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.dateJoined};
    grid-area: join-date;
    justify-self: start;
    align-self: center;
    margin-top: 0.2rem;

    @media ${device.laptop} {
      justify-self: end;
      margin-top: 0;
    }
  }
`;

const UserBio = styled.p`
  grid-area: user-bio;
  line-height: 1.6;
  margin-top: 1rem;
  color: ${({ theme }) => theme.userBio};
  font-size: 1.55rem;
`;

const UserStats = styled.div`
  grid-area: user-github-stats;
  background-color: ${({ theme }) => theme.userStats.background};
  text-align: center;
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 1.2em 1.6em;
  margin-top: 1.2rem;

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
  grid-area: user-information;
  margin-top: 1.2rem;
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};

  div {
    display: grid;
    gap: ${({ theme }) => theme.spacing.lg};

    @media ${device.tablet} {
      grid-template-columns: 1fr 1fr;
    }
  }

  p {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    color: ${({ theme }) => theme.userSocial.color};
  }

  span {
    width: 2.5rem;
    text-align: center;
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
  opacity: ${({ $fade }) => $fade};
`;

const RecentReposSection = styled.section`
  grid-area: recent-repos;
  margin-top: 1.6rem;

  h3 {
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.userStats.statTitle};
    margin-bottom: 0.8rem;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing.sm};
  }

  li {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 0.35rem;
    background-color: ${({ theme }) => theme.userStats.background};
    border-radius: ${({ theme }) => theme.radius.sm};
    padding: 0.9rem 1.1rem;
  }

  a {
    color: ${({ theme }) => theme.userSocial.link};
    font-size: 1.6rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  p {
    color: ${({ theme }) => theme.dateJoined};
    font-size: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
