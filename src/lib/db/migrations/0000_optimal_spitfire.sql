CREATE TABLE `post` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` text,
	`likes` int,
	`userId` int);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`full_name` text,
	`phone` varchar(256));
