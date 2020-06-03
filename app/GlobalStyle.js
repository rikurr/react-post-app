import { createGlobalStyle, css } from 'styled-components';
// @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500&display=swap');

const resetCss = css`
  a,
  abbr,
  acronym,
  address,
  applet,
  article,
  aside,
  audio,
  b,
  big,
  blockquote,
  body,
  caption,
  canvas,
  center,
  cite,
  code,
  dd,
  del,
  details,
  dfn,
  dialog,
  div,
  dl,
  dt,
  em,
  embed,
  figure,
  fieldset,
  figcaption,
  figure,
  form,
  footer,
  header,
  hgroup,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  html,
  i,
  iframe,
  img,
  ins,
  kbd,
  label,
  legend,
  li,
  mark,
  menu,
  nav,
  object,
  ol,
  output,
  p,
  pre,
  q,
  ruby,
  s,
  samp,
  section,
  main,
  small,
  span,
  strike,
  strong,
  sub,
  summary,
  sup,
  tt,
  table,
  tbody,
  textarea,
  tfoot,
  thead,
  time,
  tr,
  th,
  td,
  u,
  ul,
  var,
  video {
    font-family: inherit;
    font-size: 100%;
    font-weight: inherit;
    font-style: inherit;
    margin: 0;
    padding: 0;
    text-align: left;
    vertical-align: baseline;
    white-space: normal;
    border: 0;
    outline: 0;
    background: transparent;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  main {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  table {
    border-spacing: 0;
    border-collapse: collapse;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${resetCss}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    @media (max-width: 768px){
      font-size: 50%;
    }
  }

  body{
    background: #fff;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    color: #333;
    font-family: 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', メイリオ,
    Meiryo, 'ＭＳ Ｐゴシック', sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.8;
    text-size-adjust: 100%;
    }

  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }
  h1{
    font-size: 3.2rem;
    font-weight: bold;
  }
  h2{
    font-size: 2.4rem;
    font-weight: bold;
  }
  h3{
    font-size: 2rem;
    font-weight: bold;
  }
  h4,h5,h6{
    font-size: 1.8rem;
  }
  p{
    font-size: 1.6rem;
  }
  a{
    text-decoration: none;
    color: #878787;

  }
  a:hover{
    color: #aaa;
    text-decoration: none;
  }

  strong{
    color: #E84726;
  }

  input,button{
    font-size: 1.2rem;
  }
  .cutom-tooltip{
    background: #ddd;
    color: #333;
    padding: 4px 8px;
  }
  @media (max-width: 768px) {
    html{
      font-size: 50%;
    }
  }
`;
