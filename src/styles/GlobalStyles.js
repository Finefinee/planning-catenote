import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    background: '#000',
    foreground: '#fff',
    accent: '#888',
    hoverBg: '#222',
    border: '#333',
    blue: '#58a6ff',
    red: '#ff5555',
  },
  sizes: {
    sidebarWidth: '280px',
    noteListWidth: '320px',
  },
};

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.foreground};
    overflow: hidden;
  }
`;
