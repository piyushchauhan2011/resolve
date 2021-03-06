import jwt from 'jsonwebtoken'
import jwtSecret from '../common/jwt_secret'
import { v4 as uuid } from 'uuid'
import md5 from 'md5'

const routeRegisterCallback = async ({ resolve }, login, password) => {
  const { data: existingUser } = await resolve.executeQuery({
    modelName: 'Users',
    resolverName: 'user',
    resolverArgs: { login: login.trim() },
  })

  if (existingUser) {
    throw new Error('User cannot be created')
  }

  const user = {
    login: login.trim(),
    passwordHash: md5(password),
  }

  const token = jwt.sign(user, jwtSecret)

  await resolve.executeCommand({
    type: 'createUser',
    aggregateId: uuid(),
    aggregateName: 'User',
    payload: user,
    jwt,
  })

  return token
}

export default routeRegisterCallback
