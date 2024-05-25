-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2023 at 05:30 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory-system`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_code` char(3) NOT NULL,
  `num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `category_code`, `num`) VALUES
(1, 'Mouse', 'MOU', 0),
(2, 'Keyboard', 'KEY', 0),
(3, 'Monitor', 'MON', 0),
(4, 'Tool', 'TOL', 0);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `brand` varchar(255) NOT NULL,
  `date_acquired` date NOT NULL,
  `supplier` varchar(255) NOT NULL,
  `serial_no` char(18) NOT NULL,
  `asset_code` char(10) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` enum('New','Active','Defective','Dispose','Donate') NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `categoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `name`, `description`, `brand`, `date_acquired`, `supplier`, `serial_no`, `asset_code`, `location`, `status`, `recipient`, `categoryID`) VALUES
(1, 'test update with log4', 'I changed the description!', 'Logitech Shroud', '2023-07-05', 'PlayTech', '1234', 'MSE-001', 'LB114', 'Dispose', '', 1),
(13, 'test change desc with log!', 'test', 'Logitech Shroud', '2023-07-22', 'PlayTech', '123TEST', 'KEY-23-013', 'LB457', 'New', '', 2),
(14, 'mouse', 'test', 'logitech', '2023-07-05', 'PlayTech', '7777', 'MOU-23-014', 'LB117', 'Donate', 'somewhere', 1),
(15, 'test with logs', 'test!', 'CDRking', '2023-07-21', 'PlayTech', '9909', 'MON-23-015', 'LB457', 'New', '', 3),
(16, 'test with log2', 'test!', 'CDRking', '2023-07-11', 'PlayTech', '99099', 'MON-23-016', 'LB457', 'New', '', 3);

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `id` bigint(20) NOT NULL,
  `activity` text NOT NULL,
  `date_done` date NOT NULL,
  `userID` bigint(11) NOT NULL,
  `itemID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`id`, `activity`, `date_done`, `userID`, `itemID`) VALUES
(1, 'An item has been added to the inventory', '2023-07-17', 1, 16),
(2, 'An item has been updated', '2023-07-17', 1, 1),
(3, 'An item has been updated.', '2023-07-18', 1, 13),
(4, 'An item has been updated.', '2023-07-18', 1, 16),
(5, 'An item has been tagged for donation.', '2023-07-18', 1, 14),
(6, 'An item has been tagged for donation.', '2023-07-18', 1, 14);

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `type` enum('RIS','WRF') NOT NULL,
  `quantity` int(11) NOT NULL,
  `date_requested` date NOT NULL,
  `date_needed` date DEFAULT NULL,
  `status1` enum('Pending','Approved','Denied') NOT NULL,
  `status2` enum('Pending','Approved','Denied') NOT NULL,
  `unit` int(11) DEFAULT NULL,
  `unit_cost` int(11) DEFAULT NULL,
  `total_amount` int(11) DEFAULT NULL,
  `payee` varchar(255) DEFAULT NULL,
  `payment_instruction` text DEFAULT NULL,
  `labor_cost` int(11) DEFAULT NULL,
  `categoryID` int(11) NOT NULL,
  `userID` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id`, `name`, `description`, `type`, `quantity`, `date_requested`, `date_needed`, `status1`, `status2`, `unit`, `unit_cost`, `total_amount`, `payee`, `payment_instruction`, `labor_cost`, `categoryID`, `userID`) VALUES
(1, 'test', 'test2', 'WRF', 2, '2023-07-17', '2023-08-30', 'Approved', 'Approved', 0, 0, 0, '', '', 65, 2, 1),
(2, 'test3', '', 'RIS', 3, '2023-07-17', '2023-07-20', 'Approved', 'Denied', 2, 5000, 0, 'test', '', 0, 3, 1),
(3, 'test4', '', 'WRF', 2, '2023-07-17', '2023-07-29', 'Approved', 'Approved', 0, 0, 0, '', '', 150, 4, 1),
(4, 'test5', '', 'WRF', 2, '2023-07-17', '2023-07-13', 'Approved', 'Approved', 0, 0, 0, '', '', 1200, 3, 1),
(5, 'test6', '', 'WRF', 5, '2023-07-17', '2023-07-27', 'Approved', 'Denied', 0, 0, 0, '', '', 500, 1, 1),
(6, 'test7', '', 'WRF', 2, '2023-07-17', '2023-07-06', 'Pending', 'Pending', 0, 0, 0, '', '', 120, 1, 1),
(7, 'test8', '', 'RIS', 5, '2023-07-17', '2023-07-01', 'Pending', 'Pending', 1, 700, 0, 'test', '', 0, 1, 1),
(8, 'test9', '', 'WRF', 2, '2023-07-18', '2023-07-21', 'Pending', 'Pending', 0, 0, 0, '', '', 200, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `contact_no` char(11) NOT NULL,
  `date_created` date NOT NULL,
  `authority` enum('Tech','Head','Admin') NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fname`, `lname`, `contact_no`, `date_created`, `authority`, `email`, `password`, `status`) VALUES
(1, 'admin', 'admin', '123', '2023-07-01', 'Admin', 'admin@gmail.com', 'admin', 'Active'),
(2, 'first', 'last', '122334', '2023-07-18', 'Tech', 'tech@gmail.com', 'tech', 'Active'),
(3, 'lab', 'head', '1234567890', '2023-07-18', 'Head', 'head@gmail.com', 'head', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_category_id` (`categoryID`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_userID` (`userID`),
  ADD KEY `FK_item_id` (`itemID`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_categoryID` (`categoryID`),
  ADD KEY `FK_user_id` (`userID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `FK_category_id` FOREIGN KEY (`categoryID`) REFERENCES `category` (`id`);

--
-- Constraints for table `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `FK_item_id` FOREIGN KEY (`itemID`) REFERENCES `item` (`id`),
  ADD CONSTRAINT `FK_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`id`);

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `FK_categoryID` FOREIGN KEY (`categoryID`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FK_user_id` FOREIGN KEY (`userID`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
