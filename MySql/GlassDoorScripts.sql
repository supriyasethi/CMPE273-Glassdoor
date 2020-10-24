CREATE SCHEMA `glassdoor-prototype` ;
use `glassdoor-prototype`;
CREATE TABLE `SIGNUP` (
  `UserID` bigint NOT NULL AUTO_INCREMENT,
  `UserName` varchar(60)  unique NOT NULL ,
  `Password` varchar(150) NOT NULL,
  `Role` enum('student','company','admin') NOT NULL,
  PRIMARY KEY (`UserID`)
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `PHOTOS` (
   `ID` bigint NOT NULL AUTO_INCREMENT,
  `CompanyID` bigint NOT NULL,
  `StudentID` bigint NOT NULL,
  `PhotoURL` varchar(150) NOT NULL,
  `DateUploaded` Date NOT NULL,
  `ApprovalStatus` enum('NotApproved','Approved','Disapproved') DEFAULT 'NotApproved',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `GENERAL_REVIEW` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `CompanyID` bigint NOT NULL,
  `StudentID` bigint NOT NULL,
  `CompanyName` varchar(60) NOT NULL,
  `Pros` varchar(150) NOT NULL,
  `Cons` varchar(150) NOT NULL,
  `Descriptions` varchar(300) NOT NULL,
  `Rating` int NOT NULL,
  `EmployeeStatus` enum('Current','Former') DEFAULT NULL,
  `Status` enum('NotApproved','Approved','Disapproved') DEFAULT 'NotApproved',
  `Helpful` bigint DEFAULT NULL,
  `CEOApproval` tinyint DEFAULT NULL,
  `JobType` enum('FullTime','PartTime','Contract','Intern','Freelance') NOT NULL,
  `Recommended` tinyint DEFAULT NULL,
  `JobTitle` varchar(45) DEFAULT NULL,
  `Headline` varchar(80) NOT NULL,
  `DatePosted` date NOT NULL,
  `Response` varchar(300) DEFAULT NULL,
  `Favorite` tinyint DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `APPLICATION_JOB` (
  `JobID` bigint NOT NULL,
  `CompanyName` varchar(60) NOT NULL,
  `CompanyID` bigint NOT NULL,
  `PostedDate` date NOT NULL,
  `StreetAddress` varchar(45) NOT NULL,
  `City` varchar(45) NOT NULL,
  `State` varchar(45) NOT NULL,
  PRIMARY KEY (`JobID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `APPLICATION_RECEIVED` (
  `JobID` bigint NOT NULL,
  `StudentID` bigint NOT NULL,
  `StudentName` varchar(45) NOT NULL,
  `ResumeURL` varchar(150) DEFAULT NULL,
  `CoverLetterURL` varchar(150) DEFAULT NULL,
  `Status` enum('Submitted','Reviewed','Initial Screening','Interviewing','Hired','Rejected') DEFAULT 'Submitted',
  `Withdrawn` tinyint DEFAULT NULL,
  PRIMARY KEY (`JobID`,`StudentID`),
  FOREIGN KEY (`JobID`) REFERENCES `APPLICATION_JOB`(`JobID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;