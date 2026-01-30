CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` integer NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`customer_email` text NOT NULL,
	`customer_name` text,
	`total` real NOT NULL,
	`status` text NOT NULL,
	`payment_proof` text,
	`payment_method` text,
	`paypal_order_id` text,
	`additional_info` text,
	`created_at` integer DEFAULT '"2026-01-29T22:45:16.087Z"',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
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
	`created_at` integer DEFAULT '"2026-01-29T22:45:16.085Z"'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);