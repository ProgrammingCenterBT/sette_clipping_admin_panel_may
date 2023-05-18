package com.sette.model.pojo;

/**
 * @author achkovski
 */

import java.sql.PreparedStatement;
import java.util.ArrayList;

public class modelAdministrators extends DB {

private int admin_id = -1;
private String administrator_username = "";
private String administrator_password = "";
private int role_id = -1;
private String table_name = "administrators";

public modelAdministrators() {}

public modelAdministrators(int admin_id,String administrator_username,String administrator_password, int role_id) {
this.admin_id = admin_id;
this.administrator_username = administrator_username;
this.administrator_password = administrator_password;
this.role_id = role_id;
}

public void setAdmin_ID(int admin_id) {
this.admin_id = admin_id;
}
public int getAdmin_ID() {
return this.admin_id;
}
// ---------------------------------------------
public void setAdministrator_Username(String administrator_username) {
this.administrator_username = administrator_username;
}
public String getAdministrator_Username() {
return this.administrator_username;
}
// ---------------------------------------------
public void setAdministrator_Password(String administrator_password) {
this.administrator_password = administrator_password;
}
public String getAdministrator_Password() {
return this.administrator_password;
}
// ---------------------------------------------
public void setRole_ID(int role_id) {
this.role_id = role_id;
}
public int getRole_ID() {
return this.role_id;
}
// ---------------------------------------------

public ArrayList<modelAdministrators> selectAdministrator() {
ArrayList<modelAdministrators> administratorList = new ArrayList<modelAdministrators>();
String query = "SELECT * FROM " + this.table_name;
try
{
PreparedStatement preparedStmt = super.myConn.prepareStatement(query);
super.myRes = preparedStmt.executeQuery();

while (super.myRes.next()) {
int admin_id_select = super.myRes.getInt("admin_id");
String administrator_username_select = super.myRes.getString("administrator_username");
String administrator_password_select = super.myRes.getString("administrator_password");
int role_id_select = super.myRes.getInt("role_id");

administratorList.add(new modelAdministrators(admin_id_select,administrator_username_select,administrator_password_select,role_id_select));
}
super.myConn.close();

}catch (Exception e){
System.err.println("Got an exception!");
System.err.println(e.getMessage());
}// END CATCH
return administratorList;
}

}