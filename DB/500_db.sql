/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 8.0.18 : Database
Created by Vincent Li (vxl9440@rit.edu) and Lowell Pence (lxp3901@rit.edu)
*********************************************************************
*/

CREATE DATABASE IF NOT EXISTS `iSchoolCheckIn`

USE `iSchoolCheckIn`;

/*Table structure for table `advisor` */

DROP TABLE IF EXISTS `advisor`;

/* Anyone who meets with students */
CREATE TABLE `advisor` (
  `advisor_id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `first_name` varchar(24) NOT NULL,
  `middle_name` varchar(24) DEFAULT NULL,
  `last_name` varchar(24) NOT NULL,
  `ritEmail` varchar(30) NOT NULL UNIQUE,
  `portrait_url` varchar(240) DEFAULT NULL,
  `enabled` boolean NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;


/* Table structure for table `reason` */

DROP TABLE IF EXISTS `reason`;

/* Reasons for a student to meet with an advisor */
CREATE TABLE `reason` (
  `reason_id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `reason_name` varchar(64) NOT NULL,
  `needsAppt` boolean NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;


/* Table structure for table `registration` */

DROP TABLE IF EXISTS `registration`;

/* Stores registrations - associates student check in/out times with an advisor, etc */
CREATE TABLE `registration` (
  `registration_id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `advisor_id` INT NOT NULL,
  `check_in_time` DATETIME NOT NULL,
  `check_out_time` DATETIME NULL,
  `meeting_start_time` DATETIME DEFAULT NULL,
  `scheduled` boolean NOT NULL,
  `student_username` varchar(10) NOT NULL,
  `student_name` varchar(24) NOT NULL,
  KEY `registration_advisor_fk` (`advisor_id`),
  CONSTRAINT `registration_advisor_fk` FOREIGN KEY (`advisor_id`) REFERENCES `advisor` (`advisor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/* Table structure for table `registration_reason_assoc` */

DROP TABLE IF EXISTS `registration_reason_assoc`;

/* Stores associations for the registration table and reasons (a registration can have multiple reasons) */
CREATE TABLE `registration_reason_assoc` (
  `registration_id` INT NOT NULL,
  `reason_id` INT NOT NULL,
  PRIMARY KEY (`registration_id`,`reason_id`),
  KEY `registrationReasonAssoc_reason_fk` (`reason_id`),
  CONSTRAINT `registrationReasonAssoc_reason_fk` FOREIGN KEY (`reason_id`) REFERENCES `reason` (`reason_id`),
  CONSTRAINT `registrationReasonAssoc_registration_fk` FOREIGN KEY (`registration_id`) REFERENCES `registration` (`registration_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* Table structure for table `walk_in_hour` */

DROP TABLE IF EXISTS `walk_in_hour`;

/* Stores walk in hours for an advisor, as well as the weekday */
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
