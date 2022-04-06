<?php
class DBConnection {

    private $domain = "localhost";
    private $name = "root";
    private $password = "root";
    private $database = "la_suprema";
    private $connection;

    public function __construct() {

        $connectionString = "mysql:hos=".$this->domain.";dbname=".$this->database.";charset=utf8";

        try {
            $this->connection = new PDO($connectionString, $this->name, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
        }
        catch (Exception $ex) {
            echo $ex->getMessage();
        }

    }

    protected function getConnection() {

        return $this->connection;

    }

}
?>