import { type InferSelectModel, relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { id, timestamps } from '../../common/utils/drizzle';
import { usersTable } from '../../users/tables/users.table';
import { generateId } from '../../common/utils/crypto';

/* -------------------------------------------------------------------------- */
/*                                    Table                                   */
/* -------------------------------------------------------------------------- */
export const twoFactorTable = pgTable('two_factor', {
  id: id()
    .primaryKey()
    .$defaultFn(() => generateId()),
  secret: text().notNull(),
  enabled: boolean().notNull().default(false),
  user_id: id()
    .notNull()
    .references(() => usersTable.id)
    .unique('two_factor_user_id_unique'),
  ...timestamps,
});

/* -------------------------------------------------------------------------- */
/*                                  Relations                                 */
/* -------------------------------------------------------------------------- */
export const emailVerificationsRelations = relations(twoFactorTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [twoFactorTable.user_id],
    references: [usersTable.id],
  }),
}));

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type TwoFactor = InferSelectModel<typeof twoFactorTable>;
