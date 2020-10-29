package controller.checkPage;

import com.google.gson.Gson;
import dao.DownloadDao;
import vo.Download;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet(urlPatterns = "/getDownloadList.do")
public class GetDownloadListController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");

        DownloadDao downloadDao = new DownloadDao();
        String jsonString = null;
        try {
            ArrayList<Download> downloadList = downloadDao.getDownloadList();
            jsonString = new Gson().toJson(downloadList);
        } catch (Exception e) {
            e.printStackTrace();
        }

        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(jsonString);
        out.flush();
        out.close();

//
//        RequestDispatcher dispatcher = request.getRequestDispatcher("download.jsp");
//        dispatcher.forward(request,response);
    }

}
