package com.sette.model.pojo;

import java.sql.PreparedStatement;
import java.util.ArrayList;

/**
 * @author achkovski
 */

public class modelAuthors extends DB{

    //permissions
    private int author_id = -1;
    private String full_name_chirilic = "";
    private String full_name_latin = "";
    private String table_name = "authors";
    
    public modelAuthors() {}
    
    public modelAuthors(int author_id, String full_name_cirilic, String full_name_latin) {
        this.author_id = author_id;
        this.full_name_chirilic = full_name_cirilic;
        this.full_name_latin = full_name_latin;
    }

//----------------------------------------------------
    
    public void setAuthorID(int author_id) {
        this.author_id = author_id;
    }
    
    public int getAuthorID() {
        return this.author_id;
    }

//----------------------------------------------------
    
    public void setFullNameCirilic(String full_name_cirilic) {
        this.full_name_chirilic = full_name_cirilic;
    }
    
    public String  getFullNameCirilic() {
        return this.full_name_chirilic;
    }

//----------------------------------------------------
    
    public void setFullNameLatin(String full_name_latin) {
        this.full_name_latin = full_name_latin;
    }
    
    public String  getFullNameLatin() {
        return this.full_name_latin;
    }

//----------------------------------------------------

    public String getTableName() {
        return this.table_name;
    }
    
//----------------------------------------------------        

    public void deleteAuthor(int author_id) {
        String query = "DELETE FROM " + this.table_name + " WHERE author_id = ?";
        
                try {
                PreparedStatement preparedStmt = super.myConn.prepareStatement(query);

            // set the corresponding param
            preparedStmt.setInt(1, author_id);
            // execute the delete statement
            preparedStmt.executeUpdate();

            System.out.println("Successfully deleted author(s) from table!");
            
            super.myConn.close();
        } catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
        
    }

    public ArrayList<modelAuthors> selectAuthors() {
        ArrayList<modelAuthors> authorsList = new ArrayList<modelAuthors>();
        String query = "SELECT * FROM " + this.getTableName();
        
        try {
            PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
            super.myRes = preparedStmt.executeQuery();
            
            while(super.myRes.next()) {
                int author_id_select = super.myRes.getInt("authors_id");
                String full_name_cirilic_select = super.myRes.getString("full_name_cirilic");
                String full_name_latin_select = super.myRes.getString("full_name_latin");
                
                authorsList.add(new modelAuthors(author_id_select, full_name_cirilic_select, full_name_latin_select));
            }
            super.myConn.close();
        }catch (Exception e) {
            System.err.println("Error!");
            System.err.println(e.getMessage());
        }
         return authorsList;
    }
    
}
