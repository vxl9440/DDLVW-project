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
  `a_first_name` varchar(24) NOT NULL,
  `a_middle_name` varchar(24) DEFAULT NULL,
  `a_last_name` varchar(24) NOT NULL,
  `username` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `portriat_url` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'http://www.example.com',
  PRIMARY KEY (`advisor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `advisor` */

insert  into `advisor`(`advisor_id`,`a_first_name`,`a_middle_name`,`a_last_name`,`username`,`portriat_url`) values 
(1,'Melody',NULL,'Jackson','zxc1234','http://www.example.com'),
(2,'Betty',NULL,'John','qwe1234','http://www.example.com'),
(3,'Betty',NULL,'Jackson','jkl1234','http://www.example.com'),
(4,'Melody',NULL,'John','abc1234','http://www.example.com');

/*Table structure for table `reason` */

DROP TABLE IF EXISTS `reason`;

CREATE TABLE `reason` (
  `reason_id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `reason_name` varchar(64) NOT NULL,
  `needsAppt` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N',
  PRIMARY KEY (`reason_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `reason` */

insert  into `reason`(`reason_id`,`reason_name`,`needsAppt`) values 
(1,'reason a','N'),
(2,'reason b','N'),
(3,'reason c','N'),
(4,'reason d','N'),
(5,'Reason Name Updated','N');

/*Table structure for table `registration` */

DROP TABLE IF EXISTS `registration`;

CREATE TABLE `registration` (
  `registration_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int(7) unsigned NOT NULL,
  `advisor_id` int(5) unsigned NOT NULL,
  `reason_id` int(3) unsigned NOT NULL,
  `check_in_time` timestamp NOT NULL,
  `check_out_time` timestamp NULL DEFAULT NULL,
  `remove_reason` varchar(128) DEFAULT NULL,
  `appointment_type` char(1) NOT NULL,
  PRIMARY KEY (`registration_id`),
  KEY `registration_reason_fk` (`reason_id`),
  KEY `registration_student_fk` (`student_id`),
  KEY `registration_advisor_fk` (`advisor_id`),
  CONSTRAINT `registration_advisor_fk` FOREIGN KEY (`advisor_id`) REFERENCES `advisor` (`advisor_id`),
  CONSTRAINT `registration_reason_fk` FOREIGN KEY (`reason_id`) REFERENCES `reason` (`reason_id`),
  CONSTRAINT `registration_student_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `CHK_appointment_type` CHECK (((`appointment_type` = _utf8mb3'0') or (`appointment_type` = _utf8mb3'1')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `registration` */

/*Table structure for table `student` */

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `student_id` int(7) unsigned NOT NULL AUTO_INCREMENT,
  `s_first_name` varchar(24) NOT NULL,
  `s_middle_name` varchar(24) DEFAULT NULL,
  `s_last_name` varchar(24) NOT NULL,
  `username` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `major` varchar(42) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `student` */

insert  into `student`(`student_id`,`s_first_name`,`s_middle_name`,`s_last_name`,`username`,`major`) values 
(1,'Bob',NULL,'Messi','vxf8410','Web and Mobile'),
(2,'Kevin',NULL,'John','osb1023','HCC'),
(3,'Bob',NULL,'Alice','toe4812','Computing Information and Technologies'),
(4,'Bob',NULL,'John','bhs1586','Web and Mobile'),
(5,'Jones',NULL,'John','fdj2478','Web and Mobile'),
(6,'Kevin',NULL,'Jackson','itk4127','HCC'),
(7,'Jones',NULL,'Messi','adh8615','HCC'),
(8,'Jones',NULL,'Jackson','thd8225','HCC'),
(9,'Kevin',NULL,'Messi','lco1276','Computing Information and Technologies'),
(10,'Jones',NULL,'Ronaldo','ayo4444','Web and Mobile'),
(11,'Bob',NULL,'Ronaldo','bol8190','Computing Information and Technologies'),
(12,'Kevin',NULL,'Ronaldo','tef3970','HCC'),
(13,'Bob',NULL,'Jackson','ghj8158','Web and Mobile'),
(14,'Jones',NULL,'Alice','inz8268','Computing Information and Technologies'),
(15,'Kevin',NULL,'Alice','keo3161','Web and Mobile'),
(16,'Kevin',NULL,'John','cjd4619','Computing Information and Technologies');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
