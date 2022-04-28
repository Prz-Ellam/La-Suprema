USE la_suprema;

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GetProduct;

CREATE PROCEDURE sp_GetProduct(
	IN _product_id					INT
)
BEGIN

	SELECT 
    		p.product_id,
            p.name AS product_name,
            p.price,
            IFNULL(p.discount, 0.0) AS discount,
            p.image,
            c.name AS category_name
	FROM 
    		products AS p
            JOIN categories AS c
            ON p.category_id = c.category_id
    WHERE 
    		product_id = _product_id;


END$$

DELIMITER ;