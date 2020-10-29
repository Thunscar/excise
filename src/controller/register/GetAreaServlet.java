package controller.register;

import com.google.gson.Gson;
import dao.AreaDao;
import vo.province;
import vo.City;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

@WebServlet(urlPatterns = "/getArea.do")
public class GetAreaServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");

        String provinceId = request.getParameter("provinceId");

        System.out.println(provinceId);

        String jsonString = "";
        AreaDao dao = new AreaDao();

        if(provinceId.equals("0") ){//获取省份信息
            ArrayList<province> provinces = dao.getAreaProvince();
            jsonString = new Gson().toJson(provinces);
        }else{//根据provinceId获取城市信息
            ArrayList<City> cityList = dao.getCityListByProvinceId(provinceId);
            jsonString = new Gson().toJson(cityList);
        }
        System.out.println(jsonString);
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(jsonString);
        out.flush();
        out.close();
    }
}
