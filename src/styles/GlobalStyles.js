import { createGlobalStyle } from 'styled-components';

export const darkTheme = {
  colors: {
    background: '#000',
    foreground: '#fff',
    accent: '#888',
    hoverBg: '#222',
    border: '#333',
    activeItemBg: '#1f1f1f',
    blue: '#58a6ff',
    red: '#ff5555',
    sidebarBg: '#111',
  },
  sizes: {
    sidebarWidth: '280px',
    noteListWidth: '320px',
  },
};

export const lightTheme = {
  colors: {
    background: '#fff',
    foreground: '#000',
    accent: '#666',
    hoverBg: '#f0f0f0',
    border: '#ddd',
    activeItemBg: '#bfdbf6ff',
    blue: '#0969da',
    red: '#cf222e',
    sidebarBg: '#f6f8fa',
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
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;
