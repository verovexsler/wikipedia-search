SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `search_history` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `QUERY` VARCHAR(255) NOT NULL,
    `TIMESTAMP` DATETIME NOT NULL,
    PRIMARY KEY (id)
);