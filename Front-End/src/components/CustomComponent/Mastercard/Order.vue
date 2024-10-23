<template>
  <div>
    <div class="card-body row">
      <div class="col-sm-12">
        <el-table
          stripe
          v-loading="load_data"
          element-loading-text="Loading..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="convertData"
          :row-class-name="tableRowClassName"
        >
          <el-table-column min-width="100" prop="id" label="ID"/>
          <el-table-column min-width="120" label="Account">
            <div slot-scope="props">
              <strong>{{ props.row.bank }}</strong>
              <div>{{ props.row.account }}</div>
            </div>
          </el-table-column>
          <el-table-column min-width="120" prop="customer.name" label="User"/>
          <el-table-column min-width="120" prop="orderid" label="Order ID"/>
          <el-table-column min-width="170" label="Price">
            <div slot-scope="props">
              <div><strong>Amount:</strong></div>
              <div>{{ props.row.price }}</div>
              <div><strong>MDR:</strong></div>
              <div>{{ props.row.mdr }}</div>
            </div>
          </el-table-column>
          <el-table-column min-width="150" label="FromAccount">
            <div slot-scope="props">
              <div v-if="props.row.from_account">
                <strong>ACC </strong>
                {{ props.row.from_account }}
              </div>
              <div v-if="props.row.from_bank">
                <strong>Bank </strong>
                {{ props.row.from_bank }}
              </div>
              <div v-if="props.row.from_name">
                <strong>Name </strong>
                {{ props.row.from_name }}
              </div>
            </div>
          </el-table-column>
          <el-table-column min-width="100" label="status">
            <div slot-scope="props">
              <badge v-if="props.row.status === 'success'" type="success">
                Success
              </badge>
              <badge v-if="props.row.status === 'cancel' || props.row.status === 'refund'" type="danger">
                {{ props.row.status }}
              </badge>
              <badge v-if="props.row.status === 'wait' || props.row.status === 'edit'" type="warning">
                {{ props.row.status }}
              </badge>
            </div>
          </el-table-column>
          <el-table-column min-width="80" label="Log" v-if="role === 'admin' || role === 'manager'">
            <div slot-scope="props">
              <p-button
                type="info"
                @click="$emit('GetLog', props.row.id)"
                size="sm"
                icon
              ><i class="nc-icon nc-alert-circle-i"></i
              ></p-button>
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
                <p-button type="success"
                          @click=" $emit('updateStatus', {id: props.row.id,status: 'success',})">
                  Success
                </p-button>
                <p-button type="danger"
                          @click="showbox({id: props.row.id,status: 'cancel',})">
                  Cancel
                </p-button>
                <p-button type="warning"
                          v-if="role === 'admin' || role === 'manager'"
                          @click="showbox({id: props.row.id,status: 'refund',})">
                  Refund
                </p-button>
              </div>
              <div v-if="props.row.status !== 'wait' && props.row.status !== 'edit' &&role === 'operation'">
                <p-button
                  type="warning"
                  @click="$emit('updateStatus', { id: props.row.id, status: 'edit' })">
                  Edit
                </p-button>
              </div>
            </div>
          </el-table-column>
          <el-table-column
            v-if="role === 'admin' || role === 'manager'"
            min-width="200"
            label="ResendCallback"
          >
            <div slot-scope="props">
              <p-button
                type="info"
                @click="$emit('ResendCallback', { id: props.row.id })">
                Resend
              </p-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <modal :show.sync="show_box_comment">
      <div slot="header" class="title title-up">Comment</div>
      <fg-input placeholder="Timeout" v-model="form_data.comment"></fg-input>
      <template slot="footer">
        <p-button type="success" @click.native="update_status">Submit</p-button>
        <p-button type="danger" @click.native="closebox">Close</p-button>
      </template>
    </modal>
  </div>
</template>

<script>
export default {
  name: "Deposit",
  props: ["data", "load_data"],
  data() {
    return {
      show_box_comment: false,
      form_data: {
        id: null,
        status: null,
        comment: null
      }
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      const timeRed = this.$env.indexOf('uniipay') >= 0 ? 30000 : 60000
      if (row.status == "wait") {
        if (
          new Date(new Date(row.updatedAt).getTime() + 10 * timeRed).getTime() <=
          new Date().getTime()
        ) {
          return "warning-row";
        }
      }
      return "";
    },
    showbox(data) {
      this.form_data.id = data.id
      this.form_data.status = data.status
      this.show_box_comment = true
    },
    update_status() {
      this.$emit('updateStatus', this.form_data)
      this.closebox()
    },
    closebox() {
      this.show_box_comment = false
      this.form_data = {
        id: null,
        status: null,
        comment: null
      }
    }
  },
  computed: {
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
      return this.$role
    }
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
