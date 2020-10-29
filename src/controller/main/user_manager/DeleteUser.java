package controller.main.user_manager;

import com.google.gson.Gson;
import dao.UserDao;
import vo.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

@WebServlet(urlPatterns = "/deleteUser.do")
public class DeleteUser extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");

        //获取参数
        String userName = request.getParameter("userName");
        UserDao dao = new UserDao();
        boolean isSuccess = dao.deleteUserByUserName(userName);
        HashMap<String,Object> map = new HashMap<>();
        if(isSuccess){ //删除成功
            map.put("code",0);
            map.put("message","删除成功!");
        }else{ //删除失败
            map.put("code",-1);
            map.put("message","删除用户失败!\n您不可以删除该用户!");
        }

        String jsonStr = new Gson().toJson(map);
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(jsonStr);
        out.flush();
        out.close();
    }

}
