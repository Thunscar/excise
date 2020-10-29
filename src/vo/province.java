package vo;

public class province {
    private String provinceId;
    private String provinceName;

    public province(String areaId, String areaName) {
        this.provinceId = areaId;
        this.provinceName = areaName;
    }

    public String getProvinceId() {
        return this.provinceId;
    }

    public void setProvinceId(String provinceId) {
        this.provinceId = provinceId;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    @Override
    public String toString() {
        return "province{" +
                "provinceId=" + provinceId +
                ", provinceName='" + provinceName + '\'' +
                '}';
    }
}
