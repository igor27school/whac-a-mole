// __mocks__/ServerAPI.js

const ServerAPI = jest.genMockFromModule('./ServerAPI')

const bills = [
  {
    id: 'testbill1',
    title: 'test bill 1',
  },
  {
    id: 'testbill2',
    title: 'test bill 2',
  },
]

ServerAPI.getBills = () => Promise.resolve(bills)

module.exports = ServerAPI
