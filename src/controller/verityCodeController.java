package controller;

import dao.CreateImageDao;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;

@WebServlet(urlPatterns = "/verityCodeController.do")
public class verityCodeController extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");

        CreateImageDao createImageDao = new CreateImageDao();
        String vCode = createImageDao.createCode();
        BufferedImage image = createImageDao.getVerityImage(vCode);
        System.out.println("获取验证码：" + vCode);

        HttpSession session = request.getSession();
        session.setAttribute("vCode",vCode);

        response.setContentType("img/jpeg");
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");

        response.setDateHeader("Expires",0);

        ServletOutputStream out = response.getOutputStream();
        ImageIO.write(image,"JPEG",out);

        out.flush();
        out.close();

    }
}
