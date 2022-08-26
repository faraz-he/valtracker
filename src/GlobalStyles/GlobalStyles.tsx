import { memo } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Colours } from '../common/constants';

const StyleSheet = createGlobalStyle`
  body {
    font-family: RobotoSansWeb;
    color: white;
    background-color: ${Colours.Background};
    margin: 0;
    padding: 0;
  }
`;

export const GlobalStyles = memo(() => (
  <>
    <StyleSheet />
  </>
));
