import TABLE from "@/utils/tableConfig.js";
import * as formFn from "@/utils/formFn.js";
import { debounce, getQueryParam } from "@/utils/util.js";
import ZSelect from "@/components/ZSelect/ZSelect.vue";
import ZPage from "@/components/ZPage/ZPage.vue";

export default {
  components: { ZPage, ZSelect },
  data() {
    return {
      searchFilters: {},
      tableList: [],
      tableListLoading: false,
      page: {
        size: 10,
        current: 1,
        total: 0
      },
      t: {
        border: TABLE.border,
        size: TABLE.size,
        stripe: TABLE.stripe,
        maxHeight: TABLE.maxHeight
      }
    };
  },
  methods: {
    getData() {
      const param = getQueryParam(this.searchFilters, this.page);
      formFn.getDataFn.apply(this, [this.url.getData, param]);
    },
    dbnSearch() {
      this.DSearchFn();
    },
    doSearch() {
      this.page.current = 1;
      this.getData();
    },
    dbnResetSearch() {
      this.DResetSearchFn();
    },
    doResetSearch() {
      this.searchFilters = {};
      this.page.current = 1;
      this.getData();
    },
    currentPageChange(p) {
      this.page.current = p;
      this.getData();
    },
    pageSizeChange(size) {
      this.page.size = size;
      this.getData();
    },
    indexMethod(idx) {
      return (this.page.current - 1) * this.page.size + (idx + 1);
    }
  },
  mounted() {
    this.getData();
  },
  created() {
    this.DSearchFn = debounce(() => this.doSearch());
    this.DResetSearchFn = debounce(() => this.doResetSearch());
  }
}
