package com.sette.model.pojo;

import java.sql.PreparedStatement;
import java.util.ArrayList;


public class modelMediums extends DB{

private int medium_id = -1;
private String medium_name_chirilic = "";
private String medium_name_latin = "";
private String medium_type = "";
private String table_name = "mediums";

public modelMediums() {}

public modelMediums(int medium_id,String medium_name_chirilic,String medium_name_latin,String medium_type) {
this.medium_id = medium_id;
this.medium_name_chirilic = medium_name_chirilic;
this.medium_name_latin = medium_name_latin;
this.medium_type = medium_type;
}


public void setMedium_ID(int medium_id) {
this.medium_id = medium_id;
}
public int getMedium_ID() {
return this.medium_id;
}
// ---------------------------------------------
public void setMedium_Name_Chirilic(String medium_name_chirilic) {
this.medium_name_chirilic = medium_name_chirilic;
}
public String getMedium_Name_Chirilic() {
return this.medium_name_chirilic;
}
// ---------------------------------------------
public void setMedium_Name_Latin(String medium_name_latin) {
this.medium_name_latin = medium_name_latin;
}
public String getMedium_Name_Latin() {
return this.medium_name_latin;
}
// ---------------------------------------------
public void setMedium_Type(String medium_type) {
this.medium_type = medium_type;
}
public String getMedium_Type() {
return this.medium_type;
}
// ---------------------------------------------
public String getTableName() {
return this.table_name;
}
// ---------------------------------------------

public ArrayList<modelMediums> selectMedium() {
ArrayList<modelMediums> mediumList = new ArrayList<modelMediums>();
String query = "SELECT * FROM " + this.table_name;
try
{
PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
super.myRes = preparedStmt.executeQuery();

while (super.myRes.next()) {
int medium_id_select = super.myRes.getInt("medium_id");
String medium_name_chirilic_select = super.myRes.getString("medium_name_chirilic");
String medium_name_latin_select = super.myRes.getString("medium_name_latin");
String medium_type_select = super.myRes.getString("medium_type");

mediumList.add(new modelMediums(medium_id_select,medium_name_chirilic_select,medium_name_latin_select,medium_type_select));
}
// super.myConn.close();

}catch (Exception e){
System.err.println("Got an exception!");
System.err.println(e.getMessage());
}// END CATCH
return mediumList;
}

public void insertMedium(String medium_name_chirilic,String medium_name_latin,String medium_type) {
String queryP = "INSERT INTO " + this.getTableName() + "(medium_name_chirilic,medium_name_latin,medium_type) VALUES "
+ "('" + medium_name_chirilic +"','" + medium_name_latin + "','" + medium_type + "')";
System.out.println(queryP);

String query = "INSERT INTO " + this.getTableName() + "(medium_name_chirilic,medium_name_latin,medium_type) VALUES "
+ "(?,?,?)";

try {
//create mysql insert prepared statement
PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
preparedStmt.setString(1, medium_name_chirilic);
preparedStmt.setString(2, medium_name_latin);
preparedStmt.setString(3, medium_type);

//execute the prepared statement
preparedStmt.execute();
System.out.println("Successfully imported medium(s) into table!");

//super.myConn.close();
}catch (Exception e) {
System.err.println("Error!");
System.err.println(e.getMessage());
}

}
}