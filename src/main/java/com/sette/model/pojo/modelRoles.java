package com.sette.model.pojo;

import java.sql.PreparedStatement;
import java.util.ArrayList;

/**
 * @author achkovski
 */

public class modelRoles extends DB{

    //permissions
    private int role_id = -1;
    private String name_of_role = "";
    private String table_name = "roles";
    
    public modelRoles() {}
    
    public modelRoles(int role_id, String name_of_role) {
        this.role_id = role_id;
        this.name_of_role = name_of_role;
    }

//----------------------------------------------------
    
    public void setRoleID(int role_id) {
        this.role_id = role_id;
    }
    
    public int getRoleID() {
        return this.role_id;
    }

//----------------------------------------------------
    
    public void setNameOfRole(String name_of_role) {
        this.name_of_role = name_of_role;
    }
    
    public String  getNameOfRole() {
        return this.name_of_role;
    }

//----------------------------------------------------

    public String getTableName() {
        return this.table_name;
    }
    
//----------------------------------------------------        

    public void insertRole(String name_of_role) {
        String queryP = "INSERT INTO " + this.getTableName() + "(name_of_role) VALUES " + "('" + name_of_role + "')";
        System.out.println(queryP);
        
        String query = "INSERT INTO " + this.getTableName() + "(name_of_role) VALUES "
                + "(?)";
        
        try {
            //create mysql insert prepared statement
            PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
            preparedStmt.setString(1, name_of_role);
            
            
            //execute the prepared statement
            preparedStmt.execute();
            System.out.println("Successfully imported role(s) into table!");
            
            //super.myConn.close();
        }catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
        
    }
    
    
    public void deleteRole(int role_id) {
        String query = "DELETE FROM " + this.table_name + " WHERE role_id = ?";
        
                try {
                PreparedStatement preparedStmt = super.myConn.prepareStatement(query);

            // set the corresponding param
            preparedStmt.setInt(1, role_id);
            // execute the delete statement
            preparedStmt.executeUpdate();

            System.out.println("Successfully deleted role(s) from table!");
            
            super.myConn.close();
        } catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
        
    }

    public ArrayList<modelRoles> selectRoles() {
        ArrayList<modelRoles> rolesList = new ArrayList<modelRoles>();
        String query = "SELECT * FROM " + this.getTableName();
        
        try {
            PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
            super.myRes = preparedStmt.executeQuery();
            
            while(super.myRes.next()) {
                int role_id_select = super.myRes.getInt("role_id");
                String name_of_role_select = super.myRes.getString("name_of_role");
                
                rolesList.add(new modelRoles(role_id_select, name_of_role_select));
            }
            super.myConn.close();
        }catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
         return rolesList;
    }
    
}
