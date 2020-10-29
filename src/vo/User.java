package vo;

public class User {
    private String userName;
    private String password;
    private String chrName;
    private String email;
    private String provinceName;
    private String cityName;

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public User(String userName, String password, String chrName, String email, String provinceName, String cityName) {
        this.userName = userName;
        this.password = password;
        this.chrName = chrName;
        this.email = email;
        this.provinceName = provinceName;
        this.cityName = cityName;
    }


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getChrName() {
        return chrName;
    }

    public void setChrName(String chrName) {
        this.chrName = chrName;
    }


    public User() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProvinceName() {
        return provinceName;
    }

    @Override
    public String toString() {
        return "User{" +
                "userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", chrName='" + chrName + '\'' +
                ", email='" + email + '\'' +
                ", provinceName='" + provinceName + '\'' +
                ", cityName='" + cityName + '\'' +
                '}';
    }
}
