-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: library_system
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `author` varchar(200) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'To Kill a Mockingbird','Harper Lee',5),(2,'1984','George Orwell',3),(3,'The Great Gatsby','F. Scott Fitzgerald',4),(4,'Moby Dick','Herman Melville',2),(5,'War and Peace','Leo Tolstoy',6),(6,'Pride and Prejudice','Jane Austen',7),(7,'The Catcher in the Rye','J.D. Salinger',3),(8,'The Hobbit','J.R.R. Tolkien',4),(9,'The Lord of the Rings','J.R.R. Tolkien',2),(10,'Crime and Punishment','Fyodor Dostoevsky',5),(11,'Brave New World','Aldous Huxley',3),(12,'The Odyssey','Homer',6),(13,'Don Quixote','Miguel de Cervantes',2),(14,'The Picture of Dorian Gray','Oscar Wilde',4),(15,'Frankenstein','Mary Shelley',3);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow_history`
--

DROP TABLE IF EXISTS `borrow_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrow_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `borrowed_on` date NOT NULL,
  `returned_on` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `borrow_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `borrow_history_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_history`
--

LOCK TABLES `borrow_history` WRITE;
/*!40000 ALTER TABLE `borrow_history` DISABLE KEYS */;
INSERT INTO `borrow_history` VALUES (1,2,1,'2023-12-01','2023-12-15'),(2,3,2,'2023-12-05','2023-12-20'),(3,2,3,'2023-11-10','2023-11-25');
/*!40000 ALTER TABLE `borrow_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow_requests`
--

DROP TABLE IF EXISTS `borrow_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrow_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('pending','approved','denied') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `borrow_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `borrow_requests_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_requests`
--

LOCK TABLES `borrow_requests` WRITE;
/*!40000 ALTER TABLE `borrow_requests` DISABLE KEYS */;
INSERT INTO `borrow_requests` VALUES (1,2,1,'2024-01-01','2024-01-15','approved'),(2,3,2,'2024-01-05','2024-01-20','denied'),(3,2,3,'2024-01-10','2024-01-25','approved'),(4,3,4,'2024-01-10','2021-12-01','pending'),(5,11,3,'2024-01-01','2024-02-05','pending');
/*!40000 ALTER TABLE `borrow_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `typeRole` enum('librarian','user') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'librarian@example.com','abc123','librarian'),(2,'user1@example.com','abc123','user'),(3,'user2@example.com','abc123','user'),(4,'sandeep@123','sandeep@123','librarian'),(5,'baba@123','Baba123','user'),(6,'shaba@123','Baba123','user'),(9,'jdaklsdkfsa@123','nonoode@123','user'),(11,'srinivas@example.com','12345','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-09 20:20:14
