-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: hms
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `app_no` int NOT NULL AUTO_INCREMENT,
  `slot` int NOT NULL,
  `problem` varchar(24) NOT NULL,
  `doctor_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `nurse_id` int DEFAULT NULL,
  `procedure_id` int DEFAULT NULL,
  `room_no` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `paid` varchar(45) DEFAULT 'NA',
  PRIMARY KEY (`app_no`),
  KEY `fk1_idx` (`doctor_id`),
  KEY `fk2_idx` (`patient_id`),
  KEY `fk3_idx` (`nurse_id`),
  KEY `fk4_idx` (`procedure_id`),
  CONSTRAINT `fk1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  CONSTRAINT `fk2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `fk3` FOREIGN KEY (`nurse_id`) REFERENCES `nurse` (`nurse_id`),
  CONSTRAINT `fk4` FOREIGN KEY (`procedure_id`) REFERENCES `procedures` (`procedure_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,1,'COUGH AND COLD',1,1,1,1,1,NULL,'NA'),(2,2,'DIARRHOEA',2,2,2,2,2,NULL,'NA');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dept`
--

DROP TABLE IF EXISTS `dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dept` (
  `dept_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(24) NOT NULL,
  `head` varchar(24) NOT NULL,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dept`
--

LOCK TABLES `dept` WRITE;
/*!40000 ALTER TABLE `dept` DISABLE KEYS */;
INSERT INTO `dept` VALUES (1,'CARDIOLOGY','DR. RAMESH GUPTA'),(2,'ANESTHETICS','DR. SATYAM MEENA'),(3,'GENERAL SURGERY','DR. P. MALAKAR');
/*!40000 ALTER TABLE `dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(24) NOT NULL,
  `dept_id` int DEFAULT NULL,
  `charge` int NOT NULL,
  `status` varchar(24) NOT NULL,
  `exam_room` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`),
  KEY `fk1_idx` (`dept_id`),
  KEY `fk1_idx_1` (`dept_id`),
  CONSTRAINT `doctor_fk1` FOREIGN KEY (`dept_id`) REFERENCES `dept` (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'DR. RAMESH GUPTA',1,1000,'A','D2',NULL,NULL),(2,'DR. SATYAM MEENA',2,1000,'A','D1',NULL,NULL),(3,'DR. P. MALAKAR',3,1000,'A','D3',NULL,NULL),(4,'DR. SAKSHAM WADHWA',2,800,'A','D5',NULL,NULL),(5,'DR. NARESH TIKO',3,1500,'A','D4',NULL,NULL),(6,'DR. PALASH RUISH',1,1000,'A','D7',NULL,NULL);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicines` (
  `code` int NOT NULL AUTO_INCREMENT,
  `name` varchar(24) NOT NULL,
  `brand` varchar(24) NOT NULL,
  `description` varchar(36) NOT NULL,
  `cost` int NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
INSERT INTO `medicines` VALUES (1,'DISPRIN','JJ','CURES HEADACHES ',20),(2,'VICODIN','SANOFI','PAIN KILLER',50),(3,'PRE PRO HS','GSK','PRE BIOTIC PRO BIOTIC',25);
/*!40000 ALTER TABLE `medicines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nurse`
--

DROP TABLE IF EXISTS `nurse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nurse` (
  `nurse_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(24) NOT NULL,
  `position` varchar(24) NOT NULL,
  `status` varchar(24) NOT NULL,
  PRIMARY KEY (`nurse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse`
--

LOCK TABLES `nurse` WRITE;
/*!40000 ALTER TABLE `nurse` DISABLE KEYS */;
INSERT INTO `nurse` VALUES (1,'PRATHNA DEVI','ASSISSTANT','A'),(2,'MENAKA SHARMA','HEAD','A');
/*!40000 ALTER TABLE `nurse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operating_rooms`
--

DROP TABLE IF EXISTS `operating_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operating_rooms` (
  `room_no` int NOT NULL AUTO_INCREMENT,
  `status` varchar(24) NOT NULL,
  `room_type` varchar(45) NOT NULL,
  PRIMARY KEY (`room_no`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operating_rooms`
--

LOCK TABLES `operating_rooms` WRITE;
/*!40000 ALTER TABLE `operating_rooms` DISABLE KEYS */;
INSERT INTO `operating_rooms` VALUES (1,'A','OT1'),(2,'A','OT2'),(3,'A','ICU1'),(4,'A','ICU2'),(5,'A','X RAY ROOM1'),(6,'A','MRI ROOM1');
/*!40000 ALTER TABLE `operating_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(24) NOT NULL,
  `age` int NOT NULL,
  `weight` int NOT NULL,
  `address` varchar(36) NOT NULL,
  `phoneno` int NOT NULL,
  `sex` varchar(45) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'SURAJ KUMAR',21,78,'CIVIL LINES',986754321,'M',NULL,NULL),(2,'MAYAND DAGA',24,67,'NEW DEFENCE COLONY',987654321,'M',NULL,NULL),(3,'PINKI KUMARI',37,88,'WAZIRPUR',123456789,'F',NULL,NULL);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `prescription_no` int NOT NULL,
  `med_code` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `count` int DEFAULT NULL,
  `comments` varchar(100) DEFAULT NULL,
  `date` datetime NOT NULL,
  `paid` varchar(45) DEFAULT 'NA',
  PRIMARY KEY (`prescription_no`),
  KEY `pre_fk1_idx` (`med_code`),
  KEY `pre_fk2_idx` (`doctor_id`),
  KEY `pre_fk3_idx` (`patient_id`),
  CONSTRAINT `pre_fk1` FOREIGN KEY (`med_code`) REFERENCES `medicines` (`code`),
  CONSTRAINT `pre_fk2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  CONSTRAINT `pre_fk3` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` VALUES (1,1,2,3,NULL,NULL,'0000-00-00 00:00:00','NA'),(2,1,2,2,NULL,NULL,'0000-00-00 00:00:00','NA'),(3,2,3,1,NULL,NULL,'0000-00-00 00:00:00','NA'),(4,3,4,2,NULL,NULL,'0000-00-00 00:00:00','NA');
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procedures`
--

DROP TABLE IF EXISTS `procedures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procedures` (
  `procedure_id` int NOT NULL,
  `type` varchar(24) NOT NULL,
  `cost` varchar(24) NOT NULL,
  PRIMARY KEY (`procedure_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procedures`
--

LOCK TABLES `procedures` WRITE;
/*!40000 ALTER TABLE `procedures` DISABLE KEYS */;
INSERT INTO `procedures` VALUES (1,'BLOOD TEST','1000'),(2,'X RAY ','1500'),(3,'MRI ','2000'),(4,'STOOL TEST','500'),(5,'URINE TEST','2000'),(6,'CONSULTATION','100');
/*!40000 ALTER TABLE `procedures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `queries`
--

DROP TABLE IF EXISTS `queries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `queries` (
  `query_id` int NOT NULL AUTO_INCREMENT,
  `poster_type` varchar(45) DEFAULT NULL,
  `poster_id` varchar(45) DEFAULT NULL,
  `parent_query_id` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`query_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `queries`
--

LOCK TABLES `queries` WRITE;
/*!40000 ALTER TABLE `queries` DISABLE KEYS */;
/*!40000 ALTER TABLE `queries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_no` int NOT NULL AUTO_INCREMENT,
  `room_type` varchar(24) NOT NULL,
  `status` varchar(24) NOT NULL,
  `rent` int NOT NULL,
  PRIMARY KEY (`room_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'SINGLE ROOM1 ','A',5000),(2,'DOUBLE ROOM2','A',2500),(3,'SINGLE DELUXE ROOM1','A',8000),(4,'SINGLE ROOM2','A',5000),(5,'DOUBLE ROOM2','A',2500);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stay`
--

DROP TABLE IF EXISTS `stay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stay` (
  `stay_no` int NOT NULL AUTO_INCREMENT,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `room_no` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `paid` varchar(45) DEFAULT 'NA',
  PRIMARY KEY (`stay_no`),
  KEY `stay_fk1_idx` (`room_no`),
  KEY `stay_fk2_idx` (`patient_id`),
  CONSTRAINT `stay_fk1` FOREIGN KEY (`room_no`) REFERENCES `room` (`room_no`),
  CONSTRAINT `stay_fk2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stay`
--

LOCK TABLES `stay` WRITE;
/*!40000 ALTER TABLE `stay` DISABLE KEYS */;
INSERT INTO `stay` VALUES (1,NULL,NULL,1,1,'NA');
/*!40000 ALTER TABLE `stay` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-14 19:49:40
