package com.sette.model.pojo;

import java.sql.PreparedStatement;
import java.util.ArrayList;

/**
 * @author ackovski
 */

public class modelClients extends DB {
   
    private int client_id = -1;
    private String client_full_name = "";
    private String client_name = "";
    private String client_username = "";
    private String client_password = "";
    private String client_email = "";
    private String client_bcc = "";
    private int role_id = -1;
    private String table_name = "clients";
    
    public modelClients() {}
    
    public modelClients(int client_id,String client_full_name,String client_name, 
                  String client_username,String client_password,String client_email,String client_bcc, int role_id) {
        this.client_id = client_id;
        this.client_full_name = client_full_name;
        this.client_name = client_name;
        this.client_username = client_username;
        this.client_password = client_password;
        this.client_email = client_email;
        this.client_bcc = client_bcc;
        this.role_id = role_id;
    }
    
    
    public void setClient_ID(int client_id) {
        this.client_id = client_id;
    }
    public int getClient_ID() {
        return this.client_id;
    }
 // ---------------------------------------------
        public void setRole_ID(int role_id) {
        this.role_id = role_id;
    }
    public int getRole_ID() {
        return this.role_id;
    }
 // ---------------------------------------------
    public void setClient_Full_Name(String client_full_name) {
        this.client_full_name = client_full_name;
    }
    public String getClient_Full_Name() {
        return this.client_full_name;
    }
 // --------------------------------------------- 
     public void setClient_Name(String client_name) {
        this.client_name = client_name;
    }
    public String getClient_Name() {
        return this.client_name;
    }
 // ---------------------------------------------
    public void setClient_Username(String client_username) {
        this.client_username = client_username;
    }
    public String getClient_Username() {
        return this.client_username;
    }
 // ---------------------------------------------
    public void setClient_Password(String client_password) {
        this.client_password = client_password;
    }
    public String getClient_Password() {
        return this.client_password;
    }
 // ---------------------------------------------
    public void setClient_Email(String client_email) {
        this.client_email = client_email;
    }
    public String getClient_Email() {
        return this.client_email;
    }
 // ---------------------------------------------
       public void setClient_BCC(String client_bcc) {
        this.client_bcc = client_bcc;
    }
    public String getClient_BCC() {
        return this.client_bcc;
    }
 // ---------------------------------------------

    public String getTableName() {
        return this.table_name;
    }
    
//----------------------------------------------------   
    
    public ArrayList<modelClients> selectClient() {
        ArrayList<modelClients> clientList = new ArrayList<modelClients>();
        String query = "SELECT * FROM " + this.table_name;
           try
           {
               PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
               super.myRes = preparedStmt.executeQuery();
               
               while (super.myRes.next()) {
                   int client_id_select = super.myRes.getInt("client_id");
                   String client_full_name_select = super.myRes.getString("client_full_name");
                   String client_name_select = super.myRes.getString("client_name");
                   String client_username_select = super.myRes.getString("client_username");
                   String client_password_select = super.myRes.getString("client_password");
                   String client_email_select = super.myRes.getString("client_email");
                   String client_bcc_select = super.myRes.getString("client_bcc");
                   int role_id_select = super.myRes.getInt("role_id");
               
                   clientList.add(new modelClients(client_id_select,client_full_name_select,client_name_select,
                   client_username_select,client_password_select,client_email_select,client_bcc_select, role_id_select));
          //  super.myConn.close();
               }
           }catch (Exception e){
               System.err.println("Got an exception!");
               System.err.println(e.getMessage());
           }// END CATCH
           return clientList;
     }
    
        public void insertClient(String client_full_name, String client_name, String client_username, 
                String client_password, String client_email, String client_bcc, int role_id) {
        String queryP = "INSERT INTO " + this.getTableName() + "(cFullName, cName, cUsername, cPassword, cEmail, cBCC, cRoleID) VALUES "
                + "('" + client_full_name + "', '" + client_name + "', '" + client_username + "', '" + client_password + "', " 
                + "'" + client_email  + "', '" + client_bcc + "', " + role_id + ")";
        System.out.println(queryP);
        
        String query = "INSERT INTO " + this.getTableName() + "(client_full_name, client_name, "
                + "client_username, client_password, client_email, client_bcc, role_id) VALUES "
                + "(?,?,?,?,?,?,?)";
        
        try {
            //create mysql insert prepared statement
            PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
            preparedStmt.setString(1, client_full_name);
            preparedStmt.setString(2, client_name);
            preparedStmt.setString(3, client_username);
            preparedStmt.setString(4, client_password);
            preparedStmt.setString(5, client_email);
            preparedStmt.setString(6, client_bcc);
            preparedStmt.setInt(7, role_id);
            
            //execute the prepared statement
            preparedStmt.execute();
            System.out.println("Successfully imported client(s) into table!");
            
            super.myConn.close();
        }catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
        
    }
    
}