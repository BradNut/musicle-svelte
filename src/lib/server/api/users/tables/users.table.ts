import { boolean, pgTable, text } from 'drizzle-orm/pg-core';
import { getTableColumns, type InferSelectModel, relations } from 'drizzle-orm';
import { citext, id, timestamps } from '../../common/utils/drizzle';
import { generateId } from '../../common/utils/crypto';
import { user_roles } from './user-roles.table';

/* -------------------------------------------------------------------------- */
/*                                    Table                                   */
/* -------------------------------------------------------------------------- */
export const usersTable = pgTable('users', {
  id: id()
    .primaryKey()
    .$defaultFn(() => generateId()),
  username: text().unique(),
  email: citext().unique().notNull(),
  first_name: text(),
  last_name: text(),
  email_verified: boolean().default(false),
  mfa_enabled: boolean().notNull().default(false),
  avatar: text(),
  ...timestamps,
});

/* -------------------------------------------------------------------------- */
/*                                  Relations                                 */
/* -------------------------------------------------------------------------- */
export const userRelations = relations(usersTable, ({ many }) => ({
  user_roles: many(user_roles),
}));

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type User = InferSelectModel<typeof usersTable>;
export type UserWithRelations = User & {};

const userColumns = getTableColumns(usersTable);

export const publicUserColumns = {
  id: userColumns.id,
  username: userColumns.username,
  email: userColumns.email,
  avatar: userColumns.avatar,
  first_name: userColumns.first_name,
  last_name: userColumns.last_name,
  ...timestamps,
};
