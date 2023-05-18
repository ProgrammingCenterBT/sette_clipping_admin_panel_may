package com.sette.model.pojo;

import java.sql.PreparedStatement;
import java.util.ArrayList;

/**
 * @author ackovski
 */

public class modelPrintedMedium extends DB{

    private int printed_medium_id = -1;
    private String printed_medium_name = "";
    private String printed_medium_release_date = "";
    private String printed_medium_entry_date = "";
    private String printed_medium_title = "";
    private String printed_medium_text = "";
    private String printed_medium_importance = "";
    private String printed_medium_image_path = "";
    private String printed_medium_brief = "";
    private String printed_medium_pages = "";
    private String printed_medium_surface = "";
    private String printed_medium_cover = "";
    private String printed_medium_picture = "";
    private String printed_medium_research = "";
    private String printed_medium_relevance = "";
    private String printed_medium_authors = "";
    private String printed_medium_keywords = "";
    private String printed_medium_image = "";
    private String table_name = "printed_mediums";
    
    public modelPrintedMedium() {}
    
    public modelPrintedMedium(int printed_medium_id, String printed_medium_name, String printed_medium_release_date,
     String printed_medium_entry_date, String printed_medium_title, String printed_medium_text, String printed_medium_importance,
     String printed_medium_image_path, String printed_medium_brief, String printed_medium_pages, String printed_medium_surface,
     String printed_medium_cover, String printed_medium_picture, String printed_medium_research, String printed_medium_relevance,
     String printed_medium_authors, String printed_medium_keywords, String printed_medium_image) {
        this.printed_medium_id = printed_medium_id;
        this.printed_medium_name = printed_medium_name;
        this.printed_medium_release_date = printed_medium_release_date;
        this.printed_medium_entry_date = printed_medium_entry_date;
        this.printed_medium_title = printed_medium_title;
        this.printed_medium_text = printed_medium_text;
        this.printed_medium_importance = printed_medium_importance;
        this.printed_medium_image_path = printed_medium_image_path;
        this.printed_medium_brief = printed_medium_brief;
        this.printed_medium_pages = printed_medium_pages;
        this.printed_medium_surface = printed_medium_surface;
        this.printed_medium_cover = printed_medium_cover;
        this.printed_medium_picture = printed_medium_picture;
        this.printed_medium_research = printed_medium_research;
        this.printed_medium_relevance = printed_medium_relevance;
        this.printed_medium_authors = printed_medium_authors;
        this.printed_medium_keywords = printed_medium_keywords;
        this.printed_medium_image = printed_medium_image;
        
    }
    
    
    public void setPrintedMedium_ID(int printed_medium_id) {
        this.printed_medium_id = printed_medium_id;
    }
    public int getPrintedMedium_ID() {
        return this.printed_medium_id;
    }
 // ---------------------------------------------
        public void setPrintedMedium_Name(String printed_medium_name) {
        this.printed_medium_name = printed_medium_name;
    }
    public String getPrintedMedium_Name() {
        return this.printed_medium_name;
    }
 // ---------------------------------------------
    public void setPrintedMedium_ReleaseDate(String printed_medium_release_date) {
        this.printed_medium_release_date = printed_medium_release_date;
    }
    public String getPrintedMedia_ReleaseDate() {
        return this.printed_medium_release_date;
    }
 // --------------------------------------------- 
     public void setPrintedMedium_EntryDate(String printed_medium_entry_date) {
        this.printed_medium_entry_date = printed_medium_entry_date;
    }
    public String getPrintedMedium_EntryDate() {
        return this.printed_medium_entry_date;
    }
 // ---------------------------------------------
    public void setPrintedMedium_Title(String printed_medium_title) {
        this.printed_medium_title = printed_medium_title;
    }
    public String getPrintedMedium_Title() {
        return this.printed_medium_title;
    }
 // ---------------------------------------------
    public void setPrintedMedium_Text(String printed_medium_text) {
        this.printed_medium_text = printed_medium_text;
    }
    public String getPrintedMedium_Text() {
        return this.printed_medium_text;
    }
 // ---------------------------------------------
    public void setPrintedMedium_Importance(String printed_medium_importance) {
        this.printed_medium_importance = printed_medium_importance;
    }
    public String getPrintedMedium_Importance() {
        return this.printed_medium_importance;
    }
 // ---------------------------------------------
       public void setPrintedMedium_ImagePath(String printed_medium_image_path) {
        this.printed_medium_image_path = printed_medium_image_path;
    }
    public String getPrintedMedium_ImagePath() {
        return this.printed_medium_image_path;
    }
 // ---------------------------------------------
    
        public void setPrintedMedium_Brief(String printed_medium_brief) {
        this.printed_medium_brief = printed_medium_brief;
    }
    public String getPrintedMedium_Brief() {
        return this.printed_medium_brief;
    }
 // ---------------------------------------------
    public void setPrintedMedium_Pages(String printed_medium_pages) {
        this.printed_medium_pages = printed_medium_pages;
    }
    public String getPrintedMedium_Pages() {
        return this.printed_medium_pages;
}
// ---------------------------------------------
    public void setPrintedMedium_Surface(String printed_medium_surface) {
        this.printed_medium_surface = printed_medium_surface;
}
    public String getPrintedMedium_Surface() {
        return this.printed_medium_surface;
}
// ---------------------------------------------
    public void setPrintedMedium_Cover(String printed_medium_cover) {
        this.printed_medium_cover = printed_medium_cover;
}
    public String getPrintedMedium_Cover() {
        return this.printed_medium_cover;
}
// ---------------------------------------------
    public void setPrintedMedium_Picture(String printed_medium_picture) {
        this.printed_medium_picture = printed_medium_picture;
}
    public String getPrintedMedium_Pictures() {
        return this.printed_medium_picture;
}
// ---------------------------------------------
    public void setPrintedMedium_Research(String printed_medium_research) {
        this.printed_medium_research = printed_medium_research;
}
    public String getPrintedMedium_Research() {
        return this.printed_medium_research;
}
// ---------------------------------------------
    public void setPrintedMedium_Relevance(String printed_medium_relevance) {
        this.printed_medium_relevance = printed_medium_relevance;
}
    public String getPrintedMedium_Relevance() {
        return this.printed_medium_relevance;
}
// ---------------------------------------------
    public void setPrintedMedium_Authors(String printed_medium_authors) {
        this.printed_medium_authors = printed_medium_authors;
}
    public String getPrintedMedium_Authors() {
        return this.printed_medium_authors;
}
// ---------------------------------------------
    public void setPrintedMedium_Keywords(String printed_medium_keywords) {
        this.printed_medium_keywords = printed_medium_keywords;
}
    public String getPrintedMedium_Keywords() {
        return this.printed_medium_keywords;
}
// ---------------------------------------------
    public void setPrintedMedium_Image(String printed_medium_image) {
        this.printed_medium_image = printed_medium_image;
}
    public String getPrintedMedium_Image() {
        return this.printed_medium_image;
}
// ---------------------------------------------
    
    public String getTableName() {
        return this.table_name;
    }
    
//----------------------------------------------------  
    
        public ArrayList<modelPrintedMedium> selectPrintedMedium() {
        ArrayList<modelPrintedMedium> printedMediumList = new ArrayList<modelPrintedMedium>();
        String query = "SELECT * FROM " + this.table_name;
           try
           {
               PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
               super.myRes = preparedStmt.executeQuery();
               
               while (super.myRes.next()) {
                   int printed_medium_id_select = super.myRes.getInt("printed_medium_id");
                   String printed_medium_name_select = super.myRes.getString("printed_medium_name");
                   String printed_medium_release_date_select = super.myRes.getString("printed_medium_release_date");
                   String printed_medium_entry_date_select = super.myRes.getString("printed_medium_entry_date");
                   String printed_medium_title_select = super.myRes.getString("printed_medium_title");
                   String printed_medium_text_select = super.myRes.getString("printed_medium_text");
                   String printed_medium_importance_select = super.myRes.getString("printed_medium_importance");
                   String printed_medium_image_path_select = super.myRes.getString("printed_medium_image_path");
                   String printed_medium_brief_select = super.myRes.getString("printed_medium_brief");
                   String printed_medium_pages_select = super.myRes.getString("printed_medium_pages");
                   String printed_medium_surface_select = super.myRes.getString("printed_medium_surface");
                   String printed_medium_cover_select = super.myRes.getString("printed_medium_cover");
                   String printed_medium_picture_select = super.myRes.getString("printed_medium_picture");
                   String printed_medium_research_select = super.myRes.getString("printed_medium_research");
                   String printed_medium_relevance_select = super.myRes.getString("printed_medium_relevance");
                   String printed_medium_authors_select = super.myRes.getString("printed_medium_authors");
                   String printed_medium_keywords_select = super.myRes.getString("printed_medium_keywords");
                   String printed_medium_image_select = super.myRes.getString("printed_medium_image");
                   
                   printedMediumList.add(new modelPrintedMedium(printed_medium_id_select,printed_medium_name_select,printed_medium_release_date_select,
                   printed_medium_entry_date_select,printed_medium_title_select,printed_medium_text_select,printed_medium_importance_select, printed_medium_image_path_select,
                   printed_medium_brief_select, printed_medium_pages_select, printed_medium_surface_select, printed_medium_cover_select, printed_medium_picture_select,
                   printed_medium_research_select, printed_medium_relevance_select, printed_medium_authors_select, printed_medium_keywords_select, printed_medium_image_select));
          //  super.myConn.close();
               }
           }catch (Exception e){
               System.err.println("Got an exception!");
               System.err.println(e.getMessage());
           }// END CATCH
           return printedMediumList;
     }
        
        public void insertPrintedMedium(String printed_medium_name,String printed_medium_release_date,String printed_medium_entry_date,
            String printed_medium_title,String printed_medium_text,String printed_medium_importance,String printed_medium_image_path,
            String printed_medium_brief,String printed_medium_pages,String printed_medium_surface,String printed_medium_cover,
            String printed_medium_picture,String printed_medium_research,String printed_medium_relevance,String printed_medium_authors,
            String printed_medium_keywords, String printed_medium_image) {
        String queryP = "INSERT INTO " + this.getTableName() + "(printed_medium_name,printed_medium_release_date,printed_medium_entry_date,"
            + "printed_medium_title,printed_medium_text,printed_medium_importance,printed_medium_image_path,printed_medium_brief,"
            + "printed_medium_pages,printed_medium_surface,printed_medium_cover,printed_medium_picture,"
            + "printed_medium_research,printed_medium_relevance,printed_medium_authors,printed_medium_keywords,printed_medium_image) VALUES "
            + "('" + printed_medium_name +"','" + printed_medium_release_date + "','" + printed_medium_entry_date
            + "','" + printed_medium_title + "','" + printed_medium_text + "','" + printed_medium_importance
            + "','" + printed_medium_image_path + "','" + printed_medium_brief + "','" + printed_medium_pages
            + "','" + printed_medium_surface + "','" + printed_medium_cover + "','" + printed_medium_picture
            + "','" + printed_medium_research + "','" + printed_medium_relevance + "','" + printed_medium_authors
            + "','" + printed_medium_keywords+ "','" + printed_medium_image + "')";
                System.out.println(queryP);

        String query = "INSERT INTO " + this.getTableName() + "(printed_medium_name,printed_medium_release_date,printed_medium_entry_date,"
            + "printed_medium_title,printed_medium_text,printed_medium_importance,printed_medium_image_path,printed_medium_brief,"
            + "printed_medium_pages,printed_medium_surface,printed_medium_cover,printed_medium_picture,"
            + "printed_medium_research,printed_medium_relevance,printed_medium_authors,printed_medium_keywords,printed_medium_image) VALUES "
            + "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    try {
        //create mysql insert prepared statement
        PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
        preparedStmt.setString(1, printed_medium_name);
        preparedStmt.setString(2, printed_medium_release_date);
        preparedStmt.setString(3, printed_medium_entry_date);
        preparedStmt.setString(4, printed_medium_title);
        preparedStmt.setString(5, printed_medium_text);
        preparedStmt.setString(6, printed_medium_importance);
        preparedStmt.setString(7, printed_medium_image_path);
        preparedStmt.setString(8, printed_medium_brief);
        preparedStmt.setString(9, printed_medium_pages);
        preparedStmt.setString(10, printed_medium_surface);
        preparedStmt.setString(11, printed_medium_cover);
        preparedStmt.setString(12, printed_medium_picture);
        preparedStmt.setString(13, printed_medium_research);
        preparedStmt.setString(14, printed_medium_relevance);
        preparedStmt.setString(15, printed_medium_authors);
        preparedStmt.setString(16, printed_medium_keywords);
        preparedStmt.setString(17, printed_medium_image);


    //execute the prepared statement
        preparedStmt.execute();
        System.out.println("Successfully imported printed medium(s) into table!");

    //super.myConn.close();
        }catch (Exception e) {
        System.err.println("Error!");
        System.err.println(e.getMessage());
    }

}
    
}
