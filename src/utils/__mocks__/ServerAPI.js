// __mocks__/ServerAPI.js

const ServerAPI = jest.genMockFromModule('./ServerAPI')

const tallies = [
  {
    id: 'testtally1',
    title: 'test tally 1',
  },
  {
    id: 'testtally2',
    title: 'test tally 2',
  },
]

ServerAPI.getBills = () => Promise.resolve(tallies)

module.exports = ServerAPI
