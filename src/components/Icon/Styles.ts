import styled from "styled-components";

interface IProps {
   center: boolean;
   size: number;
   left: number;
   top: number;
   code: string;
}

export const StyledIcon = styled.i<IProps>`
   display: ${(props) => (props.center ? "inline-flex" : "inline-block")};
   align-items: center;
   justify-content: center;
   font-size: ${(props) => `${props.size}px`};
   ${(props) =>
      props.left || props.top
         ? `transform: translate(${props.left}px, ${props.top}px);`
         : ""};
   &:before {
      content: "${(props) => props.code}";
      font-family: "jira" !important;
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
   }
`;
