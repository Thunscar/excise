package dao;

import tools.JdbcUtil;
import vo.province;
import vo.City;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class AreaDao {
    public ArrayList<province> getAreaProvince(){
        ArrayList<province> areas = new ArrayList<>();

        Connection con = JdbcUtil.getConnection();
        String sql = "select * from t_province";
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()){
                areas.add(new province(rs.getString("provinceId"),rs.getString("provinceName")));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        JdbcUtil.closeAll(rs,ps,con);
        return areas;
    }

    public ArrayList<City> getCityListByProvinceId(String provinceId){
        ArrayList<City> cityList = new ArrayList<>();

        Connection con = JdbcUtil.getConnection();
        String sql = "SELECT * from t_city where provinceId = ?";
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = con.prepareStatement(sql);
            ps.setString(1,provinceId);
            rs = ps.executeQuery();
            while (rs.next()){
                cityList.add(new City(rs.getString("cityId"),rs.getString("cityName")));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        JdbcUtil.closeAll(rs,ps,con);
        return cityList;
    }
}
