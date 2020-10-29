package controller.main.user_manager;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.UserDao;
import vo.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(urlPatterns = "/updateUser.do")
public class UpdateUserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");

        System.out.println("updateUser.do....");

        //获取参数
        String userInfo = request.getParameter("user");

        System.out.println(userInfo);
        Gson gson = new GsonBuilder().serializeNulls().create();


        User user = gson.fromJson(userInfo,User.class);

        System.out.println(user);
        UserDao dao = new UserDao();
        int count = dao.updateUser(user);

        String info = "";
        if(count == 1){
            info = "更新数据成功!";
        }else if(count == -1){
            info = "不可以同等高权限用户信息!";
        } else{
            info = "更新用户数据失败!";
        }

        String jsonStr = new Gson().toJson(info);
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(jsonStr);
        out.flush();
        out.close();
    }

}
