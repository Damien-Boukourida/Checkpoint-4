-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 26 Octobre 2017 à 13:53
-- Version du serveur :  5.7.19-0ubuntu0.16.04.1
-- Version de PHP :  7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `simple-mvc`
--

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `firstname` VARCHAR(25) NOT NULL,
  `lastname` VARCHAR(25) NOT NULL,
  `hashedPassword` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Structure de la table `plateform`
--

CREATE TABLE `plateform` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Structure de la table `photo`
--

CREATE TABLE `photo` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Structure de la table `games`
--

CREATE TABLE `games` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `plateformId` INT UNSIGNED NOT NULL,
  `photoId` INT UNSIGNED NOT NULL,
  `userId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `plateformId`, `photoId`, `userId`),
  KEY `fk_games_plateform1_idx` (`plateformId`),
  KEY `fk_games_photo1_idx` (`photoId`),
  KEY `fk_games_user1_idx` (`userId`),
  CONSTRAINT `fk_games_plateform1_idx` FOREIGN KEY (`plateformId`) REFERENCES `plateform` (`id`),
  CONSTRAINT `fk_games_photo1_idx` FOREIGN KEY (`photoId`) REFERENCES `photo` (`id`),
  CONSTRAINT `fk_games_user1_idx` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- `insertion des plateformes`
--

INSERT INTO plateform (nom)
 VALUES 
 ('PC'),
 ('Playstation 5'),
 ('Playstation 4'),
 ('Playstation 3'),
 ('Playstation 2'),
 ('Playstation'),
 ('Xbox'),
 ('Xbox 360'),
 ('Xbox one/s/x'),
 ('Xbox Series S/X'),
 ('Nintendo Wii'),
 ('Nintendo Wii U'),
 ('Nintendo Switch'),
 ('Nintendi Gamecube'),
 ('Mobile');
  

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
