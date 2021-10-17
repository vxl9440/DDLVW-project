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
CREATE DATABASE /*!32312 IF NOT EXISTS*/`iste500` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `iste500`;

/*Table structure for table `advisor` */

DROP TABLE IF EXISTS `advisor`;

CREATE TABLE `advisor` (
  `advisor_id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `middle_name` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `last_name` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `portrait_url` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'http://www.example.com',
  PRIMARY KEY (`advisor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/* Data for the table `advisor` */

insert  into `advisor`(`advisor_id`,`first_name`,`middle_name`,`last_name`,`username`,`portrait_url`) values 
(1,'Melody',NULL,'Jackson','zxc1234','http://www.example.com'),
(2,'Betty',NULL,'John','qwe1234','http://www.example.com'),
(3,'Betty',NULL,'Jackson','jkl1234','http://www.example.com'),
(4,'Melody',NULL,'John','abc1234','http://www.example.com');

/* Table structure for table `reason` */

DROP TABLE IF EXISTS `reason`;

CREATE TABLE `reason` (
  `reason_id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `reason_name` varchar(64) NOT NULL,
  `needsAppt` boolean NOT NULL DEFAULT 0,
  PRIMARY KEY (`reason_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/* Data for the table `reason` */

insert  into `reason`(`reason_id`,`reason_name`,`needsAppt`) values 
(1,'reason a',0),
(2,'reason b',0),
(3,'reason c',1),
(4,'reason d',1);

/* Table structure for table `registration` */

DROP TABLE IF EXISTS `registration`;

CREATE TABLE `registration` (
  `registration_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `advisor_id` int(5) unsigned NOT NULL,
  `check_in_time` timestamp NOT NULL,
  `check_out_time` timestamp NULL DEFAULT NULL,
  `registration_reason_id` varchar(128) DEFAULT NULL,
  `appointment_type` char(1) NOT NULL,
  `student_username` varchar(10) NOT NULL,
  `student_name` varchar(24) NOT NULL,
  PRIMARY KEY (`registration_id`),
  KEY `registration_advisor_fk` (`advisor_id`),
  CONSTRAINT `registration_advisor_fk` FOREIGN KEY (`advisor_id`) REFERENCES `advisor` (`advisor_id`),
  CONSTRAINT `CHK_appointment_type` CHECK (((`appointment_type` = _utf8mb3'0') or (`appointment_type` = _utf8mb3'1')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* Data for the table `registration` */

/* Table structure for table `registration_reason_assoc` */

DROP TABLE IF EXISTS `registration_reason_assoc`;

CREATE TABLE `registration_reason_assoc` (
  `registration_id` int(8) unsigned NOT NULL,
  `reason_id` int(4) unsigned NOT NULL,
  PRIMARY KEY (`registration_id`,`reason_id`),
  KEY `registrationReasonAssoc_reason_fk` (`reason_id`),
  CONSTRAINT `registrationReasonAssoc_reason_fk` FOREIGN KEY (`reason_id`) REFERENCES `reason` (`reason_id`),
  CONSTRAINT `registrationReasonAssoc_registration_fk` FOREIGN KEY (`registration_id`) REFERENCES `registration` (`registration_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* Data for the table `registration_reason_assoc` */

/* Table structure for table `walk_in_hour` */

DROP TABLE IF EXISTS `walk_in_hour`;

CREATE TABLE `walk_in_hour` (
  `advisor_id` int(5) unsigned NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `weekday` char(3) NOT NULL,
  PRIMARY KEY (`advisor_id`,`start_time`,`end_time`,`weekday`),
  CONSTRAINT `walkInHour_advisor_fk` FOREIGN KEY (`advisor_id`) REFERENCES `advisor` (`advisor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* Data for the table `walk_in_hour` */

insert  into `walk_in_hour`(`advisor_id`,`start_time`,`end_time`,`weekday`) values 
(1,'13:00:00','16:00:00','Mon'),
(2,'12:00:00','13:00:00','Sat'),
(2,'22:00:00','23:30:00','Mon');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
