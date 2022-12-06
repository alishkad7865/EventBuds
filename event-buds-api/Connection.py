import os
import cx_Oracle
from mysql.connector import Error
cx_Oracle.init_oracle_client(lib_dir=os.getenv('OracleClientLocation'))
ConnectionString = os.getenv('connectionString')

def connection():
    try:
        connection = cx_Oracle.connect(user=os.getenv('OracleUserName'), password=os.getenv('oraclePassword'), dsn= ConnectionString,
                               encoding="UTF-8")
        # query = 'SELECT * FROM "ADMIN"."USER"'
        
        db_Info = connection.version
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        # cursor.execute(query)
        return connection
    except Error as e:
        print("Error while connecting to MySQL", e)
        return (None, None)