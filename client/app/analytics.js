import ReactGA from 'react-ga'
ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID)

export function logPageView () {
  if (!process.env.GOOGLE_ANALYTICS_ID) {
    return
  }

  ReactGA.set({
    page: window.location.pathname + window.location.search
  })

  ReactGA.pageview(window.location.pathname + window.location.search)
}

