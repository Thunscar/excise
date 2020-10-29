package dao;

import tools.JdbcUtil;
import vo.Page;
import vo.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class UserDao {


    public User getUserByUserName(String userName){
        User user = null;

        Connection con = JdbcUtil.getConnection();
        String sql = "select * from t_user";
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()){
                String name = rs.getString("userName");
                if(name.equals(userName)){
                    user = new User(
                            rs.getString("userName"),
                            rs.getString("password"),
                            rs.getString("chrName"),
                            rs.getString("email"),
                            rs.getString("provinceName"),
                            rs.getString("cityName")
                    );
                    break;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        JdbcUtil.closeAll(rs,ps,con);

        return user;
    }


    public boolean insertUser(User user){
        boolean isInsert = false;

        if(user.getUserName().equals("") ||
                user.getCityName().equals("-请选择-") ||
                user.getProvinceName().equals("-请选择-") ||
                user.getCityName().equals("-请选择-") ||
                user.getEmail().equals("") ||
                user.getPassword().equals("")
        ){
            return isInsert;
        }

        Connection con = JdbcUtil.getConnection();
        String sql = "INSERT into t_user (userName,password,chrName,email,provinceName,cityName) values(?,?,?,?,?,?)";
        String sql2 = "insert into t_role_user (userName,roleId) values(?,?)";
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement(sql);
            ps.setString(1,user.getUserName());
            ps.setString(2,user.getPassword());
            ps.setString(3,user.getChrName());
            ps.setString(4,user.getEmail());
            ps.setString(5,user.getProvinceName());
            ps.setString(6,user.getCityName());

            int count;
            count = ps.executeUpdate();
            System.out.println("t_user数据更新条数：" + count);

            ps = con.prepareStatement(sql2);
            ps.setString(1,user.getUserName());
            //设置普通访客
            ps.setString(2,"101");
            count = ps.executeUpdate();

            System.out.println("t_role_user数据更新条数：" + count);

            if(count != 0){
                isInsert = true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        JdbcUtil.closeAll(ps,con);

        return isInsert;
    }


    public ArrayList<User> doSearch(User user, Page page) {
        ArrayList<User> users = new ArrayList<>();

        StringBuffer condition = new StringBuffer();

        if(user.getUserName()!= null && !user.getUserName().equals("")){
            condition.append(" and userName like '%" )
                    .append(user.getUserName())
                    .append("%'");
        }

        if(user.getChrName() != null && !user.getChrName().equals("")){
            condition.append(" and chrName like '%")
                    .append(user.getChrName())
                    .append("%'");
        }

        if(user.getEmail() != null && !user.getEmail().equals("")){
            condition.append(" and email like '%")
                    .append(user.getEmail())
                    .append("%'");
        }

        if(user.getProvinceName() != null && !user.getProvinceName().equals("")){
            condition.append(" and provinceName like '%")
                    .append(user.getProvinceName())
                    .append("%'");
        }

        //数据开始记录的位置
        int begin = page.getPage_size() * (page.getPage_num() - 1);

        //sql语句
        String sql = "select userName,password,chrName,email,provinceName,cityName from t_user ";
        sql = sql + "where 1=1 ";
        sql = sql + condition;
        if(!page.getSort().equals("")){
            sql = sql + " order by " + page.getSort();
            if(!page.getSort_order().equals("")){
                sql = sql + " " + page.getSort_order();
            }
        }

        sql = sql + " limit " + begin + "," + page.getPage_size();

        System.out.println(sql);

        Connection connection = JdbcUtil.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()){
                users.add(new User(
                        rs.getString("userName"),
                        rs.getString("password"),
                        rs.getString("chrName"),
                        rs.getString("email"),
                        rs.getString("provinceName"),
                        rs.getString("cityName")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        JdbcUtil.closeAll(rs,ps,connection);
        return  users;
    }

    public int getDoSearchCount(User user,Page page){
        int count = 0;
        StringBuffer condition = new StringBuffer();

        if(user.getUserName()!= null && !user.getUserName().equals("")){
            condition.append(" and userName like '%" )
                    .append(user.getUserName())
                    .append("%'");
        }

        if(user.getChrName() != null && !user.getChrName().equals("")){
            condition.append(" and chrName like '%")
                    .append(user.getChrName())
                    .append("%'");
        }

        if(user.getEmail() != null && !user.getEmail().equals("")){
            condition.append(" and email like '%")
                    .append(user.getEmail())
                    .append("%'");
        }

        if(user.getProvinceName() != null && !user.getProvinceName().equals("")){
            condition.append(" and provinceName like '%")
                    .append(user.getProvinceName())
                    .append("%'");
        }

        //sql语句
        String sql = "select userName,password,chrName,email,provinceName,cityName from t_user ";
        sql = sql + "where 1=1 ";
        sql = sql + condition;
        if(!page.getSort().equals("")){
            sql = sql + " order by " + page.getSort();
            if(!page.getSort_order().equals("")){
                sql = sql + " " + page.getSort_order();
            }
        }

        System.out.println("getDoSearchCount:"+sql);

        Connection connection = JdbcUtil.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()){
                count++;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        JdbcUtil.closeAll(rs,ps,connection);

        return count;
    }

    public int updateUser(User user){
        int count = 0;

        //此处待开发 不可删除 同等级管理员用户 或管理员本身
        if(user.getUserName().equals("admin")){
            count = -1;
            return count;
        }

        if(user.getUserName().equals("") ||
                user.getCityName().equals("-请选择-") ||
                user.getProvinceName().equals("-请选择-") ||
                user.getCityName().equals("-请选择-") ||
                user.getEmail().equals("") ||
                user.getPassword().equals("")
        ){
            return count;
        }


        Connection con = JdbcUtil.getConnection();
        String sql = "update t_user set ";
        sql = sql + " chrName = '" + user.getChrName() + "',";
        sql = sql + " email = '" + user.getEmail() + "',";
        sql = sql + " provinceName = '" + user.getProvinceName() + "',";
        sql = sql + " cityName = '" + user.getCityName()+"'";
        sql = sql + " where userName = '" + user.getUserName() +"'";

        System.out.println("更新数据sql:" + sql);
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement(sql);
            count = ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        JdbcUtil.closeAll(ps,con);

        return  count;
    }

    public boolean deleteUserByUserName(String userName){
        boolean isSuccess = false;

        if(userName.equals("admin")){
            return isSuccess;
        }

        if(getUserByUserName(userName) == null){
            return isSuccess;
        }
        Connection con = JdbcUtil.getConnection();
        String sql_1 = "delete from t_role_user where userName = '" + userName + "'";
        String sql_2 = "delete from t_user where userName = '" + userName + "'";
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement(sql_1);
            int count = ps.executeUpdate();
            if(count == 1){
                ps = con.prepareStatement(sql_2);
                count = ps.executeUpdate();
                if(count == 1){
                    isSuccess = true;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        JdbcUtil.closeAll(ps,con);

        return isSuccess;

    }
}
