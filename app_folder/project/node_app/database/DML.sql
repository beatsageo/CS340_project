-- Abiblophilia Anonymous Data Manipulation Queries
-- Team Number: 35
-- Names: Maya D'Souza, Nathan Huffman

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

-- get next queue position function for adding a hold *To be implemented*
-- this function will select next hold by finding max queue
-- position with matching library_item_id in Holds and adding 1

-----------------------------------------------
-- Retrieve queries
-----------------------------------------------

-- show all Item_Types
SELECT * from Item_Types;

-- show all Library_Items
SELECT * from Library_Items;

-- show all Holds
SELECT * from Holds;

-- show all Patrons
SELECT * from Patrons;

-- populate type dropdown
SELECT type FROM Item_Types;

-- populate patron_id dropdown
SELECT patron_id from Patrons;

-- populate hold_id dropdown
SELECT hold_id from Holds;

-- populate item_id dropdown
SELECT item_id from Library_Items;

-----------------------------------------------
-- Update queries where : indicates variable with data from backend
-----------------------------------------------

-- update queue position on a hold
UPDATE Holds SET queue_position = queue_position - 1 WHERE hold_id = :hold_id_from _update_from

-- update patron_id on a library_item (checked back in = NULL, or change when a new person checks it out)
UPDATE Patrons SET patron_id = :patron_id_from_dropdown_input WHERE item_id = :item_id_from_update_form

-- update fine associated with a patron (when they pay off or acquire new fines)
UPDATE Patrons SET fine = :fine WHERE patron_id = :patron_id_from_update_form

-----------------------------------------------
-- Delete queries where : indicates variable with data from backend
-----------------------------------------------

-- delete hold with matching id
DELETE FROM Holds WHERE hold_id = :hold_id_selected_from_holds_page

-- delete library item with matching id
DELETE FROM Library_Items WHERE item_id = :item_id_selected_from_library_items_page

-- delete patron with matching id
DELETE FROM Patrons WHERE patron_id = :patron_id_selected_from_patrons_page

-- delete item type with matching id
DELETE FROM Item_Types WHERE item_type_id = :item_type_id_selected_from_item_types_page
