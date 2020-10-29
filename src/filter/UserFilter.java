package filter;

import com.google.gson.Gson;
import dao.ResourceDao;
import vo.Resource;
import vo.User;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * User拦截器
 * 检查是否存在未登录情况下访问web资源
 *
 */
@WebFilter(filterName = "userFilter")
public class UserFilter implements javax.servlet.Filter {

    private String noCheckPath;

    //从配置文件的初始化参数中读取需要进行访问权限控制的资源url
    private String checkPath;

    //实例化一个资源dao
    private static ResourceDao resourceDao = new ResourceDao();

    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {

        System.out.println("UserFilter");

        HttpServletRequest request = (HttpServletRequest)req;

        System.out.println(request.getServletPath());

        HttpSession session = request.getSession();

        String path = request.getServletPath();

        if(!noCheckPath.contains(path)){
            if(session.getAttribute("User")==null){
                req.setAttribute("errorInfo","请您先登录");
                req.getRequestDispatcher("error.jsp").forward(req,resp);
            }else{

                User user = (User) session.getAttribute("User");
                //如果被访问的资源不是需要权限控制的资源 则放行
                if(checkPath.contains(path)){
                    //获取当前User角色能够访问的资源列表
                    ArrayList<Resource> visitResources = resourceDao.getAllVisitResource(user);
                    System.out.println(visitResources);
                    //检查当前被访问的资源是否是在该用户能够访问的资源列表之中
                    for(Resource resource:visitResources){
                        System.out.println(resource.getUrl() +  " " + path + " " + resource.getUrl().equals(path));
                        if(resource.getUrl().equals(path)){
                            chain.doFilter(req,resp);return;
                        }
                    }

                    Map<String,Object> returnInfo = new HashMap<>();
                    returnInfo.put("code",1);
                    returnInfo.put("message","对不起,您没有权限访问该资源");
                    String jsonString = new Gson().toJson(returnInfo);
                    resp.setContentType("text/html;charset=utf-8");
                    PrintWriter out = resp.getWriter();
                    out.print(jsonString);
                    out.flush();
                    out.close();
                }else{
                    chain.doFilter(req,resp);
                }

            }
        }else{
            chain.doFilter(req,resp);
        }

    }

    public void init(FilterConfig config) throws ServletException {
        noCheckPath = config.getInitParameter("noCheckPath");
        //初始化需要检查权限的资源url
        checkPath = config.getInitParameter("checkPath");
    }

}
