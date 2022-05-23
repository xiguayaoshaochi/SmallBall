<?php


define('db_host', 'localhost'); //数据库服务器 
define('db_user', 'root');      //数据库用户名 
define('dbpw', 'Lays@2016');    //数据库密码 
define('dbname', 'db_act_2022');  //数据库名 


define('dbtimezone', 'Asia/Shanghai');
define('dbcharset', 'utf8mb4');    //数据库编码,不建议修改 

class mysql {

    var $querynum = 0;
    var $link;
    var $sql;
    private $dbhost = db_host;
    private $dbname = dbname;
    private $dbuser = db_user;
    private $dbpw = dbpw;
    private $dbcharset = dbcharset;
    private $dbtimezone = dbtimezone;

    function mysql($dbhost = '', $dbuser = '', $dbpw = '', $dbname = '', $pconnect = 0) {

        $dbhost == '' ? $dbhost = $this->dbhost : $dbhost;
        $dbuser == '' ? $dbuser = $this->dbuser : $dbuser;
        $dbpw == '' ? $dbpw = $this->dbpw : $dbpw;
        $dbname == '' ? $dbname = $this->dbname : $dbname;

        if ($pconnect) {
            if (!$this->link = mysqli_connect($dbhost, $dbuser, $dbpw, $dbname)) {
                $this->halt('Can not connect to MySQL server');
            }
        } else {
            if (!$this->link = mysqli_connect($dbhost, $dbuser, $dbpw, $dbname)) {
                $this->halt('Can not connect to MySQL server');
            }
        }
        if ($this->version() > '4.1') {
            if ($this->dbcharset) {
                mysqli_query($this->link, "SET character_set_connection=$this->dbcharset, character_set_results=$this->dbcharset, character_set_client=binary");
            }

            if ($this->dbtimezone) {
                mysqli_query($this->link, "SET time_zone='$this->dbtimezone'");
            }

            if ($this->version() > '5.0.1') {
                mysqli_query($this->link, "SET sql_mode=''");
            }
        }

//        if ($dbname) {
//            mysqli_select_db($dbname, $this->link);
//        }
    }

    function select_db($dbname) {
        return mysqli_select_db($dbname, $this->link);
    }

    function fetch_array($query, $result_type = MYSQL_ASSOC) {
        return mysqli_fetch_array($query, $result_type);
    }

    function fetch_all($query, $result_type = MYSQL_ASSOC) {
        $result = array();
        $num = 0;

        while ($ret = mysqli_fetch_array($query, $result_type)) {
            $result[$num++] = $ret;
        }
        return $result;
    }

    function fetch_row($query) {
        $query = mysqli_fetch_row($query);
        return $query;
    }

    function result($query, $row) {
        $query = @mysqli_result($query, $row);
        return $query;
    }

    function query($sql, $type = '') {

        $func = $type == 'UNBUFFERED' && @function_exists('mysqli_unbuffered_query') ?
                'mysqli_unbuffered_query' : 'mysqli_query';
        if (!($query = $func($this->link, $sql)) && $type != 'SILENT') {
            //$this->halt('MySQL Query Error: ', $sql);
        }

        $this->querynum++;
        return $query;
    }

    function insert($table, $row, $isDebug = FALSE) {
        if (!$row)
            return null;
        $row = $this->_escape($row);
        $tmp = $tmp2 = array();
        foreach ($row as $key => $val) {
            $tmp[] = '`' . $key . '`';
            $tmp2[] = $val;
        }
        $sql = "insert into $table (" . join(',', $tmp) . ") values ('" . join('\',\'', $tmp2) . "')";
        if ($isDebug) {
            echo($sql);
            die();
        }
//        echo($sql);
//        exit();
        return $this->query($sql);
    }

    function update($table, $row, $where = null, $is_debug = FALSE) {
//        var_dump($table);
//        var_dump($row);
//        var_dump($where);
//        var_dump($is_debug);
//        exit();
        if (!$row || !$table)
            return null;

        $row = $this->_escape($row);
        $tmp = array();
        foreach ($row as $key => $val) {
            $tmp[] = '`'.$key . "` = '$val'";
        }
        $sql = "update $table set " . join(',', $tmp) . "";
        $sql = $where ? $sql . ' where ' . $where : $sql;
        if ($is_debug) {
            var_dump($sql);
            exit();
        }
//        echo $sql;
//        exit();
        return $this->query($sql);
    }

    function find($table, $field = '*', $where = null, $isDebug = FALSE) {
        if (!$table)
            return null;
        $sql = $this->bulidsql($table, $field, $where);
        if ($isDebug) {
            echo($sql);
            exit();
        }
        $query = $this->query($sql);
        $data = null;
        while ($row = $this->fech($query)) {
            $data[] = $row;
        }

        return $data;
    }

    function find_query($sql) {
        $query = $this->query($sql);
        $data = null;
        while ($row = $this->fech($query))
            $data[] = $row;
        return $data;
    }

    function findOne($table, $field = '*', $where = null, $debug = FALSE) {
        if (!$table)
            return null;
        $sql = $this->bulidsql($table, $field, $where . " limit 1");
//        echo($sql);
//        echo("<br/>");
//        exit();
        if ($debug) {
            echo($sql);
            die();
        }
        return $this->fech($this->query($sql));
    }

    function bulidsql($table, $field = '*', $where = null) {
        $sql = 'select ' . $field . ' from ' . $table;
        $sql = $where ? $sql . ' where ' . $where : $sql;
        $this->sql = $sql;
        return $sql;
    }

    function fech($query, $type = MYSQLI_ASSOC) {

//        return mysql_fetch_array($query, $type);
        return mysqli_fetch_array($query, $type);
    }

    function _escape($row) {
        if (is_array($row)) {
            foreach ($row as $key => $val) {
                $row[$key] = addslashes($val);
            }
        }
        return $row;
    }

    function affected_rows() {
        return mysqli_affected_rows($this->link);
    }

    function error() {
        return (($this->link) ? mysqli_error($this->link) : mysqli_error());
    }

    function errno() {
        return intval(($this->link) ? mysqli_errno($this->link) : mysqli_errno());
    }

    function num_rows($query) {
        $query = mysqli_num_rows($query);
        return $query;
    }

    function num_fields($query) {
        return mysqli_num_fields($query);
    }

    function free_result($query) {
        return mysqli_free_result($query);
    }

    function insert_id() {
        return ($id = mysqli_insert_id($this->link)) >= 0 ? $id : $this->result($this->query("SELECT last_insert_id()"), 0);
    }

    function fetch_fields($query) {
        return mysqli_fetch_fields($query);
//        return mysqli_fetch_field($query);
    }

    function version() {
        return mysqli_get_server_info($this->link);
    }

    function close() {
        return mysqli_close($this->link);
    }

    function halt($message = '', $sql = '') {
        echo $message . ' ' . $sql;
        exit;
    }

}

?>