import React from 'react'
import App from './App'
import TestUtils from 'react-addons-test-utils'
let {expect, describe, it} = global

describe('App', () => {
  let shallowRenderer = TestUtils.createRenderer()

  it('renders without crashing', () => {
    shallowRenderer.render(<App />)
    let renderedElement = shallowRenderer.getRenderOutput()
    expect(renderedElement).toEqual(expect.anything())
  })
})
