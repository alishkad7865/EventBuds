import mysql.connector
from mysql.connector import Error
def connection():
    try:
        connection = mysql.connector.connect(
            host = "localhost",
            user = "eventbud",
            password = "Thi5i5My5qlPa55word!",
            database = "eventbuds"
        )
        query = """CREATE TABLE IF NOT EXISTS Click( 
                                Id int(11) NOT NULL AUTO_INCREMENT,
                                click varchar(250) NOT NULL,
                                TotalClick int(11) NOT NULL,
                                PRIMARY KEY (Id)) """
        
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        result = cursor.execute(query)
        return connection
    except Error as e:
        print("Error while connecting to MySQL", e)
        return (None, None)