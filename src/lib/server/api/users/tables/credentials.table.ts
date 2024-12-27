import type { InferSelectModel } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { id, timestamps } from '../../common/utils/drizzle';
import { usersTable } from './users.table';
import { generateId } from '../../common/utils/crypto';

/* -------------------------------------------------------------------------- */
/*                                    Table                                   */
/* -------------------------------------------------------------------------- */
export enum CredentialsType {
  SECRET = 'secret',
  PASSWORD = 'password',
  TOTP = 'totp',
  HOTP = 'hotp',
}

export const credentialsTable = pgTable('credentials', {
  id: id()
    .primaryKey()
    .$defaultFn(() => generateId()),
  user_id: id()
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  type: text().notNull().default(CredentialsType.PASSWORD),
  secret_data: text().notNull(),
  ...timestamps,
});

export type Credentials = InferSelectModel<typeof credentialsTable>;
