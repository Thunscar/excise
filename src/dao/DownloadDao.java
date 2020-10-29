package dao;

import tools.JdbcUtil;
import vo.Download;

import java.sql.*;
import java.util.ArrayList;

public class DownloadDao {


    public ArrayList<Download> getDownloadList()throws Exception{
        ArrayList<Download> downloadList = new ArrayList<>();

        Connection con = JdbcUtil.getConnection();

        String sql = "SELECT * FROM t_download";
        PreparedStatement ps = con.prepareStatement(sql);
        ResultSet rs = ps.executeQuery();
        while(rs.next()){
            int id = rs.getInt("id");
            String name = rs.getString("name");
            String path = rs.getString("path");
            String description = rs.getString("description");
            String size = rs.getString("size");
            int star = rs.getInt("star");
            String image = rs.getString("image");
            downloadList.add(new Download(id,name,path,description,size,star,image));
        }

        JdbcUtil.closeAll(rs,ps,con);

        return downloadList;
    }

    public Download findDownloadById(int id) throws Exception {
        Download download = null;

        Connection con = JdbcUtil.getConnection();

        String sql = "SELECT * from  t_download";

        PreparedStatement ps = con.prepareStatement(sql);
        ResultSet rs = ps.executeQuery();

        while(rs.next()){
            if(id == rs.getInt("id")){
                download = new Download(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("path"),
                        rs.getString("description"),
                        rs.getString("size"),
                        rs.getInt("star"),
                        rs.getString("image")
                );
            }
        }

        JdbcUtil.closeAll(rs,ps,con);

        return download;
    }

}
