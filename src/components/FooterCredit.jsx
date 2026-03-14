import styled from "styled-components";

const GITHUB_PAGE_URL = "https://github.com/farzanuddin";

export const FooterCredit = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Credit>
            <CreditText>
                &copy; {currentYear} <CreditLink href={GITHUB_PAGE_URL} target="_blank" rel="noreferrer">
                    Farzan Uddin
                </CreditLink>
            </CreditText>
        </Credit>
    );
};

const Credit = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const CreditText = styled.p`
  color: ${({ theme }) => theme.dateJoined};
  font-size: 1.2rem;
  font-weight: 600;
`;

const CreditLink = styled.a`
  color: inherit;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.searchName};
    text-decoration: none;
  }
`;