package controller.main.user_center;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.UserDao;
import vo.Page;
import vo.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;

@WebServlet(urlPatterns = "/searchUser.do")
public class GetUserList extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");

        //获取请求数据
        String query_params = request.getParameter("query_params");
        String page_params = request.getParameter("page_params");

        System.out.println("查询参数:" + query_params);
        System.out.println("页码参数:" + page_params);

        Gson gson = new GsonBuilder().serializeNulls().create();
        HashMap<String,Object> page_map = gson.fromJson(page_params,HashMap.class);

        System.out.println("test");

        Page page = Page.getPageParams(page_map);
        System.out.println(page);

        User user = new User();
        if(query_params != null){
            user = gson.fromJson(query_params,User.class);
        }
        System.out.println(user);

        UserDao dao = new UserDao();
        ArrayList<User> users = dao.doSearch(user,page);
        int total = dao.getDoSearchCount(user,page);

        HashMap<String,Object> map = new HashMap<>();
        map.put("users",users);
        map.put("total",total);

        String jsonString = new Gson().toJson(map);
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(jsonString);
        out.flush();
        out.close();
    }

}
