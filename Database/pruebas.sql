

CREATE TABLE shopping_sessions(
	session_id				INT NOT NULL AUTO_INCREMENT,
    user_id					INT NOT NULL,
    total					DECIMAL(6, 2) NOT NULL,
    created_at          	TIMESTAMP DEFAULT NOW(),
	modified_at             TIMESTAMP,
    
    PRIMARY KEY (session_id)
);

CREATE TABLE orders(
	order_id				INT NOT NULL AUTO_INCREMENT,
    shopping_session_id     INT NOT NULL,
	created_at          	TIMESTAMP DEFAULT NOW(),
    modified_at             TIMESTAMP,
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (order_id)
);

CREATE TABLE cart_items(
	cart_item_id			INT NOT NULL AUTO_INCREMENT,
    product_id				INT NOT NULL,
	session_id				INT NOT NULL,
    quantity				INT NOT NULL,
    created_at          	TIMESTAMP DEFAULT NOW(),
    modified_at             TIMESTAMP,
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (cart_item_id)
);


-- Este query sirve para obtener la cantidad de ventas que han tenido todos los pasteles ordenados del mas
-- vendido al menos vendido
SELECT products.name, IFNULL(COUNT(shoppings.product_id) * shoppings.quantity, 0) AS Cantidad FROM products
LEFT JOIN shoppings
ON products.product_id = shoppings.product_id
GROUP BY  products.name
ORDER BY Cantidad DESC;










SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM categories;
SELECT * FROM orders;
SELECT * FROM shoppings;







SELECT products.name, categories.name
FROM categories
LEFT JOIN products
ON categories.category_id = products.category_id;

SELECT categories.name, COUNT(*)
FROM categories
LEFT JOIN products
ON categories.category_id = products.category_id 
GROUP BY categories.name;

SELECT*FROM shoppings;




-- Ya quedo
SELECT categories.name, COUNT(shoppings.shopping_id) AS Total, 
COUNT(shoppings.shopping_id) / 
(SELECT COUNT(shoppings.shopping_id) FROM shoppings 
INNER JOIN orders ON shoppings.order_id = orders.order_id AND orders.user_id = 2) AS Porcentaje
FROM products
INNER JOIN shoppings
ON products.product_id = shoppings.product_id
INNER JOIN orders
ON shoppings.order_id = orders.order_id AND orders.user_id = 2
RIGHT JOIN categories
ON categories.category_id = products.category_id
GROUP BY categories.name
ORDER BY Total DESC;
SELECT * FROM BestSellersForUser;






DROP TEMPORARY TABLE IF EXISTS categories_percentage;
CREATE TEMPORARY TABLE categories_percentage
SELECT categories.name, COUNT(shoppings.shopping_id) AS Total, 
COUNT(shoppings.shopping_id) / (SELECT COUNT(shoppings.shopping_id) 
FROM shoppings 
INNER JOIN orders ON shoppings.order_id = orders.order_id AND orders.user_id = 2) AS Porcentaje
FROM products
INNER JOIN shoppings
ON products.product_id = shoppings.product_id
INNER JOIN orders
ON shoppings.order_id = orders.order_id AND orders.user_id = 2
RIGHT JOIN categories
ON categories.category_id = products.category_id
GROUP BY categories.name
ORDER BY Total DESC;

select bestsellers.name, bestsellers.price, bestsellers.image, (categories_percentage.porcentaje + bestsellers.porcentaje) / 2.0 AS TotalPorcentaje from bestsellers
JOIN categories_percentage
ON categories_percentage.name = bestsellers.category
ORDER BY TotalPorcentaje DESC;



