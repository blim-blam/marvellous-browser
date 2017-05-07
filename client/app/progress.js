import fetchIntercept from 'fetch-intercept'
import Progress from 'react-progress-2'

/**
 * The progress bar behaviour could use some refinement. Currently it doesn't show much more than "A thing started loading and hasn't finished"
 *
 *  @TODO Ideally it would show actual progress of HTTP requests
 */
export const progress = {
  setup: () => {
    fetchIntercept.register({
      request: (
        url,
        config
      ) => {
        Progress.show()
        return [url, config]
      },

      requestError: (error) => {
        Progress.hide()
        return Promise.reject(error)
      },

      response: (response) => {
        Progress.hide()
        return response
      },

      responseError: (error) => {
        Progress.hide()
        return Promise.reject(error)
      }
    })
  }
}

