package main;
import java.sql.*;
//һ����������ȫ�ֱ�������
public class sql_va{
  private static final String URL = "jdbc:mysql://localhost:3306/rjgc?serverTimezone=GMT%2B8";
  public static final String USER = "root";
  public static final String PASSWORD = "456321";
  public static Connection conn;
  public static Statement  stmt;
  public static int 	   stop=0;
  public static void DataBase_Driver ()throws Exception
  {
      //1.������������
      Class.forName("com.mysql.cj.jdbc.Driver");
      //2. ������ݿ�����
      conn = DriverManager.getConnection(URL, USER, PASSWORD);
      //3.�������ݿ⣬ʵ����ɾ�Ĳ�
      stmt = conn.createStatement();
  }
}
