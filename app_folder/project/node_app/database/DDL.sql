-- Abiblophilia Anonymous Data Definition Queries for CS340 Portfolio Project
-- Team Number: 35
-- Names: Maya D'Souza, Nathan Huffman

-- MySQL Workbench Forward Engineering

-- overide default rules of database
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- -----------------------------------------------------
-- Entity 1: Item_Types
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Item_Types (
  item_type_id INT NOT NULL UNIQUE AUTO_INCREMENT,
  type VARCHAR(20) NOT NULL,
  check_out_length INT NOT NULL,
  fine_per_day INT NOT NULL,
  PRIMARY KEY (item_type_id)
);

-- -----------------------------------------------------
-- Entity 2: Patrons
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Patrons (
  patron_id INT NOT NULL UNIQUE AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  fine INT NOT NULL DEFAULT 0,
  PRIMARY KEY (patron_id)
);

-- -----------------------------------------------------
-- Entity 3: Library_Items
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Library_Items (
  item_id INT NOT NULL UNIQUE AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  author VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  item_type_id INT NOT NULL,
  patron_id INT NULL,
  PRIMARY KEY (item_id),
  FOREIGN KEY (item_type_id) REFERENCES Item_Types(item_type_id) ON DELETE NO ACTION,
  FOREIGN KEY (patron_id) REFERENCES Patrons(patron_id) ON DELETE SET NULL
);

-- -----------------------------------------------------
-- Entity 4: Holds
-- -----------------------------------------------------
CREATE OR REPLACE TABLE Holds (
  hold_id INT NOT NULL UNIQUE AUTO_INCREMENT,
  hold_date DATETIME NOT NULL,
  queue_position INT NOT NULL, 
  item_id INT NOT NULL,
  patron_id INT NOT NULL,
  PRIMARY KEY (hold_id),
  FOREIGN KEY (item_id) REFERENCES Library_Items(item_id) ON DELETE CASCADE,
  FOREIGN KEY (patron_id) REFERENCES Patrons(patron_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Insert statements for sample data
-- -----------------------------------------------------

INSERT INTO Item_Types (check_out_length, type, fine_per_day)
values 
(21, 'Book', 1000),
(14, 'Movie', 2000),
(7, 'Music CD', 5000)
;

INSERT INTO Library_Items (title, genre, author, year, item_type_id, patron_id)
values
('Guns, Germs and Steel: The Fate of Human Societies', 'Non Fiction', 'Jared Diamond', 2011, 1, 1),
('Sapiens', 'Non Fiction', 'Yuval Noah Harari', 2017, 1, 1),
('A Brief History of Time', 'Non Fiction', 'Stephen Hawking', 1998, 1, 3),
('The Godfather', 'Drama', 'Francis Ford Coppola', 1972, 2, 3),
('Inception', 'Action', 'Christopher Nolan', 2010, 2, 4),
('The Lion King','Animation', 'Roger Allers',  1994, 2, 5),
('Nevermind', 'Grunge', 'Nirvana', 1991, 3, Null),
("I'm Not Dead", 'Pop', 'Pink', 2006, 3, Null),
('Are You Experienced','Rock', 'Jimi Hendrix', 1967, 3, 2 )
;

INSERT INTO Patrons(first_name, last_name)
values
('Nathan', 'Huffman'),
('Maya', "D'Souza"),
('John','Steinbeck'),
('Bill', 'Faulkner'),
('Madeleine', 'Albright'),
('Bugs', 'Bunny'),
('Taylor', 'Swift'),
('Charlie', 'Parker');

INSERT INTO Holds (hold_date, queue_position, item_id, patron_id)
values
('2023-01-01',1, 3, 4),
('2023-02-02',2, 3, 5),
('2023-01-30', 1, 4, 1);

-- -----------------------------------------------------
-- Reset default settings
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
