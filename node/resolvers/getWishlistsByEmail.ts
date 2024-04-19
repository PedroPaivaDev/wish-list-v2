import { auth } from '../middleware/auth'
import { configuration } from '../middleware/configuration'

export const getWishlistsByEmail = async (
  _: unknown,
  args: {
    email: string
    page: number
    pageSize: number
  },
  ctx: Context
) => {
  const {
    clients: { md },
  } = ctx

  const { page, pageSize } = args

  const pagination = {
    page,
    pageSize,
  }

  try {
    await configuration(ctx)
    const { email } = await auth(ctx)

    const wishlists = await md.searchWistlist('email', email, pagination)

    return wishlists || []
  } catch (error) {
    return error
  }
}
