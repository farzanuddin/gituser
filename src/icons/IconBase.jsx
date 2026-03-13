import PropTypes from "prop-types";
import styled from "styled-components";

const StyledIcon = styled.svg`
  display: block;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  flex-shrink: 0;
  color: ${({ $color }) => $color || "inherit"};
`;

export const IconBase = ({ children, width, height, color, viewBox, ...rest }) => {
  return (
    <StyledIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      $width={width}
      $height={height}
      $color={color}
      {...rest}
    >
      {children}
    </StyledIcon>
  );
};

IconBase.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  viewBox: PropTypes.string,
};

IconBase.defaultProps = {
  width: "20px",
  height: "20px",
  color: undefined,
  viewBox: "0 0 20 20",
};
