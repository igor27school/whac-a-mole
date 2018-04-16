import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { ListBills } from './ListBills'

jest.mock('../utils/ServerAPI')

describe('ListBills tests', () => {
  const setup = () => {
    const props = {
      hasBills: true,
      bills: [
        {
          id: 'bill1',
          title: 'bill title 1',
        },
        {
          id: 'bill2',
          title: 'bill title 2',
        },
      ],
      fetchBillsFromServer: jest.fn(),
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('Bills match the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<ListBills {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
