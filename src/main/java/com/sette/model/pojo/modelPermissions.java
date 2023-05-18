package com.sette.model.pojo;

import java.sql.PreparedStatement;
import java.util.ArrayList;

/**
 * @author achkovski
 */

public class modelPermissions extends DB{

    //permissions
    private int permissions_id = -1;
    private String permissions_title = "";
    private String permissions_status = "";
    private String table_name = "permissions";
    
    public modelPermissions() {}
    
    public modelPermissions(int permissions_id, String permissions_title, String permissions_status) {
        this.permissions_id = permissions_id;
        this.permissions_title = permissions_title;
        this.permissions_status = permissions_status;
    }

//----------------------------------------------------
    
    public void setPermissionsID(int permissions_id) {
        this.permissions_id = permissions_id;
    }
    
    public int getPermissionsID() {
        return this.permissions_id;
    }

//----------------------------------------------------
    
    public void setPermissionsTitle(String permissions_title) {
        this.permissions_title = permissions_title;
    }
    
    public String getPermissionsTitle() {
        return this.permissions_title;
    }

//----------------------------------------------------
    
    public void setPermissionsStatus(String permissions_status) {
        this.permissions_status = permissions_status;
    }
    
    public String getPermissionsStatus() {
        return this.permissions_status;
    }

//----------------------------------------------------    

    public String getTableName() {
        return this.table_name;
    }
    
//----------------------------------------------------        
    
    public void insertPermissions(String permissions_title, String permissions_status) {
        String queryP = "INSERT INTO " + this.getTableName() + "(pTitle, pStatus) VALUES "
                + "('" + this.permissions_title + "', " + this.permissions_status + "')";
        System.out.println(queryP);
        
        String query = "INSERT INTO " + this.getTableName() + "(pTitle, pStatus) VALUES "
                + "(?,?,?,?)";
        
        try {
            //create mysql insert prepared statement
            PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
            preparedStmt.setString(1, this.permissions_title);
            preparedStmt.setString(2, this.permissions_status);
            
            //execute the prepared statement
            preparedStmt.execute();
            System.out.println("Successfully imported permission(s) into table!");
            
            super.myConn.close();
        }catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
        
    }
    
    public ArrayList<modelPermissions> selectPermissions() {
        ArrayList<modelPermissions> permissionsList = new ArrayList<modelPermissions>();
        String query = "SELECT * FROM " + this.getTableName();
        
        try {
            PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
            super.myRes = preparedStmt.executeQuery();
            
            while(super.myRes.next()) {
                int permissions_id_select = super.myRes.getInt("permissions_id");
                String permissions_title_select = super.myRes.getString("permissions_title");
                String permissions_status_select = super.myRes.getString("permissions_status");
                
                permissionsList.add(new modelPermissions(permissions_id_select, permissions_title_select, permissions_status_select));
            }
            super.myConn.close();
        }catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
         return permissionsList;
    }
    
    public void deletePermission(int permissions_id) {
        String query = "DELETE FROM " + this.table_name + " WHERE permissions_id = ?";
        
                try {
                PreparedStatement preparedStmt = super.myConn.prepareStatement(query);

            // set the corresponding param
            preparedStmt.setInt(1, permissions_id);
            // execute the delete statement
            preparedStmt.executeUpdate();

            System.out.println("Successfully deleted permission(s) from table!");
            
            super.myConn.close();
        } catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
        
    }
    
    public void updatePermission(int permissions_id, String permissions_title, String permissions_status) {
        String query = "UPDATE " + this.table_name + " SET pTitle = ?, pStatus = ? "
                + "WHERE permissions_id = ?";
        
                try {
                PreparedStatement preparedStmt = super.myConn.prepareStatement(query);

            // set the corresponding param
            preparedStmt.setString(1, permissions_title);
            preparedStmt.setString(2, permissions_status);
            preparedStmt.setInt(4, permissions_id);
            // execute the delete statement
            preparedStmt.executeUpdate();

            System.out.println("Successfully updated permission(s) from table!");
            
            super.myConn.close();
        } catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }        
    }
    
}
