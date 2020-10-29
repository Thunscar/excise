package filter;

import dao.UserDao;
import vo.User;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(filterName = "AutoLoginFilter")
public class AutoLoginFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest)req;

        System.out.println("AutoLoginFilter");

        //获取客户端Cookie列表
        Cookie[] cookies = request.getCookies();

        String userName = "";
        String password = "";

        //查找Cookie中的用户登录信息
        if(cookies!=null){
            for(Cookie cookie:cookies){
                if(cookie.getName().equals("userName")){
                    userName = cookie.getValue();
                    System.out.println(userName);
                }
                if(cookie.getName().equals("password")){
                    password = cookie.getValue();
                    System.out.println(password);
                }
            }

            //用户名密码正确  直接转发到main.jsp
            if(userName!=null&&password!=null){
                UserDao dao = new UserDao();
                User user = dao.getUserByUserName(userName);
                if(user!=null&&user.getPassword().equals(password)){
                    HttpSession session = ((HttpServletRequest) req).getSession();
                    session.setAttribute("User",user);
                    RequestDispatcher dispatcher = request.getRequestDispatcher("main.jsp");
                    dispatcher.forward(req,resp);
                }
            }
        }
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {

    }

}
