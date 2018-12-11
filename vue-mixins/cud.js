import * as formFn from "@/utils/formFn.js";
import { debounce } from "@/utils/util.js";
import MulSelect from "@/components/ZSelect/MulSelect.vue";

export default {
  components: { MulSelect },
  data() {
    return {
      dialogForm: {
        isEdit: false,
        isVisible: false,
        title: "",
        formData: {},
        formRule: {}
      },
      mulSels: [] //选中列，主要用于批量删除
    };
  },
  watch: {
    'dialogForm.isVisible': {
      handler(newV) {
        if (newV === false) {
          this.$refs.myForm && this.$refs.myForm.resetFields();
        }
      }
    }
  },
  methods: {
    handleEdit(row, col, idx) {
      formFn.editFn.apply(this, [row]);
    },
    handleDel(row, col, idx) {
      formFn.delFn.apply(this, [row, this.url.delete]);
    },

    // 表单新增/编辑+表单重置 start
    debounceSubmit(formName) {
      this.DSubmitFn(formName);
    },
    doSubmitForm(formName) {
      /* 分别是“修改”和“新增”的url */
      let _url = this.dialogForm.isEdit ? this.url.update : this.url.create;
      formFn.submitFn.apply(this, [formName, _url, this.dialogForm.isEdit]);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleBeforeClose() {
      this.$refs["myForm"].resetFields();
      this.dialogForm.isVisible = false;
    },
    // 表单新增/编辑+表单重置 end

    // 批量选择-删除start
    handleSelectionChange(val) {
      this.mulSels = val;
    },
    handleMulDel() {
      if (this.url && this.url.mulDel) {
        formFn.mulDelFn.call(this, this.url.mulDel);
      } else {
        console.log('多选删除失败：获取不到删除地址');
      }

    },
    // 批量选择-删除end

    handleCreate() {
      formFn.createFn.apply(this);
    }
  },
  created() {
    this.DSubmitFn = debounce(v => this.doSubmitForm(v));
  }
}
