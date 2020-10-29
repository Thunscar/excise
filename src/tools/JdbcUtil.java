package tools;


import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.*;
import java.util.Properties;

public class JdbcUtil {

    private static final String JDBCPROPERTY = "jdbc.properties";
    private static String DRIVER = "";
    private static String URL = "";
    private static String USER = "";
    private static String PASS = "";



    public static Connection getConnection() {
        try {
            Properties property = new Properties();

            InputStream is = JdbcUtil.class.getClassLoader().getResourceAsStream("resource/"+JDBCPROPERTY);


            property.load(new InputStreamReader(is));
            is.close();
            DRIVER = property.getProperty("DRIVER");
            URL = property.getProperty("URL");
            USER = property.getProperty("USER");
            PASS = property.getProperty("PASS");
            //加载驱动
            Class.forName(DRIVER);

            Connection con = DriverManager.getConnection(
                    URL,
                    USER,
                    PASS
            );

            return con;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void closeAll(ResultSet rs, PreparedStatement ps,Connection con){
        if(rs != null){
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if(ps != null){
            try {
                ps.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if(con != null){
            try {
                con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

    }

    public static void closeAll(PreparedStatement ps,Connection con){
        if(ps != null){
            try {
                ps.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if(con != null){
            try {
                con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
