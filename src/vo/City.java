package vo;

public class City {
    private String cityId;
    private String cityName;

    public City( String areaId, String cityName) {
        this.cityId = areaId;
        this.cityName = cityName;
    }
    public String getAreaId() {
        return cityId;
    }

    public void setAreaId(String cityId) {
        this.cityId = cityId;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    @Override
    public String toString() {
        return "City{" +
                ", areaId=" + cityId +
                ", cityName='" + cityName + '\'' +
                '}';
    }
}
