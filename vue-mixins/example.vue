<template>
  <section class="table-wrap">
    <!-- 查询 -->
    <div class="search">
      <el-form :inline="true" :model="searchFilters">
        <el-row>
          <el-col :span="5">
            <el-form-item label="客户名">
              <el-input v-model="searchFilters.custName" placeholder="客户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="城市">
              <el-input v-model="searchFilters.cityName" placeholder="城市"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="品牌">
              <el-input v-model="searchFilters.brandName" placeholder="品牌"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="上牌时间">
              <el-date-picker type="month" v-model="searchFilters.firstLicenseTime" placeholder="上牌时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <span class="search">
              <el-button type="primary" @click.stop="dbnSearch">查询</el-button>
            </span>
            <span class="reset">
              <el-button type="danger" @click.stop="dbnResetSearch">重置</el-button>
            </span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--列表-->
    <el-table :data="tableList" highlight-current-row style="width: 100%;" v-loading="tableListLoading" 
    :stripe="t.stripe" :border="t.border" :size="t.size" :max-height="t.maxHeight" @selection-change="handleSelectionChange">
      <el-table-column type="index" width="55" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="custName" label="客户名" width="140">
      </el-table-column>
      <el-table-column prop="carInfo.brandName" label="品牌" width="140">
      </el-table-column>
      <el-table-column prop="carInfo.seriesName" label="系列" width="140">
      </el-table-column>
      <el-table-column prop="carInfo.modelName" label="车型" width="480"> 
      </el-table-column>
      <el-table-column prop="carInfo.firstLicenseTime" label="上牌时间" width="180">
      </el-table-column>
      <el-table-column prop="cityName" label="城市" width="100">
      </el-table-column>
      <el-table-column prop="mortgageAmount" label="按揭欠款" width="100">
      </el-table-column>
      <el-table-column prop="estimatePrice" label="评估金额" width="100">
      </el-table-column>
      <el-table-column prop="canLoanAmount" label="可贷金额" width="100">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="90px">
        <template slot-scope="scope">
          <span class="edit">
            <el-button size="small" @click.stop="handleEdit(scope.row, scope.column, scope.$index)">查看</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格底部操作/分页 -->
    <div class="table-bottom-wrap">
      <div class="page-box">
        <z-page  @current-change="currentPageChange" :current-page="page.current" :total="page.total">
        </z-page>
      </div>
    </div>
    <!-- 新增-编辑 -->
    <el-dialog :title="dialogForm.title" custom-class="addDialog" :visible.sync="dialogForm.isVisible">
      <el-form :model="dialogForm.formData" :rules="dialogForm.formRule" ref="myForm" label-width="120px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户名" prop="custName">
              <el-input v-model="dialogForm.formData.custName" placeholder="客户名" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌" prop="brandName">
              <el-input v-model="dialogForm.formData.brandName" placeholder="品牌" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="系列" prop="seriesName">
              <el-input v-model="dialogForm.formData.seriesName" placeholder="系列" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车型" prop="modelName">
              <el-input v-model="dialogForm.formData.modelName" placeholder="车型" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上牌世间" prop="firstLicenseTime">
              <el-date-picker type="month" v-model="dialogForm.formData.firstLicenseTime" placeholder="上牌时间" :disabled="true"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市" prop="cityName">
              <el-input v-model="dialogForm.formData.cityName" placeholder="城市" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="按揭欠款" prop="mortgageAmount">
              <el-input v-model="dialogForm.formData.mortgageAmount" placeholder="按揭欠款" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评估金额" prop="estimatePrice">
              <el-input v-model="dialogForm.formData.estimatePrice" placeholder="评估金额" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="可贷金额" prop="canLoanAmount">
              <el-input v-model="dialogForm.formData.canLoanAmount" placeholder="可贷金额" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行程(万公里)" prop="kilometers">
              <el-input v-model="dialogForm.formData.kilometers" placeholder="行程(万公里)" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="dialogForm.isVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import common from '@/mixins/common.js'
import cud from '@/mixins/cud.js'

export default {
  mixins: [common, cud],
  data() {
    return {
      url: {
        getData: '/carEvaluationService/listCarEstimate'
      }
    }
  }
}
</script>

