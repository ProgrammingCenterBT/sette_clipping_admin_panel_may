package com.sette.model.pojo;

import java.sql.*;

/**
 * @author achkovski
 */

public class DB  {

    public void print(String text) {
        System.out.println(text);
    }
    
    protected Connection myConn = null;
    protected Statement myStatement = null;
    protected ResultSet myRes = null;
  
    private String user = "root";
    private String pass = "";
    private String host = "jdbc:mysql://localhost:3306/sette";
    
    DB() {
        try {
            this.myConn = DriverManager.getConnection(this.host, this.user, this.pass);
        }catch (Exception e){
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
    }
    
    public void insertRow(String table_name, String column_names, String column_values) {
        
        String query = "INSERT INTO " + table_name + "(" + column_names + ")" + " VALUES " + 
                "(" + column_values + ")";
        
        print(query);
    }
    
    /*public void deleteAll(String table_name) {
        
        String query = "DELETE FROM " + table_name;
        
        print(query);
        
    }*/
    
    public void select(String table_name) {
        
        String query = "SELECT * FROM " + table_name;
        
        print(query);
        
    }
    
}
