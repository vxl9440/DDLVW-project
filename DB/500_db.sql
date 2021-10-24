/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 8.0.18 : Database - iste500
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE IF NOT EXISTS `iste500` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `iste500`;

/*Table structure for table `advisor` */

DROP TABLE IF EXISTS `advisor`;

CREATE TABLE `advisor` (
  `advisor_id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `first_name` varchar(24) NOT NULL,
  `middle_name` varchar(24) DEFAULT NULL,
  `last_name` varchar(24) NOT NULL,
  `ritEmail` varchar(30) NOT NULL UNIQUE,
  `portrait_url` varchar(128) DEFAULT NULL,
  `enabled` boolean NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

/* Data for the table `advisor` */

insert  into `advisor`(`first_name`,`last_name`,`ritEmail`) values 
('Melody','Jackson','zxc1234@rit.edu'),
('Betty','John','qwe1234@rit.edu'),
('Betty','Jackson','jkl1234@rit.edu'),
('Melody','John','abc1234@rit.edu');

/* Table structure for table `reason` */

DROP TABLE IF EXISTS `reason`;

CREATE TABLE `reason` (
  `reason_id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `reason_name` varchar(64) NOT NULL,
  `needsAppt` boolean NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

/* Data for the table `reason` */

insert  into `reason`(`reason_name`,`needsAppt`) values 
('reason a',0),
('reason b',0),
('reason c',1),
('reason d',1);

/* Table structure for table `registration` */

DROP TABLE IF EXISTS `registration`;

CREATE TABLE `registration` (
  `registration_id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `advisor_id` INT NOT NULL,
  `check_in_time` DATETIME NOT NULL,
  `check_out_time` DATETIME NULL,
  `scheduled` boolean NOT NULL,
  `student_username` varchar(10) NOT NULL,
  `student_name` varchar(24) NOT NULL,
  KEY `registration_advisor_fk` (`advisor_id`),
  CONSTRAINT `registration_advisor_fk` FOREIGN KEY (`advisor_id`) REFERENCES `advisor` (`advisor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* Data for the table `registration` */

/* Table structure for table `registration_reason_assoc` */

DROP TABLE IF EXISTS `registration_reason_assoc`;

CREATE TABLE `registration_reason_assoc` (
  `registration_id` INT NOT NULL,
  `reason_id` INT NOT NULL,
  PRIMARY KEY (`registration_id`,`reason_id`),
  KEY `registrationReasonAssoc_reason_fk` (`reason_id`),
  CONSTRAINT `registrationReasonAssoc_reason_fk` FOREIGN KEY (`reason_id`) REFERENCES `reason` (`reason_id`),
  CONSTRAINT `registrationReasonAssoc_registration_fk` FOREIGN KEY (`registration_id`) REFERENCES `registration` (`registration_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* Data for the table `registration_reason_assoc` */

/* Table structure for table `walk_in_hour` */

DROP TABLE IF EXISTS `walk_in_hour`;

CREATE TABLE `walk_in_hour` (
  `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `advisor_id` INT NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `weekday` char(3) NOT NULL,
  CONSTRAINT `walkInHour_advisor_fk` 
    FOREIGN KEY (`advisor_id`) 
    REFERENCES `advisor` (`advisor_id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
