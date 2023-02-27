-- Abiblophilia Anonymous Schema Created Using MySQL Workbench with Sample Data
-- Team Number: 35
-- Names: Maya D'Souza, Nathan Huffman

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cs340_huffmnat
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cs340_huffmnat
-- -----------------------------------------------------
USE `cs340_huffmnat` ;

-- -----------------------------------------------------
-- Table `cs340_huffmnat`.`ItemParameters`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `cs340_huffmnat`.`ItemParameters` (
  `item_parameters_id` INT NOT NULL AUTO_INCREMENT,
  `check_out_length` INT NOT NULL,
  `fine_per_day` INT NOT NULL,
  PRIMARY KEY (`item_parameters_id`),
  UNIQUE INDEX `idBookParameters_UNIQUE` (`item_parameters_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_huffmnat`.`Books`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `cs340_huffmnat`.`Books` (
  `book_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `genre` VARCHAR(50) NOT NULL,
  `author` VARCHAR(100) NOT NULL,
  `year` VARCHAR(45) NOT NULL,
  `ItemParameters_item_parameters_id` INT NOT NULL,
  PRIMARY KEY (`book_id`),
  UNIQUE INDEX `idBooks_UNIQUE` (`book_id` ASC) VISIBLE,
  INDEX `fk_Books_ItemParameters1_idx` (`ItemParameters_item_parameters_id` ASC) VISIBLE,
  CONSTRAINT `fk_Books_ItemParameters1`
    FOREIGN KEY (`ItemParameters_item_parameters_id`)
    REFERENCES `cs340_huffmnat`.`ItemParameters` (`item_parameters_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_huffmnat`.`Movies`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `cs340_huffmnat`.`Movies` (
  `movie_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `genre` VARCHAR(50) NOT NULL,
  `director` VARCHAR(100) NOT NULL,
  `year` VARCHAR(45) NOT NULL,
  `ItemParameters_item_parameters_id` INT NOT NULL,
  PRIMARY KEY (`movie_id`),
  UNIQUE INDEX `idBooks_UNIQUE` (`movie_id` ASC) VISIBLE,
  INDEX `fk_Movies_ItemParameters1_idx` (`ItemParameters_item_parameters_id` ASC) VISIBLE,
  CONSTRAINT `fk_Movies_ItemParameters1`
    FOREIGN KEY (`ItemParameters_item_parameters_id`)
    REFERENCES `cs340_huffmnat`.`ItemParameters` (`item_parameters_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_huffmnat`.`Patrons`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `cs340_huffmnat`.`Patrons` (
  `patron_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `fine` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`patron_id`),
  UNIQUE INDEX `idPatrons_UNIQUE` (`patron_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_huffmnat`.`Library_Items`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `cs340_huffmnat`.`Library_Items` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `Books_book_id` INT NULL,
  `Movies_movie_id` INT NULL,
  `Patrons_patron_id` INT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE INDEX `item_id_UNIQUE` (`item_id` ASC) VISIBLE,
  INDEX `fk_Library_Items_Patrons1_idx` (`Patrons_patron_id` ASC) VISIBLE,
  CONSTRAINT `fk_Library_Items_Books1`
    FOREIGN KEY (`Books_book_id`)
    REFERENCES `cs340_huffmnat`.`Books` (`book_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Library_Items_Movies1`
    FOREIGN KEY (`Movies_movie_id`)
    REFERENCES `cs340_huffmnat`.`Movies` (`movie_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Library_Items_Patrons1`
    FOREIGN KEY (`Patrons_patron_id`)
    REFERENCES `cs340_huffmnat`.`Patrons` (`patron_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_huffmnat`.`Holds`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `cs340_huffmnat`.`Holds` (
  `hold_id` INT NOT NULL AUTO_INCREMENT,
  `hold_date` DATETIME NOT NULL,
  `queue_position` INT NOT NULL,
  `Library_Items_item_id` INT NOT NULL,
  `Patrons_patron_id` INT NOT NULL,
  PRIMARY KEY (`hold_id`),
  UNIQUE INDEX `hold_id_UNIQUE` (`hold_id` ASC) VISIBLE,
  INDEX `fk_Holds_Library_Items1_idx` (`Library_Items_item_id` ASC) VISIBLE,
  INDEX `fk_Holds_Patrons1_idx` (`Patrons_patron_id` ASC) VISIBLE,
  CONSTRAINT `fk_Holds_Library_Items1`
    FOREIGN KEY (`Library_Items_item_id`)
    REFERENCES `cs340_huffmnat`.`Library_Items` (`item_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Holds_Patrons1`
    FOREIGN KEY (`Patrons_patron_id`)
    REFERENCES `cs340_huffmnat`.`Patrons` (`patron_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `ItemParameters` (check_out_length, fine_per_day)
values 
(21, 1000),
(14, 2000);

INSERT INTO `Books` (`title`, `genre`, `author`, `year`, ItemParameters_item_parameters_id)
values 
('1984', 'Fiction', 'George Orwell', 1961, 1),
('Fear and Loathing in Las Vegas', 'Fiction', 'Hunter S. Thompson', 1998, 1),
('Guns, Germs and Steel: The Fate of Human Societies', 'Non Fiction', 'Jared Diamond', 2011, 1),
('Sapiens', 'Non Fiction', 'Yuval Noah Harari', 2017, 1),
('War and Peace', 'Fiction', ' Leo Tolstoy', 1869, 1),
('Harry Potter Philosophers Stone', 'Fiction', 'J. K. Rowling', 1997, 1),
('Our Kind', 'Non Fiction', 'Marvin Harris', 1990, 1),
('A Brief History of Time', 'Non Fiction', 'Stephen Hawking', 1998, 1);

INSERT INTO `Movies` ( `title`, `genre`, `director`, `year`, ItemParameters_item_parameters_id)
VALUES
('The Godfather', 'Drama', 'Francis Ford Coppola', 1972, 2),
('The Shawshank Redemption', 'Drama', 'Frank Darabont', 1994, 2),
('Inception', 'Action', 'Christopher Nolan', 2010, 2),
('Fight Club', 'Drama', 'David Fincher', 1999, 2),
('The Matrix', 'Action', 'Lana Wachowski', 1999, 2),
('Pulp Fiction', 'Drama', 'Quentin Tarantino', 1994, 2),
('Forrest Gump ', 'Drama', 'Robert Zemeckis ', 1994, 2),
('The Good, the Bad and the Ugly', 'Western', 'Sergio Leone', 1966, 2),
('Star Wars: Episode V - The Empire Strikes Back', 'Adventure', 'Irvin Kershner', 1980, 2),
('Saving Private Ryan', 'Steven Spielberg', 'War', 1998, 2),
('Terminator 2: Judgment Day', 'James Cameron', 'Sci-Fi', 1991, 2),
('The Lion King', 'Roger Allers', 'Animation', 1994, 2);

INSERT INTO `Patrons` (`first_name`, `last_name`)
values
('Nathan', 'Huffman'),
('Maya', "D'Souza"),
('John','Steinbeck'),
('Bill', 'Faulkner'),
('Madeleine', 'Albright'),
('Bugs', 'Bunny'),
('Taylor', 'Swift'),
('Charlie', 'Parker');

INSERT INTO Library_Items (Books_book_id, Movies_movie_id, Patrons_patron_id)
values
(3, Null, Null),
(5, Null, 2),
(Null, 2, Null),
(Null, 1, 3);

INSERT INTO Holds (hold_date, queue_position, Library_Items_item_id, Patrons_patron_id)
values
('2023-01-01',1, 3, 4),
('2023-02-02',2, 3, 5),
('2023-01-30', 1, 4, 1);