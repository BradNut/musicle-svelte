import { type InferSelectModel, relations, getTableColumns } from 'drizzle-orm';
import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { rolesTable } from '../../roles/tables/roles.table';
import { usersTable } from './users.table';
import { generateId } from '../../common/utils/crypto';
import { id, timestamps } from '../../common/utils/drizzle';

/* -------------------------------------------------------------------------- */
/*                                    Table                                   */
/* -------------------------------------------------------------------------- */
export const user_roles = pgTable('user_roles', {
  id: id()
    .primaryKey()
    .$defaultFn(() => generateId()),
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  role_id: uuid()
    .notNull()
    .references(() => rolesTable.id, { onDelete: 'cascade' }),
  primary: boolean().default(false),
  ...timestamps,
});

/* -------------------------------------------------------------------------- */
/*                                  Relations                                 */
/* -------------------------------------------------------------------------- */
export const user_role_relations = relations(user_roles, ({ one }) => ({
  role: one(rolesTable, {
    fields: [user_roles.role_id],
    references: [rolesTable.id],
  }),
  user: one(usersTable, {
    fields: [user_roles.user_id],
    references: [usersTable.id],
  }),
}));

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type UserRoles = InferSelectModel<typeof user_roles>;
export type UserRolesWithRelations = UserRoles & {};

const userRolesColumns = getTableColumns(user_roles);

export const publicUserColumns = {
  id: userRolesColumns.id,
  ...timestamps,
};
