-- Abiblophilia Anonymous Data Manipulation Queries
-- Team Number: 35
-- Names: Maya D'Souza, Nathan Huffman
-- Description: These queries will be used in our CS340 Portfolio Project to create the functionality in our database website.

-----------------------------------------------
-- Create queries where : indicates variable with data from backend
-----------------------------------------------

-- create new item type
INSERT INTO Item_Types (type, check_out_length, fine_per_day)
VALUES (:type_input, :check_out_length_input, :fine_per_day_input);

-- add item to library
INSERT INTO Library_Items (title, genre, author, year, item_type_id, patron_id)
VALUES (:title_input, :genre_input, :author_input, :year_input, :item_type_id_from_dropdown_input, :patron_id_from_dropdown_input);

-- add patron to library
INSERT INTO Patrons(first_name, last_name, fine_amount)
VALUES (:first_name_input, :last_name_input, :fine_amount_input);

-- add hold to an item
INSERT INTO Holds (hold_date, queue_position, item_id, patron_id)
VALUES (curdate(), get_next_queue_position(), :item_type_id_from_dropdown_input, :patron_id_from_dropdown_input);

-----------------------------------------------
-- Retrieve queries
-----------------------------------------------

-- select all Item_Types
SELECT * from Item_Types;

-- select all Library_Items
SELECT * from Library_Items;

-- select all Holds
SELECT * from Holds;

-- select all Patrons
SELECT * from Patrons;

-- display all Library_Items, replace FK's to make table user-friendly
Select item_id, title, genre, author, year, type, first_name, last_name from Library_Items LEFT JOIN Patrons ON Library_Items.patron_id = Patrons.patron_id LEFT JOIN Item_Types on Library_Items.item_type_id = Item_Types.item_type_id;

-- display all Holds, replace FK's to make table user-friendly
Select hold_id, first_name, last_name, title, hold_date, queue_position from Holds LEFT JOIN Patrons ON Patrons.patron_id = Holds.patron_id LEFT JOIN Library_Items on Library_Items.item_id = Holds.item_id;

-- select patron with matching id
SELECT * FROM Patrons WHERE patron_id = :patron_id

-----------------------------------------------
-- Update queries where : indicates variable with data from backend
-----------------------------------------------

-- update queue position on a hold
UPDATE Holds SET queue_position = :queue_position_from_update_form WHERE hold_id = :hold_id_from _update_form

-- update patron_id on a library_item (checked back in = NULL, or change when a new person checks it out)
UPDATE Library_Items SET patron_id = NULL WHERE Library_Items.item_id = :item_id_from_update_form
UPDATE Library_Items SET patron_id = :patron_id_from_update_form WHERE Library_Items.item_id = :item_id_from_update_form

-- update fine associated with a patron (when they pay off or acquire new fines)
UPDATE Patrons SET fine = :fine_from_update_form WHERE patron_id = :patron_id_from_update_form

-----------------------------------------------
-- Delete queries where : indicates variable with data from backend
-----------------------------------------------

-- delete hold with matching id
DELETE FROM Holds WHERE hold_id = :hold_id_selected_from_holds_page

-- delete library item with matching id
DELETE FROM Library_Items WHERE item_id = :item_id_selected_from_library_items_page
