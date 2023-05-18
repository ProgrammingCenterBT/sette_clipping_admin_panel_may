package com.sette.model.pojo;

import java.sql.PreparedStatement;
import java.util.ArrayList;

/**
 * @author achkovski
 */

public class modelRolesAndRights extends DB{

    //permissions
    private int roles_and_right_id = -1;
    private int role_id = -1;
    private int permissions_id = -1;
    private String table_name = "roles_and_rights";
    
    public modelRolesAndRights() {}
    
    public modelRolesAndRights(int roles_and_right_id, int role_id, int permissions_id) {
        this.roles_and_right_id = roles_and_right_id;
        this.role_id = role_id;
        this.permissions_id = permissions_id;
    }

//----------------------------------------------------
    
    public void setRolesAndRightID(int roles_and_right_id) {
        this.roles_and_right_id = roles_and_right_id;
    }
    
    public int getRoleAndRightID() {
        return this.roles_and_right_id;
    }

//----------------------------------------------------
    
    public void setRoleID(int role_id) {
        this.role_id = role_id;
    }
    
    public int getRoleID() {
        return this.role_id;
    }

//----------------------------------------------------
    
    public void setPermissionsID(int permissions_id) {
        this.permissions_id = permissions_id;
    }
    
    public int getPermissionsID() {
        return this.permissions_id;
    }

//----------------------------------------------------    

    public String getTableName() {
        return this.table_name;
    }
    
//----------------------------------------------------        

        public void insertRolesAndRights(int role_id, int permissions_id, String status) {
        String queryP = "INSERT INTO " + this.getTableName() + "(role_id, permissions_id, roles_and_right_status) VALUES " 
                + "('" + role_id + ", " + permissions_id + ", " + status + "')";
        System.out.println(queryP);
        
        String query = "INSERT INTO " + this.getTableName() + "(role_id, permissions_id, roles_and_right_status) VALUES "
                + "(?,?,?)";
        
        try {
            //create mysql insert prepared statement
            PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
            preparedStmt.setInt(1, role_id);
            preparedStmt.setInt(2, permissions_id);
            preparedStmt.setString(3, status);
            
            
            //execute the prepared statement
            preparedStmt.execute();
            System.out.println("Successfully imported role(s) and right(s) into table!");
            
            //super.myConn.close();
        }catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
        
    }
    
    public void deleteRoleAndRight(int roles_and_right_id) {
        String query = "DELETE FROM " + this.table_name + " WHERE roles_and_right_id = ?";
        
                try {
                PreparedStatement preparedStmt = super.myConn.prepareStatement(query);

            // set the corresponding param
            preparedStmt.setInt(1, roles_and_right_id);
            // execute the delete statement
            preparedStmt.executeUpdate();

            System.out.println("Successfully deleted role(s) and right(s) from table!");
            
            super.myConn.close();
        } catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
        
    }

    public ArrayList<modelRolesAndRights> selectRolesAndRights() {
        ArrayList<modelRolesAndRights> rolesAndRightsList = new ArrayList<modelRolesAndRights>();
        String query = "SELECT * FROM " + this.getTableName();
        
        try {
            PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
            super.myRes = preparedStmt.executeQuery();
            
            while(super.myRes.next()) {
                int roles_and_right_id_select = super.myRes.getInt("roles_and_right_id");
                int role_id_select = super.myRes.getInt("role_id");
                int permissions_id_select = super.myRes.getInt("permissions_id");
                
                rolesAndRightsList.add(new modelRolesAndRights(roles_and_right_id_select, role_id_select, permissions_id_select));
            }
            super.myConn.close();
        }catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
         return rolesAndRightsList;
    }
    
}
