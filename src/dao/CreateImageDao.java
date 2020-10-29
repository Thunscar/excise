package dao;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Random;

public class CreateImageDao {

    private static final int WIDTH = 100;
    private static final int HEIGHT = 30;
    private static final int LINECOUNT = 20;
    private static final int LENGTH = 4;

    private static final Random random = new Random();

    private static final String CODESTRING =
            "23456789"+"qwertyupasdfghjklzxcvbnm"+"QWERTYUPASDFGHJKZXCVBNM";

    public Color getColor(){
        return new Color(
                random.nextInt(255),
                random.nextInt(255),
                random.nextInt(255),
                random.nextInt(255));
    }

    public Font getFont(){
        return new Font("Fixedsys",Font.CENTER_BASELINE,22);
    }

    public void drawChar(Graphics graphics,String Code){
        graphics.setFont(this.getFont());
        for (int i = 0;i < LENGTH;i++){
            char ch = Code.charAt(i);
            graphics.setColor(this.getColor());
            graphics.drawString(Character.toString(ch),20 * i + 10,20);
        }
    }

    public String createCode(){
        String vCode = "";
        for (int i = 0; i < LENGTH;i++){
            char ch = CODESTRING.charAt(random.nextInt(CODESTRING.length()));
            vCode = vCode + ch;
        }
        return vCode;
    }

    public void drawLine(Graphics graphics){
        int x = random.nextInt(WIDTH);
        int y = random.nextInt(HEIGHT);
        int x1 = random.nextInt(13);
        int y1 = random.nextInt(15);
        graphics.setColor(this.getColor());
        graphics.drawLine(x,y,x+x1,x+y1);
    }

    public BufferedImage getVerityImage(String vCode){
        BufferedImage image = new BufferedImage(WIDTH,HEIGHT,BufferedImage.TYPE_3BYTE_BGR);

        Graphics graphics = image.getGraphics();

        graphics.setColor(Color.white);
        graphics.fillRect(0,0,WIDTH,HEIGHT);

        drawChar(graphics,vCode);

        for (int index = 0;index < LINECOUNT;index++){
            drawLine(graphics);
        }

        graphics.dispose();
        return image;
    }
}
