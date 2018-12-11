import { doPost } from "@/tools/request.js";
import { toStringValue } from "@/utils/util.js"
// toStringValue():给对象/对象数组的属性值为数值型的转为字符串型

/** @param {Object} o为表单默认要显示的默认值，如果无，就不填写，可选 */
export function createFn(o = {}) {
  this.$refs.myForm && this.$refs.myForm.resetFields();
  this.dialogForm.formData = Object.assign({}, toStringValue(o));
  this.dialogForm.isEdit = false;
  this.dialogForm.title = "新增";
  this.dialogForm.isVisible = true;
}

export function editFn(row = {}) {
  this.dialogForm.isEdit = true;
  this.dialogForm.title = "编辑";
  this.dialogForm.isVisible = true;
  this.dialogForm.formData = Object.assign({}, toStringValue(row));
}

export function delFn(row, url) {
  this.$confirm("确认删除该数据吗?", "提示", {
    type: "warning"
  }).then(
    () => {
      doPost(url, {
          id: row.id
        })
        .then(res => {
          this.$message.success("删除成功");
          this.getData();
        })
        .catch(e => {
          this.$message.error(e.message);
          catchUrl(e, url)
        });
    }
  ).catch(() => {
    this.$message.info("取消删除");
  });
}

export function delFn2(row, url) {
  this.$confirm("确认删除该数据吗?", "提示", {
    type: "warning"
  }).then(
    () => {
      doPost(url, {
          id: row.id
        })
        .then(res => {
          this.$message.success("删除成功");
          this.getData();
        })
        .catch(e => {
          this.$message.error(e.message);
          catchUrl(e, url)
        });
    }
  ).catch(() => {
    this.$message.info("取消删除");
  });
}

export function submitFn(formName, url, isEdit) {
  const title = isEdit ? '编辑' : '添加';
  this.$refs[formName].validate(valid => {
    if (valid) {
      doPost(url, this.dialogForm.formData)
        .then(() => {
          this.$message.success(`${title}成功`);
          this.getData();
          this.dialogForm.isVisible = false;
        })
        .catch(e => {
          // code=0,成功返回；反之，失败提示
          if (e.code && e.code !== 0) {
            this.$message.error(e.message);
          }
          catchUrl(e, url, `${title}`)
        });
    } else {
      console.error("Error submit ----- Form invalid !");
      return false;
    }
  })
}

export function getDataFn(url, param = {}) {
  this.tableListLoading = true;
  doPost(url, param)
    .then(res => {
      this.tableListLoading = false;
      this.page.total = res.count;
      this.tableList = res.list;
    })
    .catch(e => {
      // code=0,成功返回；反之，失败提示
      if (e.code && e.code !== 0) {
        this.$message.error(e.message);
      }
      catchUrl(e, url)
      this.tableListLoading = false;
    });
}

export function getDataFn2(fn, param = {}) {
  this.tableListLoading = true;
  fn(param)
    .then(res => {
      this.tableListLoading = false;
      this.page.total = res.count;
      this.tableList = res.list;
    })
    .catch(e => {
      catchFn(e, fn)
      this.tableListLoading = false;
    });
}

export function mulDelFn(url) {
  if (!this.mulSels.length) {
    this.$alert("请选择要删除的数据", "提示");
    return;
  }
  const deleIdArr = this.mulSels.map(o => o.id);
  this.$confirm("确认删除该数据吗?", "提示", {
    type: "warning"
  }).then(
    () => {
      doPost(url, {
          ids: deleIdArr
        })
        .then(res => {
          this.$message.success("删除成功");
          this.getData();
        })
        .catch(e => {
          catchUrl(e, url)
          this.$confirm(e.message, "提示", {
            type: "warning"
          }).then(
            () => {
              this.dialogForm.isVisible = false;
            }
          );
        });
    }
  ).catch(() => {
    this.$message.info("取消删除");
  });
}

function catchUrl(e, url, detail) {
  console.group(`Error found in doPost(${url})`)
  if (detail) console.info(`--${detail}--报错！`)
  console.error(e)
  console.groupEnd()
}

function catchFn(e, fn) {
  console.group(`Error found in method (${fn.name})`)
  console.error(e)
  console.groupEnd()
}
