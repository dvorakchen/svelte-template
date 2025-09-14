import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable('users', {
		id: { type: 'serial', primaryKey: true },
		username: { type: 'varchar(50)', notNull: true, unique: true },
		email: { type: 'varchar(100)', notNull: true, unique: true },
		password_hash: { type: 'varchar(50)', notNull: true },
		phone_number: { type: 'varchar(15)', notNull: true, unique: true },
		balance: { type: 'numeric(10, 2)' },
		// 0: disabled, 1 enabled
		status: { type: 'integer', notNull: true, default: 0 },
		attributes: { type: 'jsonb', notNull: true, default: '{}' },
		create_at: {
			notNull: true,
			type: 'timestamptz',
			default: pgm.func('current_timestamp')
		}
	});

	pgm.sql(`
    INSERT INTO users (username, email, password_hash, phone_number, balance, status, attributes) VALUES
    ('admin', 'admin@example.com', '', '18812011000', 1000.00, 1, '{"theme": "dark", "language": "zh", "permissions": ["admin_access"]}')
    ON CONFLICT (email) DO NOTHING;
  `);
	// 创建 roles 表
	pgm.createTable('roles', {
		id: { type: 'serial', primaryKey: true },
		name: { type: 'varchar(50)', notNull: true, unique: true },
		attributes: { type: 'text[]' },
		description: { type: 'varchar(256)' }
	});

	pgm.sql(`
    INSERT INTO roles (name, description, attributes) VALUES
    ('admin', '系统管理员', '{"admin_access"}'),
    ('user', '普通用户', '{"base_access"}'),
    ('vip', 'VIP用户', '{"premium_features", "priority_support"}')
    ON CONFLICT (name) DO NOTHING;
  `);

	// 创建 user_roles 关联表
	pgm.createTable('user_roles', {
		user_id: { type: 'integer', notNull: true },
		role_id: { type: 'integer', notNull: true }
	});

	// 添加 user_roles 表的主键和外键约束
	pgm.addConstraint('user_roles', 'user_roles_pkey', {
		primaryKey: ['user_id', 'role_id']
	});

	pgm.addConstraint('user_roles', 'user_roles_user_id_fkey', {
		foreignKeys: {
			columns: 'user_id',
			references: 'users(id)',
			onDelete: 'CASCADE'
		}
	});

	pgm.addConstraint('user_roles', 'user_roles_role_id_fkey', {
		foreignKeys: {
			columns: 'role_id',
			references: 'roles(id)',
			onDelete: 'CASCADE'
		}
	});

	pgm.sql(`
    -- 管理员用户拥有 admin 角色
    INSERT INTO user_roles (user_id, role_id)
    SELECT u.id, r.id 
    FROM users u, roles r 
    WHERE u.username = 'admin' AND r.name = 'admin'
    ON CONFLICT (user_id, role_id) DO NOTHING;
  `);

	// 创建 sms_captcha 表
	pgm.createTable('sms_captcha', {
		id: { type: 'serial', primaryKey: true },
		phone_number: { type: 'varchar(50)', notNull: true },
		code: { type: 'varchar(10)', notNull: true },
		is_used: { type: 'boolean', notNull: true, default: false },
		expires_at: {
			type: 'timestamptz',
			notNull: true,
			default: pgm.func("now() + interval '5 minutes'")
		},
		create_at: {
			notNull: true,
			type: 'timestamptz',
			default: pgm.func('current_timestamp')
		}
	});

	// 创建 transactions 表
	pgm.createTable('transactions', {
		id: { type: 'serial', primaryKey: true },
		user_id: { type: 'integer', notNull: true },
		amount: { type: 'numeric(10, 2)', notNull: true },
		currency: { type: 'varchar(10)', notNull: true },
		status: { type: 'varchar(20)', notNull: true },
		payment_method: { type: 'varchar(50)' },
		transaction_no: { type: 'varchar(100)', notNull: true, unique: true },
		external_order_id: { type: 'varchar(100)', unique: true },
		created_at: {
			notNull: true,
			type: 'timestamptz',
			default: pgm.func('current_timestamp')
		},
		updated_at: {
			notNull: true,
			type: 'timestamptz',
			default: pgm.func('current_timestamp')
		}
	});

	// 添加 transactions 表的外键约束
	pgm.addConstraint('transactions', 'transactions_user_id_fkey', {
		foreignKeys: {
			columns: 'user_id',
			references: 'users(id)'
		}
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable('transactions');
	pgm.dropTable('sms_captcha');
	pgm.dropTable('user_roles');
	pgm.dropTable('roles');
	pgm.dropTable('users');
}
