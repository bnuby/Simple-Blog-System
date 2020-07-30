import App from "next/app";
import { ThemeProvider } from "styled-components";
import "~styles/bootstrap.scss";
import Head from "next/head";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/css/toastr.min.css" />
          <script src="/js/jquery.min.js" />
          <script src="/js/toastr.min.js" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
