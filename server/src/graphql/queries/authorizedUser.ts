import { gql } from 'apollo-server'
import AuthService from '../../services/authentication/authService'
import { getAuthorizedUser } from '../../services/user/userService'
import { Context } from '../../utils/entities'

export const typeDefs = gql`
  extend type Query {
    """
    Returns the authorized user.
    """
    authorizedUser: User
  }
`

export const resolvers = {
  Query: {
    authorizedUser: (_obj: null, _args: null, { authService }: Context) => getAuthorizedUser(authService)
  },
}

export default {
  typeDefs,
  resolvers,
}