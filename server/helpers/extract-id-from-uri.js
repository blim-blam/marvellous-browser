import R from 'ramda'

export const extractIdFromURI = R.compose(R.last, R.split('/'))
