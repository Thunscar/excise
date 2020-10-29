package dao;

import tools.JdbcUtil;
import vo.Resource;
import vo.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ResourceDao {


    //查询当前用户所属的角色 并查询此角色能够访问的资源列表
    public ArrayList<Resource> getAllVisitResource(User user){
        ArrayList<Resource> resources = new ArrayList<>();

        Connection con = JdbcUtil.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            String sql = "select * " +
                    "from t_resource " +
                    "where resourceId in( " +
                    "select resourceId " +
                    "from t_role_resource " +
                    "where roleId in ( " +
                    "select roleId " +
                    "from t_role_user " +
                    "where userName = ? " +
                    ")" +
                    ")";
            ps = con.prepareStatement(sql);
            ps.setString(1,user.getUserName());
            rs = ps.executeQuery();
            while(rs.next()){
                Resource resource = new Resource(
                        rs.getInt("resourceId"),
                        rs.getString("resourceName"),
                        rs.getString("url")
                );
                resources.add(resource);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        JdbcUtil.closeAll(rs,ps,con);

        return resources;
    }

    public boolean isResourceVisit(User user,String resourceUrl){
        boolean isVisit = false;

        return isVisit;
    }
}
