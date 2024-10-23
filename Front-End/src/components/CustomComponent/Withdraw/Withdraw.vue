<template>
  <div>
    <el-table
      stripe
      v-loading="load_data"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="convertData"
      :row-class-name="tableRowClassName"
    >
      <el-table-column min-width="80" prop="id" label="ID"/>
      <el-table-column min-width="120" prop="orderid" label="Order ID"/>
      <el-table-column min-width="300" label="Account Detail">
        <div slot-scope="props">
          <div><strong>MDR </strong>{{ props.row.mdr }}</div>
          <div v-if="showFee"><strong>FEE </strong>{{ props.row.fee }}</div>
          <div><strong>To </strong>{{ props.row.to_banking }}</div>
          <div><strong>Account </strong>{{ props.row.account }}</div>
          <div><strong>Name </strong>{{ props.row.name }}</div>
        </div>
      </el-table-column>
      <el-table-column min-width="100" prop="price" label="Price"/>
      <el-table-column min-width="150" prop="customer.name" label="Customer"/>
      <el-table-column min-width="120" label="status">
        <div slot-scope="props">
          <div class="mb-3">
            <badge v-if="props.row.status === 'success'" type="success">Success</badge>
            <badge v-if="props.row.status === 'cancel'" type="danger">Cancel</badge>
            <badge v-if="props.row.status === 'wait' || props.row.status === 'edit'" type="warning">Wait</badge>
          </div>
        </div>
      </el-table-column>
      <el-table-column v-if="role !== 'operation' && role !== 'customer'" min-width="100" label="Log">
        <div slot-scope="props">
          <p-button type="info" @click="$emit('GetLog', props.row.id)" size="sm" icon><i
            class="nc-icon nc-alert-circle-i"></i></p-button>
        </div>
      </el-table-column>
      <el-table-column min-width="200" label="Date">
        <div slot-scope="props">
          <span>Create:</span><br/>
          <span>{{ props.row.createdAt }}</span><br/>
          <span>Update:</span><br/>
          <span>{{ props.row.updatedAt }}</span><br/>
        </div>
      </el-table-column>
      <el-table-column min-width="250" v-if="role !== 'customer' && role !== 'agent'">
        <div slot-scope="props">
          <div v-if="props.row.status === 'wait' || (props.row.status !== 'wait' && role !== 'operation')">
            <p-button type="success" class="mr-2" @click="$emit('updateStatus', { id: props.row.id, status: 'success' })">Success
            </p-button>
            <p-button type="danger" @click="$emit('updateStatus', { id: props.row.id, status: 'cancel' })">Cancel
            </p-button>
          </div>
          <div v-if="props.row.status !== 'wait' &&props.row.status !== 'edit' && role === 'operation'">
            <p-button type="warning" @click="$emit('updateStatus', { id: props.row.id, status: 'edit' })">Edit
            </p-button>
          </div>
        </div>
      </el-table-column>
      <el-table-column v-if="role === 'admin' || role === 'manager'" min-width="160" label="ResendCallback">
        <div slot-scope="props">
          <p-button type="info" @click="$emit('ResendCallback', { id: props.row.id })">Resend</p-button>
        </div>
      </el-table-column>
    </el-table>
<!--    <modal v-if="role !== 'customer' && role !== 'agent'" :show.sync="modal_update.status">-->
<!--      <h4 slot="header" class="title title-up">Upload Image</h4>-->
<!--      <el-upload-->
<!--        class="upload-demo"-->
<!--        drag-->
<!--        accept="image/*"-->
<!--        :file-list="fileList"-->
<!--        :action="action_upload"-->
<!--        :headers="header_upload"-->
<!--        :on-success="onSuccess"-->
<!--        :before-upload="onBeforeUpload"-->
<!--        :on-error="onError"-->
<!--      >-->
<!--        <i class="el-icon-upload"></i>-->
<!--        <div class="el-upload__text">-->
<!--          Drop file here or <em>click to upload</em>-->
<!--        </div>-->
<!--      </el-upload>-->
<!--    </modal>-->
  </div>
</template>

<script>
import swal from "sweetalert2";

export default {
  name: "Withdraw",
  computed: {
    showFee(){
      return this.$route.path.indexOf('settlement') >= 0 ? true : false
    },
    convertData() {
      const mapData = this.data.map((value) => {
        value.price = isNaN(Number(value.price)) ? Number(value.price.replace(/,/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(value.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        value.mdr = isNaN(Number(value.mdr)) ? Number(value.mdr.replace(/,/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(value.mdr).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        value.createdAt = this.$moment(value.createdAt).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        value.updatedAt = this.$moment(value.updatedAt).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return value;
      });
      return mapData;
    },
    role() {
      console.log(this.$role)
      return this.$role
    }
  },
  props: ["data", "load_data"],
  data() {
    return {
      modal_image: {
        image: "",
        status: false,
      },
      modal_update: {
        status: false,
        form: {
          id: "",
          status: "",
          no_mdr: null,
          no_fee: null
        },
        image: null,
      },
      fileList: [],
    };
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (row.status == "wait") {
        if (
          new Date(new Date(row.updatedAt).getTime() + 10 * 60000).getTime() <=
          new Date().getTime()
        ) {
          return "warning-row";
        }
      }
      return "";
    },
    onBeforeUpload(file) {
      const isIMAGE =
        file.type === "image/jpeg" ||
        file.type === "image/gif" ||
        file.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 5;
      console.log(file.type);
      if (!isIMAGE) {
        swal.fire("Only PNG GIF JPG files are supported.", "", "error");
      }
      if (!isLt1M) {
        swal.fire(
          "The image file is larger than the specified size of 5MB.",
          "",
          "error"
        );
      }
      return isIMAGE && isLt1M;
    },
    editStatus(id, status) {
      if (status === "success") {
        this.modal_update.form.id = id;
        this.modal_update.form.status = status;
        this.modal_update.status = true;
      } else {
        const Modal = {
          id,
          status,
        };
        this.$emit("updateStatus", Modal);
      }
    },
    onSuccess(response, file) {
      const Model = {
        ...this.modal_update.form,
        image: response.filename,
      };
      this.$emit("updateStatus", Model);
      this.modal_update.form.id = "";
      this.modal_update.form.status = "";
      this.modal_update.status = false;
      this.fileList = [];
    },
    onError(err) {
      this.$notify({
        message: err.message,
        type: "danger",
      });
      this.modal_update.form.id = "";
      this.modal_update.form.status = "";
      this.modal_update.status = false;
      this.fileList = [];
    },
  },
};
</script>

<style lang="scss">
.el-table {
  color: #000000;
}

.el-table thead {
  color: #000000;
}

.el-table .warning-row {
  background-color: #dc3545 !important;
  color: white;

  td {
    background-color: #dc3545 !important;
  }
}
</style>
