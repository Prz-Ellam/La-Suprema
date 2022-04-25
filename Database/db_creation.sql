CREATE DATABASE la_suprema;
USE la_suprema;

DROP TABLE IF EXISTS users;

CREATE TABLE users(
	user_id					INT NOT NULL AUTO_INCREMENT,
    email					VARCHAR(255) UNIQUE NOT NULL,
    password				VARCHAR(200) NOT NULL,
    username				VARCHAR(20) UNIQUE NOT NULL,
    created_at			    TIMESTAMP DEFAULT NOW(),
    modified_at             TIMESTAMP DEFAULT NOW(),
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS products;

CREATE TABLE products(
	product_id				INT NOT NULL AUTO_INCREMENT,
    name					VARCHAR(60) NOT NULL,
    price					DECIMAL(10, 2) NOT NULL,
    discount				DECIMAL(10, 2) NOT NULL,
    image					VARCHAR(255) NOT NULL,
    category_id				INT NOT NULL,
    rate					INT NOT NULL DEFAULT 0,
    created_at				TIMESTAMP DEFAULT NOW(),
	modified_at             TIMESTAMP DEFAULT NOW(),
    sounds_like				VARCHAR(200) NOT NULL,
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (product_id),
	CONSTRAINT Chk_rates CHECK (rate BETWEEN 0 AND 5)
);

DROP TABLE IF EXISTS categories;

CREATE TABLE categories(
	category_id				INT NOT NULL AUTO_INCREMENT,
    name					VARCHAR(60) NOT NULL,
    image					VARCHAR(255) NOT NULL,
    created_at          	TIMESTAMP DEFAULT NOW(),
	modified_at             TIMESTAMP DEFAULT NOW(),
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (category_id)
);

DROP TABLE IF EXISTS orders;

CREATE TABLE orders(
	order_id				INT NOT NULL AUTO_INCREMENT,
    user_id					INT NOT NULL,
	created_at          	TIMESTAMP DEFAULT NOW(),
    modified_at             TIMESTAMP,
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

DROP TABLE IF EXISTS shoppings;

CREATE TABLE shoppings(
	shopping_id				INT NOT NULL AUTO_INCREMENT,
    order_id				INT NOT NULL,
    product_id				INT NOT NULL,
    quantity				INT NOT NULL,
    amount					DECIMAL(10, 2),
    created_at          	TIMESTAMP DEFAULT NOW(),
    modified_at             TIMESTAMP,
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (shopping_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)

);

CREATE TABLE carts(
	cart_id					INT NOT NULL AUTO_INCREMENT,
    user_id					INT,
    guest_id				VARCHAR(16),
    cart_status             BOOL NOT NULL,    
	PRIMARY KEY (cart_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE cart_items(
	cart_item_id			INT NOT NULL AUTO_INCREMENT,
	cart_id					INT NOT NULL,
    product_id				INT NOT NULL,
    quantity				INT NOT NULL,
	PRIMARY KEY (cart_item_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);





USE `la_suprema`;
DROP procedure IF EXISTS `sp_ProductsFilter`;

DELIMITER $$
USE `la_suprema`$$
CREATE PROCEDURE `sp_ProductsFilter` (IN _filter VARCHAR(200), IN _metaphone_filter VARCHAR(200))
BEGIN
SELECT products.* FROM products 
JOIN categories
ON categories.category_id = products.category_id
WHERE products.name LIKE CONCAT('%', _filter, '%')
OR products.sounds_like LIKE CONCAT('%', _metaphone_filter, '%')
OR categories.name LIKE CONCAT('%', _filter, '%');

END$$

DELIMITER ;




-- Saber si el cliente ha comprado algo
USE `la_suprema`;
DROP procedure IF EXISTS `sp_GetShoppingsCount`;

DELIMITER $$
USE `la_suprema`$$
CREATE PROCEDURE `sp_GetShoppingsCount` (IN _user_id INT)
BEGIN
SELECT COUNT(*) Total FROM shoppings
JOIN orders
ON orders.order_id = shoppings.order_id
WHERE orders.user_id = _user_id;
END$$

DELIMITER ;


SELECT products.name FROM shoppings
JOIN orders
ON orders.order_id = shoppings.order_id
RIGHT JOIN products
ON shoppings.product_id = products.product_id
WHERE orders.user_id = 1;





USE `la_suprema`;
DROP procedure IF EXISTS `sp_InsertUser`;

DELIMITER $$
USE `la_suprema`$$
CREATE PROCEDURE `sp_InsertUser` (IN _username VARCHAR(18), IN _email VARCHAR(255), IN _password VARCHAR(200))
BEGIN
INSERT INTO users(username, email, password) VALUES(_username, _email, _password);
SELECT user_id, username FROM users WHERE email = _email AND password = _password;
END$$

DELIMITER ;



USE `la_suprema`;
CREATE OR REPLACE VIEW `vw_GetByUsers` AS

SELECT COUNT(0) FROM shoppings
INNER JOIN orders
ON shoppings.order_id = orders.order_id AND orders.user_id = 1
 WHERE orders.user_id = 1;




DROP VIEW IF EXISTS `BestSellersForUser`;
CREATE VIEW `BestSellersForUser` AS
SELECT products.product_id, products.name, products.price, products.discount, products.image, 
IFNULL(COUNT(shoppings.product_id) * shoppings.quantity, 0) AS Cantidad, 
IFNULL(COUNT(shoppings.product_id) * shoppings.quantity, 0) / (SELECT COUNT(shoppings.product_id) FROM shoppings) AS Porcentaje,
categories.name AS category FROM products
INNER JOIN categories
ON categories.category_id = products.category_id
LEFT JOIN shoppings
ON products.product_id = shoppings.product_id
GROUP BY  products.name
ORDER BY IFNULL(COUNT(shoppings.product_id) * shoppings.quantity, 0) DESC;

CALL sp_GetUserRecomendations(1);

USE `la_suprema`;
DROP procedure IF EXISTS `sp_GetUserRecomendations`;

DELIMITER $$
USE `la_suprema`$$
CREATE PROCEDURE `sp_GetUserRecomendations` (IN _user_id INT)
BEGIN
DROP TEMPORARY TABLE IF EXISTS categories_percentage;
CREATE TEMPORARY TABLE categories_percentage
SELECT categories.name, COUNT(shoppings.shopping_id) AS Total, 
COUNT(shoppings.shopping_id) / (SELECT COUNT(shoppings.shopping_id) 
FROM shoppings 
INNER JOIN orders ON shoppings.order_id = orders.order_id AND orders.user_id = _user_id) AS Porcentaje
FROM products
INNER JOIN shoppings
ON products.product_id = shoppings.product_id
INNER JOIN orders
ON shoppings.order_id = orders.order_id AND orders.user_id = _user_id
RIGHT JOIN categories
ON categories.category_id = products.category_id
GROUP BY categories.name
ORDER BY Total DESC;

select BestSellersForUser.product_id, BestSellersForUser.name, BestSellersForUser.price, BestSellersForUser.discount,
BestSellersForUser.image, (categories_percentage.porcentaje + BestSellersForUser.porcentaje) / 2.0 AS TotalPorcentaje from BestSellersForUser
JOIN categories_percentage
ON categories_percentage.name = BestSellersForUser.category
ORDER BY TotalPorcentaje DESC
LIMIT 0, 12;

END$$

DELIMITER ;



DROP VIEW IF EXISTS `BestSellers`;
CREATE VIEW `BestSellers` AS
SELECT products.product_id, products.name, products.price, products.image, 
IFNULL(COUNT(shoppings.product_id) * shoppings.quantity, 0) AS Cantidad, 
IFNULL(COUNT(shoppings.product_id) * shoppings.quantity, 0) / (SELECT COUNT(shoppings.product_id) FROM shoppings) AS Porcentaje,
categories.name AS category FROM products
INNER JOIN categories
ON categories.category_id = products.category_id
LEFT JOIN shoppings
ON products.product_id = shoppings.product_id
GROUP BY  products.name
ORDER BY IFNULL(COUNT(shoppings.product_id) * shoppings.quantity, 0) DESC
LIMIT 0, 12;




USE `la_suprema`;
DROP procedure IF EXISTS `sp_GetProducts`;

DELIMITER $$
USE `la_suprema`$$
CREATE PROCEDURE `sp_GetProducts` ()
BEGIN

SELECT product_id, name, products.price, products.discount, products.image
FROM products
WHERE active = TRUE
ORDER BY created_at DESC, product_id DESC
LIMIT 0, 12;

END$$

DELIMITER ;




/*

USE `la_suprema`;
DROP procedure IF EXISTS `sp_GetProducts`;

DELIMITER $$
USE `la_suprema`$$
CREATE PROCEDURE `sp_GetProducts` ()
BEGIN

SELECT name, price, image
FROM products
WHERE active = TRUE;

END$$

DELIMITER ;

*/


USE `la_suprema`;
DROP procedure IF EXISTS `sp_GetSellersProducts`;

DELIMITER $$
USE `la_suprema`$$
CREATE PROCEDURE `sp_GetSellersProducts` ()
BEGIN

SELECT products.product_id, products.name, products.price, products.discount,
products.image, IFNULL(COUNT(shoppings.product_id) * shoppings.quantity, 0) AS Cantidad FROM products
LEFT JOIN shoppings
ON products.product_id = shoppings.product_id
GROUP BY  products.name
ORDER BY IFNULL(COUNT(shoppings.product_id) * shoppings.quantity, 0) DESC
LIMIT 0, 12;

END$$

DELIMITER ;


USE `la_suprema`;
DROP procedure IF EXISTS `sp_GetOfferProducts`;

DELIMITER $$
USE `la_suprema`$$
CREATE PROCEDURE `sp_GetOfferProducts` ()
BEGIN
SELECT product_id, name, price, discount, image
FROM products
WHERE discount > 0.00
ORDER BY discount DESC
LIMIT 12;
END$$

DELIMITER ;





USE `la_suprema`;
DROP procedure IF EXISTS `sp_GetCategories`;

DELIMITER $$
USE `la_suprema`$$
CREATE PROCEDURE `sp_GetCategories` (IN _user_id INT)
BEGIN

IF (_user_id <= 0) THEN

SELECT categories.name, categories.image
FROM categories
LEFT JOIN products
ON categories.category_id = products.category_id
LEFT JOIN shoppings
ON shoppings.product_id = products.product_id
GROUP BY categories.name
ORDER BY  COUNT(shoppings.product_id) DESC;

ELSE 

SELECT categories.name, categories.image
FROM products
INNER JOIN shoppings
ON products.product_id = shoppings.product_id
INNER JOIN orders
ON shoppings.order_id = orders.order_id AND orders.user_id = _user_id
RIGHT JOIN categories
ON categories.category_id = products.category_id
GROUP BY categories.name
ORDER BY COUNT(shoppings.shopping_id) / 
(SELECT COUNT(shoppings.shopping_id) FROM shoppings 
INNER JOIN orders ON shoppings.order_id = orders.order_id AND orders.user_id = _user_id) DESC;

END IF;

END$$

DELIMITER ;



INSERT INTO categories(name, image)
VALUES('Tres leches', 'E001S000031.jpg');
INSERT INTO categories(name, image)
VALUES('Chocolates', 'E001S000431.jpg');
INSERT INTO categories(name, image)
VALUES('Frutas', 'E001S007866.jpg');
INSERT INTO categories(name, image)
VALUES('Nevados', 'E001S014930.jpg');
INSERT INTO categories(name, image)
VALUES('Rollos', 'E001S000035.jpg');

INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Fresas con crema', 297.50, 'IMG001.jpg', 3, 'FRSSKNKRM');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Tres leches combinado', 340.00, 'E001S000032.jpg', 1, 'TRSLXSKMNT');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Tentación de frutas', 250.50, 'E001S011649.jpg', 3, 'TNTSNTFRTS');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Bambino tentación de fresas', 300.00, 'E001S007866.jpg', 3, 'BMNTNTSNTFRSS');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Pastel Zebra', 339.00, 'E001S000431.jpg', 2, 'PSTLSBR');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Pastel Cubano', 305.00, 'E001S000026.jpg', 2, 'PSTLKBN');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Pastel Combinado', 238.00, 'E001S000033.jpg', 2, 'PSTLKMNT');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Pastel Bombon', 360.00, 'E001S001626.jpg', 2, 'PSTLBMN');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Pastel Aleman', 262.00, 'E001S014186.jpg', 2, 'PSTLLMN');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Pastel de 3 Leches de Fresa', 368.00, 'E001S000031.jpg', 1, 'PSTLTLXSTFRS');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Pastel nevado de Oreo', 339.00, 'E001S014930.jpg', 4, 'PSTLNFTTR');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Pastel nevado de Fresa', 339.00, 'E001S014507.jpg', 4, 'PSTLNFTTFRS');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Rollo de queso con frutos rojos', 210.00, 'E001S011206.jpg', 5, 'RLTKSKNFRTSRJS');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Rollo de mango', 240.00, 'E001S000496.jpg', 5, 'RLTMNK');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Tentación de mango', 389.00, 'E001S011648.jpg', 3, 'TNTSNTMNK');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Pastel nevado de nuez', 339.00, 'E001S014478.jpg', 4, 'PSTLNFTTNS');
INSERT INTO products(name, price, image, category_id, sounds_like)
VALUES('Pastel mechudo', 181.00, 'E001S000035.jpg', 5, 'A');

SELECT * FROM users;
SELECT * FROM categories;
SELECT * FROM products;
SELECT * FROM orders;
SELECT * FROM shoppings;



INSERT INTO orders(user_id)
VALUES(1);

INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 11, 1, 0.00);
INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 12, 1, 0.00);
INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 12, 1, 0.00);


INSERT INTO orders(user_id)
VALUES(2);
INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(2, 15, 3, 0.00);
INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(2, 15, 2, 0.00);


INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 7, 4, 0.00);



INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 9, 1, 262.00);
INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 9, 1, 262.00);
INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 5, 1, 339.00);

INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(2, 15, 3, 339.00);

INSERT INTO orders(user_id)
VALUES(2);

INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(2, 10, 1, 339.00);
INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(2, 11, 1, 339.00);


/*
INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 4, 2, 600.00);
INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 8, 1, 360.00);
INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 3, 4, 1000.00);
*/



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_CreateCart;

CREATE PROCEDURE sp_CreateCart(
	_user_id				INT
)
BEGIN

	INSERT INTO carts(user_id, cart_status)
    VALUES(_user_id, TRUE);

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetActiveCart;

CREATE PROCEDURE sp_GetActiveCart(
	_user_id				INT
)
BEGIN

SELECT cart_id FROM carts WHERE user_id = _user_id AND cart_status = TRUE;

END$$

DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS sp_InsertCartItem;

CREATE PROCEDURE sp_InsertCartItem(
	_cart_id				INT,
	_product_id				INT,
    _quantity				INT
)
BEGIN

	IF (EXISTS (SELECT cart_id, product_id FROM cart_items WHERE cart_id = _cart_id AND product_id = _product_id)) THEN 
	UPDATE cart_items
    SET
    quantity = quantity + _quantity
    WHERE cart_id = _cart_id AND product_id = _product_id;
    ELSE 
    INSERT INTO cart_items(cart_id, product_id, quantity)
    VALUES(_cart_id, _product_id, _quantity);
    END IF;

END$$

DELIMITER ;




DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetCartItems;

CREATE PROCEDURE sp_GetCartItems(
	_cart_id				INT
)
BEGIN

	SELECT
    		p.product_id AS product_id,
    		p.image AS image,
            p.name AS name,
            p.price AS price,
            p.discount AS discount,
            ci.quantity AS quantity
    FROM
    		cart_items AS ci
            JOIN carts AS c
            ON ci.cart_id = c.cart_id
            JOIN products AS p
            ON ci.product_id = p.product_id;

END$$

DELIMITER ;





DELIMITER $$
DROP PROCEDURE IF EXISTS sp_UpdateCartItem;

CREATE PROCEDURE sp_UpdateCartItem(
	_cart_id				INT,
	_product_id				INT,
    _quantity				INT
)
BEGIN

	UPDATE cart_items
    SET
    quantity = _quantity
    WHERE cart_id = _cart_id AND product_id = _product_id;

END$$

DELIMITER ;




DELIMITER $$
DROP PROCEDURE IF EXISTS sp_DeleteCartItem;

CREATE PROCEDURE sp_DeleteCartItem(
	_cart_id				INT,
	_product_id				INT
)
BEGIN

	DELETE FROM cart_items
    WHERE cart_id = _cart_id AND product_id = _product_id;

END$$

DELIMITER ;

