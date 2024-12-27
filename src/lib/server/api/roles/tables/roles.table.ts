import { type InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { user_roles } from '../../users/tables/user-roles.table';
import { timestamps } from '../../common/utils/drizzle';
import { id } from '../../common/utils/drizzle';
import { generateId } from '../../common/utils/crypto';

export enum RoleName {
  ADMIN = 'admin',
  EDITOR = 'editor',
  MODERATOR = 'moderator',
  USER = 'user',
}

/* -------------------------------------------------------------------------- */
/*                                    Table                                   */
/* -------------------------------------------------------------------------- */
export const rolesTable = pgTable('roles', {
  id: id()
    .primaryKey()
    .$defaultFn(() => generateId()),
  name: text().unique().notNull(),
  ...timestamps,
});

/* -------------------------------------------------------------------------- */
/*                                  Relations                                 */
/* -------------------------------------------------------------------------- */
export const role_relations = relations(rolesTable, ({ many }) => ({
  user_roles: many(user_roles),
}));

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type Roles = InferSelectModel<typeof rolesTable>;


