import styled from "styled-components";

import { device } from "./utils/theme";

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;

  @media ${device.tablet} {
    width: 73rem;
  }
`;
