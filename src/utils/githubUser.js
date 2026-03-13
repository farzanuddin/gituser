import PropTypes from "prop-types";

export const nullableStringProp = PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]);

export const githubUserShape = PropTypes.exact({
  html_url: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
  name: nullableStringProp,
  login: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  bio: nullableStringProp,
  public_repos: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  location: nullableStringProp,
  blog: nullableStringProp,
  company: nullableStringProp,
});

export const pickDisplayUserFields = ({
  html_url,
  avatar_url,
  name,
  login,
  created_at,
  bio,
  public_repos,
  followers,
  following,
  location,
  blog,
  company,
}) => ({
  html_url,
  avatar_url,
  name,
  login,
  created_at,
  bio,
  public_repos,
  followers,
  following,
  location,
  blog,
  company,
});
