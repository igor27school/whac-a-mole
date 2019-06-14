import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { ListTallies } from './ListTallies'

jest.mock('../utils/ServerAPI')

describe('ListTallies tests', () => {
  const setup = () => {
    const props = {
      hasTallies: true,
      tallies: [
        {
          id: 'tally1',
          title: 'tally title 1',
        },
        {
          id: 'tally2',
          title: 'tally title 2',
        },
      ],
      fetchTalliesFromServer: jest.fn(),
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('Tallies match the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<ListTallies {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
