import { inArray } from "drizzle-orm"
import { db } from "../../src/db"
import { users } from "../../src/db/schema"

export const deleteUsersById = async (userIds: string[]) => {
  const uniqueUserIds = [...new Set(userIds.filter(Boolean))]

  if (!uniqueUserIds.length) {
    return
  }

  await db.delete(users).where(inArray(users.id, uniqueUserIds))
}