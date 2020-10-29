package vo;

import java.util.HashMap;

public class Page {
    private int page_size;
    private int page_num;
    private String sort;
    private String sort_order;

    public Page() {
    }

    public Page(int page_size, int page_num, String sort, String sort_order) {
        this.page_size = page_size;
        this.page_num = page_num;
        this.sort = sort;
        this.sort_order = sort_order;
    }

    public int getPage_size() {
        return page_size;
    }

    public void setPage_size(int page_size) {
        this.page_size = page_size;
    }

    public int getPage_num() {
        return page_num;
    }

    public void setPage_num(int page_num) {
        this.page_num = page_num;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getSort_order() {
        return sort_order;
    }

    public void setSort_order(String sort_order) {
        this.sort_order = sort_order;
    }

    public static Page getPageParams(HashMap<String,Object> hashMap){
        int page_num = 0;
        if(!hashMap.get("page_num").equals("")){
            page_num = Integer.parseInt(hashMap.get("page_num").toString());
        }
        return new Page(
                Integer.parseInt(hashMap.get("page_size").toString()),
                page_num,
                hashMap.get("sort").toString(),
                hashMap.get("sort_order").toString());
    }

    @Override
    public String toString() {
        return "Page{" +
                "page_size=" + page_size +
                ", page_num=" + page_num +
                ", sort='" + sort + '\'' +
                ", sort_order='" + sort_order + '\'' +
                '}';
    }
}
