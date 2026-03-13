import styled from "styled-components";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { device } from "../styles/utils/theme";
import { CompanyIcon, LinkIcon, LocationIcon } from "../icons";
import { githubUserShape, nullableStringProp } from "../utils/githubUser";

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

Display.propTypes = {
  data: githubUserShape.isRequired,
};

const DisplayResults = styled.section`
  background-color: ${({ theme }) => theme.resultsBackground};
  margin-top: clamp(1.2rem, 1.8vh, 2rem);
  padding: clamp(1.2rem, 1.8vh, 1.8rem) clamp(1.2rem, 1.8vw, 1.7rem);
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.elevation.cardShadow};

  display: grid;
  grid-template-areas:
    "user-image user-name"
    "user-bio user-bio"
    "user-github-stats user-github-stats"
    "user-information user-information";
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: auto 1fr;

  @media ${device.laptop} {
    grid-template-areas:
      "user-image user-name"
      "user-image user-bio"
      "user-image user-github-stats"
      "user-image user-information";

    grid-template-columns: 1fr 3fr;
  }
`;

const UserImage = styled.div`
  width: clamp(7rem, 10vw, 10rem);
  grid-area: user-image;

  img {
    border-radius: ${({ theme }) => theme.radius.full};
  }

  @media ${device.laptop} {
    justify-self: center;
  }
`;

const UserName = styled.div`
  grid-area: user-name;
  margin-left: 1.8rem;

  @media ${device.laptop} {
    margin-left: 0;
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

  div {
    display: grid;
    gap: ${({ theme }) => theme.spacing.sm};

    @media ${device.tablet} {
      grid-template-columns: 1fr 1fr;
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
