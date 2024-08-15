-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ukids
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `album_id` bigint NOT NULL AUTO_INCREMENT,
  `family_id` bigint DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `is_delete` tinyint(1) NOT NULL,
  PRIMARY KEY (`album_id`),
  KEY `FKmqmha9a77yh08yffjy5tm7o2i` (`family_id`),
  CONSTRAINT `FKmqmha9a77yh08yffjy5tm7o2i` FOREIGN KEY (`family_id`) REFERENCES `family` (`family_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,1,'가족사진 찍은 날','2024-08-01',0),(2,1,'나들이 가는날','2024-08-10',0);
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caption`
--

DROP TABLE IF EXISTS `caption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caption` (
  `caption_id` bigint NOT NULL AUTO_INCREMENT,
  `photo_id` bigint DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `is_delete_caption` tinyint(1) NOT NULL,
  PRIMARY KEY (`caption_id`),
  KEY `FKm869ykvjyfxdtt91k169t215w` (`photo_id`),
  CONSTRAINT `FKm869ykvjyfxdtt91k169t215w` FOREIGN KEY (`photo_id`) REFERENCES `photo` (`photo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caption`
--

LOCK TABLES `caption` WRITE;
/*!40000 ALTER TABLE `caption` DISABLE KEYS */;
INSERT INTO `caption` VALUES (1,1,'김가네 사진','2024-08-16 00:52:54.687771','2024-08-16 00:52:54.687771',0),(2,2,'공원에 놀러감~','2024-08-16 01:09:33.823651','2024-08-16 01:09:33.823651',0),(3,3,'좋은 경치!','2024-08-16 01:10:17.199452','2024-08-16 01:10:17.199452',0);
/*!40000 ALTER TABLE `caption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family`
--

DROP TABLE IF EXISTS `family`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family` (
  `family_id` bigint NOT NULL AUTO_INCREMENT,
  `representative` bigint DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `code` varchar(10) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`family_id`),
  UNIQUE KEY `UKbn4rdydl6psta9iab5qnxhi7g` (`code`),
  KEY `FKgn4jxvg4snd8iqxaycrlluexk` (`representative`),
  CONSTRAINT `FKgn4jxvg4snd8iqxaycrlluexk` FOREIGN KEY (`representative`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family`
--

LOCK TABLES `family` WRITE;
/*!40000 ALTER TABLE `family` DISABLE KEYS */;
INSERT INTO `family` VALUES (1,1,'김가네','$2a$10$NWYdraVDwzRFfpkj0xvc6Oujbtw82YxFNFMMNs6M8wD9A0xSOHxbm','6bef6c22','2024-08-16 00:48:46.455127','2024-08-16 00:48:46.455127',0);
/*!40000 ALTER TABLE `family` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family_member`
--

DROP TABLE IF EXISTS `family_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family_member` (
  `family_member_id` bigint NOT NULL AUTO_INCREMENT,
  `family_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `is_approval` tinyint(1) DEFAULT '0',
  `approval_date` datetime(6) DEFAULT NULL,
  `role` enum('ROLE_DAUGHTER','ROLE_FATHER','ROLE_GRANDFATHER','ROLE_GRANDMOTHER','ROLE_MOTHER','ROLE_NONE','ROLE_SON') DEFAULT NULL,
  `leave_date` datetime(6) DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`family_member_id`),
  KEY `FKfnsmde0dvo7f59pl1tiko3aty` (`family_id`),
  KEY `FKpfs5mceej35oh4n89cn4v1tmn` (`user_id`),
  CONSTRAINT `FKfnsmde0dvo7f59pl1tiko3aty` FOREIGN KEY (`family_id`) REFERENCES `family` (`family_id`),
  CONSTRAINT `FKpfs5mceej35oh4n89cn4v1tmn` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family_member`
--

LOCK TABLES `family_member` WRITE;
/*!40000 ALTER TABLE `family_member` DISABLE KEYS */;
INSERT INTO `family_member` VALUES (1,1,1,1,'2024-08-16 00:48:46.460673','ROLE_FATHER',NULL,0),(2,1,2,1,'2024-08-16 02:10:48.815565','ROLE_SON',NULL,0);
/*!40000 ALTER TABLE `family_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `growth_folder`
--

DROP TABLE IF EXISTS `growth_folder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `growth_folder` (
  `folder_id` bigint NOT NULL AUTO_INCREMENT,
  `family_id` bigint DEFAULT NULL,
  `folder_name` varchar(255) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`folder_id`),
  KEY `FK2xuyujk1bag7ph0uwia96utdb` (`family_id`),
  CONSTRAINT `FK2xuyujk1bag7ph0uwia96utdb` FOREIGN KEY (`family_id`) REFERENCES `family` (`family_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `growth_folder`
--

LOCK TABLES `growth_folder` WRITE;
/*!40000 ALTER TABLE `growth_folder` DISABLE KEYS */;
INSERT INTO `growth_folder` VALUES (1,1,'김싸악','2024-08-16 00:56:45.407977','2024-08-16 00:56:45.407977',0);
/*!40000 ALTER TABLE `growth_folder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `growth_record`
--

DROP TABLE IF EXISTS `growth_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `growth_record` (
  `record_id` bigint NOT NULL AUTO_INCREMENT,
  `forder_id` bigint DEFAULT NULL,
  `content` varchar(3000) NOT NULL,
  `title` varchar(255) NOT NULL,
  `writer_id` bigint DEFAULT NULL,
  `date` date DEFAULT NULL,
  `image_s3_name` varchar(2048) DEFAULT NULL,
  `image_url` varchar(2048) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`record_id`),
  KEY `FKnk6v13nx07ur9yd6oxpu0w50` (`forder_id`),
  KEY `FKl5f5v6d9k717y0utxsih796ms` (`writer_id`),
  CONSTRAINT `FKl5f5v6d9k717y0utxsih796ms` FOREIGN KEY (`writer_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKnk6v13nx07ur9yd6oxpu0w50` FOREIGN KEY (`forder_id`) REFERENCES `growth_folder` (`folder_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `growth_record`
--

LOCK TABLES `growth_record` WRITE;
/*!40000 ALTER TABLE `growth_record` DISABLE KEYS */;
INSERT INTO `growth_record` VALUES (1,1,'오늘은 싸악이가 수학 올림피아드 대회에서 대상을 탔다. 내 아들이지만 정말 똑똑하고 기대가 되는 아이다. 앞으로도 이렇게 건강하고 씩씩하게 커줬으면 좋겠네.','싸악이 올림피아드 수상!',1,'2024-08-08','growthRecord/b037d600-4b39-4cb2-aa71-6e0bcb939490_123974_65073_26.jpg','https://ukids-photo.s3.ap-southeast-2.amazonaws.com/growthRecord/b037d600-4b39-4cb2-aa71-6e0bcb939490_123974_65073_26.jpg','b037d600-4b39-4cb2-aa71-6e0bcb939490_123974_65073_26.jpg','2024-08-16 00:59:21.224155','2024-08-16 00:59:21.224155',0),(2,1,'둘째가 다독상을 받았다. 애기때부터 동화책 읽어주는걸 그렇게 좋아하더니 책과는 인연이 있는 모양이다. 앞으로도 책 많이 읽고 똑똑한 사람으로 자라렴','둘째의 다독상',1,'2024-08-10','growthRecord/e76f71a3-8a2b-4944-887f-4f979736294c_dddd.jfif','https://ukids-photo.s3.ap-southeast-2.amazonaws.com/growthRecord/e76f71a3-8a2b-4944-887f-4f979736294c_dddd.jfif','e76f71a3-8a2b-4944-887f-4f979736294c_dddd.jfif','2024-08-16 01:01:03.514619','2024-08-16 01:01:03.514619',0);
/*!40000 ALTER TABLE `growth_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letter`
--

DROP TABLE IF EXISTS `letter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letter` (
  `letter_id` bigint NOT NULL AUTO_INCREMENT,
  `tree_id` bigint NOT NULL,
  `to_id` bigint NOT NULL,
  `from_id` bigint NOT NULL,
  `content` varchar(3000) NOT NULL,
  `is_open` tinyint(1) NOT NULL DEFAULT '0',
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `create_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`letter_id`),
  KEY `FKixb0tjisugln0lfv4auy1nw1p` (`from_id`),
  KEY `FK5dbln9psq1yfn5y3tgbjseirl` (`to_id`),
  KEY `FKeixprmom8imu70rk9uyo83j2a` (`tree_id`),
  CONSTRAINT `FK5dbln9psq1yfn5y3tgbjseirl` FOREIGN KEY (`to_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKeixprmom8imu70rk9uyo83j2a` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`tree_id`),
  CONSTRAINT `FKixb0tjisugln0lfv4auy1nw1p` FOREIGN KEY (`from_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letter`
--

LOCK TABLES `letter` WRITE;
/*!40000 ALTER TABLE `letter` DISABLE KEYS */;
INSERT INTO `letter` VALUES (1,1,1,2,'아빠 안녕하세요 저 싸악이에요 전에는 아빠한테 제가 너무했던거 같아요 그래도 아빠랑 친해져서 놀다보니 너무 재밌어서 좋았어요 다음에 또 놀러가요!',0,0,'2024-08-16 02:13:30.914055','2024-08-16 02:13:30.914055',0),(2,1,2,1,'싸악아 아빠야\n아빠가 싸악이한테 그동안 너무 무심했다가 갑자기 다가가니까 이상했지? 그동안 정말 미안했고 이제라도 좋은 추억 같이 쌓았으면 좋겠다.\n사랑하는 아빠가',0,0,'2024-08-16 02:14:23.086180','2024-08-16 02:14:23.086180',0);
/*!40000 ALTER TABLE `letter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `photo_id` bigint NOT NULL AUTO_INCREMENT,
  `album_id` bigint DEFAULT NULL,
  `photo_s3_name` varchar(2048) NOT NULL,
  `photo_url` varchar(2048) NOT NULL,
  `photo_original_name` varchar(255) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `is_delete` tinyint(1) NOT NULL,
  PRIMARY KEY (`photo_id`),
  KEY `FKpy64km2p72eoy5rwh31ria0vx` (`album_id`),
  CONSTRAINT `FKpy64km2p72eoy5rwh31ria0vx` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (1,1,'photo/6687a688-6b24-4542-9971-e04e65eff01e_가족사진.jfif','https://ukids-photo.s3.ap-southeast-2.amazonaws.com/photo/6687a688-6b24-4542-9971-e04e65eff01e_%EA%B0%80%EC%A1%B1%EC%82%AC%EC%A7%84.jfif','6687a688-6b24-4542-9971-e04e65eff01e_가족사진.jfif','2024-08-16 00:52:54.684329','2024-08-16 00:52:54.684329',0),(2,2,'photo/63746f16-1d40-4afd-801b-caf93b2a35e8_나들이.jfif','https://ukids-photo.s3.ap-southeast-2.amazonaws.com/photo/63746f16-1d40-4afd-801b-caf93b2a35e8_%EB%82%98%EB%93%A4%EC%9D%B4.jfif','63746f16-1d40-4afd-801b-caf93b2a35e8_나들이.jfif','2024-08-16 01:09:33.822681','2024-08-16 01:09:33.822681',0),(3,2,'photo/0593b8af-65d8-49cf-8e96-6a2943c80b22_dd.jfif','https://ukids-photo.s3.ap-southeast-2.amazonaws.com/photo/0593b8af-65d8-49cf-8e96-6a2943c80b22_dd.jfif','0593b8af-65d8-49cf-8e96-6a2943c80b22_dd.jfif','2024-08-16 01:10:17.197458','2024-08-16 01:10:17.197458',0);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture_diary`
--

DROP TABLE IF EXISTS `picture_diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `picture_diary` (
  `picture_diary_id` bigint NOT NULL AUTO_INCREMENT,
  `family_id` bigint DEFAULT NULL,
  `content` varchar(3000) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `image_s3_name` varchar(2048) DEFAULT NULL,
  `image_name` varchar(255) NOT NULL,
  `picture_url` varchar(255) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`picture_diary_id`),
  KEY `FKanexi2qbnb5hbucue079hvm78` (`family_id`),
  CONSTRAINT `FKanexi2qbnb5hbucue079hvm78` FOREIGN KEY (`family_id`) REFERENCES `family` (`family_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture_diary`
--

LOCK TABLES `picture_diary` WRITE;
/*!40000 ALTER TABLE `picture_diary` DISABLE KEYS */;
INSERT INTO `picture_diary` VALUES (1,1,'오늘은 아빠랑 빵집에 가서 맛있는 빵을 먹었다. 정말 맛있었다!! 다음에도 또 아빠랑 가고싶어','2024-08-15','pictureDiary/b68df026-15ea-43d2-b5b0-e8cceade712e_그림1.jpg','b68df026-15ea-43d2-b5b0-e8cceade712e_그림1.jpg','https://ukids-photo.s3.ap-southeast-2.amazonaws.com/pictureDiary/b68df026-15ea-43d2-b5b0-e8cceade712e_%EA%B7%B8%EB%A6%BC1.jpg','2024-08-16 00:54:18.227059','2024-08-16 00:54:18.227059',0),(2,1,'와! 오늘은 엄마랑 아빠랑 밖에 놀러나갔다 날씨도 정말 좋았고 꽃 구경도 했는데 정말 재밌었어!! 같이 또 가고 싶어 아빠랑 노는게 이렇게 재미있을지 몰랐어','2024-08-14','pictureDiary/3ab8a182-0173-4f5e-8141-96b7b9a93019_그림2.jpg','3ab8a182-0173-4f5e-8141-96b7b9a93019_그림2.jpg','https://ukids-photo.s3.ap-southeast-2.amazonaws.com/pictureDiary/3ab8a182-0173-4f5e-8141-96b7b9a93019_%EA%B7%B8%EB%A6%BC2.jpg','2024-08-16 00:55:52.987149','2024-08-16 00:55:52.987149',0),(3,1,'ㅂ23','2024-08-12','pictureDiary/5e795eef-e206-4e64-854c-60775d52e6af_무지.png','5e795eef-e206-4e64-854c-60775d52e6af_무지.png','https://ukids-photo.s3.ap-southeast-2.amazonaws.com/pictureDiary/5e795eef-e206-4e64-854c-60775d52e6af_%EB%AC%B4%EC%A7%80.png','2024-08-16 01:25:05.033250','2024-08-16 01:25:05.033250',0);
/*!40000 ALTER TABLE `picture_diary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_question`
--

DROP TABLE IF EXISTS `quiz_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_question` (
  `quiz_question_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `quiz_type` enum('MULTIPLE_CHOICE','OX') NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `is_delete` tinyint(1) NOT NULL,
  PRIMARY KEY (`quiz_question_id`),
  KEY `FKkgeunko55q8btr1woabontofe` (`user_id`),
  CONSTRAINT `FKkgeunko55q8btr1woabontofe` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_question`
--

LOCK TABLES `quiz_question` WRITE;
/*!40000 ALTER TABLE `quiz_question` DISABLE KEYS */;
INSERT INTO `quiz_question` VALUES (1,1,'김싸피의 생일은?','1989-05-11','MULTIPLE_CHOICE','2024-08-16 01:13:20.733538','2024-08-16 01:13:20.733538',0),(2,1,'김싸피가 제일 좋아하는 음식은?','라면','MULTIPLE_CHOICE','2024-08-16 02:15:12.660045','2024-08-16 02:15:12.660045',0),(3,2,'싸악이가 제일 좋아하는 캐릭터는?','파워레인저','MULTIPLE_CHOICE','2024-08-16 02:15:38.641170','2024-08-16 02:15:38.641170',0);
/*!40000 ALTER TABLE `quiz_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_result`
--

DROP TABLE IF EXISTS `quiz_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_result` (
  `quiz_result_id` bigint NOT NULL AUTO_INCREMENT,
  `family_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `total_counts` bigint DEFAULT NULL,
  `correct_counts` bigint DEFAULT NULL,
  `date` date NOT NULL,
  `ranking` bigint NOT NULL,
  PRIMARY KEY (`quiz_result_id`),
  KEY `FKj1hrc69n3w2908sifsalkxvmq` (`family_id`),
  KEY `FK724trb6ambqx6fd1sqpp9rfxg` (`user_id`),
  CONSTRAINT `FK724trb6ambqx6fd1sqpp9rfxg` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKj1hrc69n3w2908sifsalkxvmq` FOREIGN KEY (`family_id`) REFERENCES `family` (`family_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_result`
--

LOCK TABLES `quiz_result` WRITE;
/*!40000 ALTER TABLE `quiz_result` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `schedule_id` bigint NOT NULL AUTO_INCREMENT,
  `family_id` bigint DEFAULT NULL,
  `title` varchar(300) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `place` varchar(300) DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `is_delete` tinyint(1) NOT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `FK5j9edswancgcay2ylusc84ehb` (`family_id`),
  CONSTRAINT `FK5j9edswancgcay2ylusc84ehb` FOREIGN KEY (`family_id`) REFERENCES `family` (`family_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,1,'김가네 놀러가는 날','자전거타기','세종 호수 공원','2024-08-17 09:00:00','2024-08-17 18:00:00','2024-08-16 02:16:49.996101','2024-08-16 02:16:49.996101',0);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree`
--

DROP TABLE IF EXISTS `tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tree` (
  `tree_id` bigint NOT NULL AUTO_INCREMENT,
  `family_id` bigint DEFAULT NULL,
  `exp` bigint NOT NULL,
  `is_complete` tinyint(1) NOT NULL DEFAULT '0',
  `create_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`tree_id`),
  KEY `FK5k8ufkoln4a9vepaxx23phmgx` (`family_id`),
  CONSTRAINT `FK5k8ufkoln4a9vepaxx23phmgx` FOREIGN KEY (`family_id`) REFERENCES `family` (`family_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree`
--

LOCK TABLES `tree` WRITE;
/*!40000 ALTER TABLE `tree` DISABLE KEYS */;
INSERT INTO `tree` VALUES (1,1,275,0,'2024-08-16 00:48:46.482927','2024-08-16 02:14:23.115960');
/*!40000 ALTER TABLE `tree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree_type`
--

DROP TABLE IF EXISTS `tree_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tree_type` (
  `tree_type_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`tree_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree_type`
--

LOCK TABLES `tree_type` WRITE;
/*!40000 ALTER TABLE `tree_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `tree_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `id` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `birth_date` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `role` enum('ROLE_ADMIN','ROLE_USER') DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK8qtpnv06elxuryeuv1ac4ximm` (`id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK589idila9li6a4arw1t8ht1gx` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'user1','$2a$10$4jhG0A/JwYOcO/tMkRexyOvc/dn3ubAjYGoDv.Uowi/EV6y8KoJOG','김싸피','ssafy@naver.com','010-0000-0000','1989-05-11',NULL,NULL,'2024-08-16 00:46:38.983171','2024-08-16 00:46:38.983171','ROLE_USER',0),(2,'user2','$2a$10$vs341ome1TtrUE7WumUiBesGdiGgBtvHxQGBqDw6FUo9CwNfkcLEe','김싸악','ssafy2@naver.com','010-0000-0001','2016-07-07',NULL,NULL,'2024-08-16 00:48:26.630121','2024-08-16 00:48:26.630121','ROLE_USER',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webrtc`
--

DROP TABLE IF EXISTS `webrtc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webrtc` (
  `webrtc_id` bigint NOT NULL AUTO_INCREMENT,
  `family_id` bigint DEFAULT NULL,
  `session_id` varchar(255) NOT NULL,
  PRIMARY KEY (`webrtc_id`),
  UNIQUE KEY `UK176uv5o3r8a1a5vp7bhf646xe` (`family_id`),
  CONSTRAINT `FKee8jfhja7e5799fnda28lvaqy` FOREIGN KEY (`family_id`) REFERENCES `family` (`family_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webrtc`
--

LOCK TABLES `webrtc` WRITE;
/*!40000 ALTER TABLE `webrtc` DISABLE KEYS */;
/*!40000 ALTER TABLE `webrtc` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  2:18:44
