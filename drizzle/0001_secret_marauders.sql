PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`customer_email` text NOT NULL,
	`customer_name` text,
	`customer_phone` text,
	`total` real NOT NULL,
	`status` text NOT NULL,
	`payment_proof` text,
	`payment_method` text,
	`paypal_order_id` text,
	`additional_info` text,
	`diagnostic_data` text,
	`created_at` integer DEFAULT '"2026-01-29T22:49:57.763Z"',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_orders`("id", "user_id", "customer_email", "customer_name", "customer_phone", "total", "status", "payment_proof", "payment_method", "paypal_order_id", "additional_info", "diagnostic_data", "created_at") SELECT "id", "user_id", "customer_email", "customer_name", "customer_phone", "total", "status", "payment_proof", "payment_method", "paypal_order_id", "additional_info", "diagnostic_data", "created_at" FROM `orders`;--> statement-breakpoint
DROP TABLE `orders`;--> statement-breakpoint
ALTER TABLE `__new_orders` RENAME TO `orders`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`name` text,
	`address` text,
	`city` text,
	`department` text,
	`whatsapp_number` text,
	`role` text DEFAULT 'user',
	`reset_token` text,
	`reset_token_expires` integer,
	`created_at` integer DEFAULT '"2026-01-29T22:49:57.761Z"'
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "password", "name", "address", "city", "department", "whatsapp_number", "role", "reset_token", "reset_token_expires", "created_at") SELECT "id", "email", "password", "name", "address", "city", "department", "whatsapp_number", "role", "reset_token", "reset_token_expires", "created_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);