DROP TABLE IF EXISTS stories;
CREATE TABLE stories
(id INT, p_name VARCHAR(100), country_id VARCHAR(2), country_name VARCHAR(100), message VARCHAR(1000), PRIMARY KEY(id));
INSERT INTO stories(id, p_name, country_id, country_name, message) VALUE (0, "Jason", "US", "United States", "hey yall")