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
  `advisor_uid` varchar(10) NOT NULL,
  `a_first_name` varchar(24) NOT NULL,
  `a_middle_name` varchar(24) DEFAULT NULL,
  `a_last_name` varchar(24) NOT NULL,
  `username` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`advisor_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `advisor` */

insert  into `advisor`(`advisor_uid`,`a_first_name`,`a_middle_name`,`a_last_name`,`username`) values 
('188888898','Melody',NULL,'Jackson','zxc1234'),
('192465072','Betty',NULL,'John','qwe1234'),
('548115739','Betty',NULL,'Jackson','jkl1234'),
('791484511','Melody',NULL,'John','abc1234');

/*Table structure for table `reason` */

DROP TABLE IF EXISTS `reason`;

CREATE TABLE `reason` (
  `reason_id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `reason_name` varchar(64) NOT NULL,
  PRIMARY KEY (`reason_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `reason` */

insert  into `reason`(`reason_id`,`reason_name`) values 
(1,'reason a'),
(2,'reason b'),
(3,'reason c'),
(4,'reason d'),
(5,'reason e');

/*Table structure for table `registration` */

DROP TABLE IF EXISTS `registration`;

CREATE TABLE `registration` (
  `registration_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `student_uid` varchar(10) NOT NULL,
  `advisor_uid` varchar(10) NOT NULL,
  `reason_id` int(3) unsigned NOT NULL,
  `check_in_time` timestamp NOT NULL,
  `check_out_time` timestamp NULL DEFAULT NULL,
  `remove_reason` varchar(128) DEFAULT NULL,
  `appointment_type` char(1) NOT NULL,
  PRIMARY KEY (`registration_id`),
  KEY `registration_student_fk` (`student_uid`),
  KEY `registration_advisor_fk` (`advisor_uid`),
  KEY `registration_reason_fk` (`reason_id`),
  CONSTRAINT `registration_advisor_fk` FOREIGN KEY (`advisor_uid`) REFERENCES `advisor` (`advisor_uid`),
  CONSTRAINT `registration_reason_fk` FOREIGN KEY (`reason_id`) REFERENCES `reason` (`reason_id`),
  CONSTRAINT `registration_student_fk` FOREIGN KEY (`student_uid`) REFERENCES `student` (`student_uid`),
  CONSTRAINT `CHK_appointment_type` CHECK (((`appointment_type` = _utf8mb3'0') or (`appointment_type` = _utf8mb3'1')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `registration` */

/*Table structure for table `student` */

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `student_uid` varchar(10) NOT NULL,
  `s_first_name` varchar(24) NOT NULL,
  `s_middle_name` varchar(24) DEFAULT NULL,
  `s_last_name` varchar(24) NOT NULL,
  `username` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `major` varchar(42) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`student_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `student` */

insert  into `student`(`student_uid`,`s_first_name`,`s_middle_name`,`s_last_name`,`username`,`major`) values 
('116666022','Bob',NULL,'Messi','vxf8410','Web and Mobile'),
('145960887','Kevin',NULL,'John','osb1023','HCC'),
('154757299','Bob',NULL,'Alice','toe4812','Computing Information and Technologies'),
('314434452','Bob',NULL,'John','bhs1586','Web and Mobile'),
('352722240','Jones',NULL,'John','fdj2478','Web and Mobile'),
('393913528','Kevin',NULL,'Jackson','itk4127','HCC'),
('472928326','Jones',NULL,'Messi','adh8615','HCC'),
('536455235','Jones',NULL,'Jackson','thd8225','HCC'),
('635891307','Kevin',NULL,'Messi','lco1276','Computing Information and Technologies'),
('647320564','Jones',NULL,'Ronaldo','ayo4444','Web and Mobile'),
('678371654','Bob',NULL,'Ronaldo','bol8190','Computing Information and Technologies'),
('683849295','Kevin',NULL,'Ronaldo','tef3970','HCC'),
('770684512','Bob',NULL,'Jackson','ghj8158','Web and Mobile'),
('779825571','Jones',NULL,'Alice','inz8268','Computing Information and Technologies'),
('823025944','Kevin',NULL,'Alice','keo3161','Web and Mobile'),
('928891452','Kevin',NULL,'John','cjd4619','Computing Information and Technologies');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
