<template>
  <div>
    <card>
      <div slot="header">
        <h4>
          Search Merchant
        </h4>
        <div class="row">
          <fg-input class="col-sm-12 col-md-4" label="MerchantID" placeholder=" Merchant ID" v-model="search.query.merchantId"/>
          <fg-input class="col-sm-12 col-md-4" label="Merchant Name" placeholder="Merchanr Name" v-model="search.query.merchantName"/>
          <!-- <fg-input class="col-sm-12 col-md-4" label="Banktype">
            <el-select class="select-default"
                       placeholder="Select Banktype"
                       v-model="search.query.banktype_id">
              <el-option v-for="option in select.banktype"
                         class="select-default"
                         :value="option.value"
                         :label="option.label"
                         :key="option.label">
              </el-option>
            </el-select>
          </fg-input> -->
        </div>
        <div>
          <p-button @click.native="getSearch" type="primary">Search</p-button>
          <p-button @click.native="resetSearch" type="danger">Reset</p-button>
        </div>
      </div>
    </card>
    <card>
      <div slot="header">
        <h4>List Merchant</h4>
      </div>
      <div class="row" style="padding: 15px">
        <fg-input label="Rows" v-model="perPage" class="col-sm-2" type="number"></fg-input>
        <p-button @click="ChangeModal({type: 'add'})" type="info" icon class="col-sm-1 ml-auto">
          <i class="nc-icon nc-simple-add"></i>
        </p-button>
      </div>
      <Merchant :data="data" :load_data="load_data" @update="ChangeModal" @manage="show_manage"
                   @updateban="update_ban"/>
      <div class="row">
        <div class="ml-auto mr-auto">
          <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
        </div>
      </div>
    </card>
    <modal :show.sync="modal.show" headerClasses="justify-content-center" @close="CloseModal">
      <h4 slot="header" class="title title-up">{{ modal.title }}</h4>
      <div v-loading="from_loading">
        <AddMerchant :value.sync="modal.data" />
      </div>
      <div slot="footer" v-loading="from_loading">
        <p-button @click.native="onSubmit" type="info">Submit</p-button>
        <p-button type="danger" @click.native="ChangeModal">Close</p-button>
      </div>
    </modal>
    <!-- <modal :show.sync="modal_customer.show" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">USE in customer</h4>
      <card v-loading="modal_customer.loading">
        <h5 slot="header">Add Customer</h5>
        <el-select class="select-default"
                   placeholder="Select Customer"
                   v-model="modal_customer.customer_id">
          <el-option v-for="option in select_customer"
                     class="select-default"
                     :value="option.value"
                     :label="option.label"
                     :key="option.label">
          </el-option>
        </el-select>
        <div slot="footer">
          <p-button @click.native="addManageCustomer" type="success">Submit</p-button>
          <p-button type="danger" @click.native="resetManageCustomer">Reset</p-button>
        </div>
      </card>
      <el-table stripe border v-loading="modal_customer.loading"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="modal_customer.data.customer">
        <el-table-column prop="customer.name" label="Customer"/>
        <el-table-column>
          <div slot-scope="props">
            <p-button @click="deleteCustomerAccountBank(props.row.id)" type="danger">Delete</p-button>
          </div>
        </el-table-column>
      </el-table>
    </modal> -->
  </div>
</template>

<script>
import AddMerchant from '../../../CustomComponent/CreditCard/AddMerchant.vue'
import Merchant from '../../../CustomComponent/CreditCard/Merchant.vue'

export default {
    // name: "AdminAccountBankPage",
    // computed: {
    //     select_customer() {
    //         const result = [];
    //         for (const x of this.select.customer) {
    //             const findIndex = this.modal_customer.data.customer.findIndex(value => value.customer && value.customer.id === x.id);
    //             if (findIndex < 0) {
    //                 result.push(x);
    //             }
    //         }
    //         return result;
    //     }
    // },
    mounted() {
        this.getData();
      //  this.getBank();
      //  this.getCustomer();
    },
    data() {
        return {
            data: [],
            load_data: false,
            totalRows: 1000,
            perPage: 20,
            page: 1,
            select: {
                banktype: [],
                customer: []
            },
            modal_customer: {
                loading: false,
                show: false,
                customer_id: null,
                accountbank_id: null,
                data: {
                    customer: []
                }
            },
            modal: {
                title: '',
                type: '',
                show: false,
                data: {
                    merchantId: '',
                    apiKey: '',
                    merchantName: '',
                    merchantUrl: '',
                    email: '',
                    password: '',
                    lineId: '',
                    telegramId: '',
                   }
            },
            search: {
                query: {
                   merchantId: '',
                   merchantName: '',
                 }
            },
            from_loading: false
        };
    },
    methods: {
        async update_ban(data) {
            const result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.accountbank.edit, {
                id: data.id,
                use: data.use ? true : false
            }));
            if (result.data) {
                this.$notify({
                    message: `${data.use ? 'Use' : 'Not use'} accountbank success`,
                    type: 'success'
                });
            }
        },
        async deleteCustomerAccountBank(id) {
            const result = await this.$callapi.callAPIHandler(this.axios.delete(`${this.$api.accountbank.customer.delete}/${id}`));
            this.show_manage(this.modal_customer.accountbank_id);
        },
        async show_manage(id) {
            this.modal_customer.loading = true;
            this.modal_customer.accountbank_id = id;
            this.modal_customer.show = true;
            const result = await this.$callapi.callAPIHandler(this.axios.post(this.$api.accountbank.customer.get, { id }));
            if (result.data) {
                this.modal_customer.data.customer = result.data;
            }
            this.modal_customer.loading = false;
        },
        async addManageCustomer() {
            this.modal_customer.customer_id = Number(this.modal_customer.customer_id);
            this.modal_customer.accountbank_id = Number(this.modal_customer.accountbank_id);
            const result = await this.$callapi.callAPIHandler(this.axios.post(this.$api.accountbank.customer.add, {
                account_id: this.modal_customer.accountbank_id,
                customer_id: this.modal_customer.customer_id
            }));
            if (result.data) {
                this.show_manage(this.modal_customer.accountbank_id);
                this.modal_customer.customer_id = null;
            }
        },
        resetManageCustomer() {
            this.modal_customer.customer_id = null;
        },
        getSearch() {
            this.getData();
        },
        resetSearch() {
            this.search.query = {
                merchantId: '',
                merchantName: '',
            };
            this.getData();
        },
        async getData() {
            this.load_data = true;
            const queryString = {
                rows: this.perPage,
                page: this.page
            };
            if (this.search.query.merchantId) {
                queryString.merchantId = this.search.query.merchantId;
            }
            if (this.search.query.merchantName) {
                queryString.merchantName = this.search.query.merchantName;
            }
            const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.creditcard.get, { params: queryString }));
            if (Result.data) {
                this.totalRows = Result.data.count;
                this.data = Result.data.data;
               // console.log('merchant=', this.data);
            }
            this.load_data = false;
        },
        async getCustomer() {
            const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.customer));
            if (Result.data) {
                this.select.customer = Result.data;
                this.modal.customer = Result.data;
                this.modal.customer.unshift({
                    label: 'Not Match Customer',
                    value: null
                });
            }
        },
        async getBank() {
            const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.credit.get));
            if (Result.data) {
                this.select.banktype = Result.data;
            }
        },
        async onDelete(id) {
            const Result = await this.$callapi.callAPIHandler(this.axios.delete(this.$api.accountbank.delete + `/${id}`));
            if (Result.data === '') {
                this.$notify({
                    message: 'Delete Manage success',
                    type: 'success'
                });
                this.getData();
            }
        },
        CloseModal() {
            this.modal.show = false;
            this.modal.data = {
              merchantId: '',
              apiKey: '',
              merchantName: '',
              merchantUrl: '',
              lineId: '',
              telegramId: '',
            };
        },
        onSubmit() {
            if (this.modal.type === 'add') {
                this.onSubmitAddMerchant();
            }
            if (this.modal.type === 'edit') {
                this.onSubmitEdit();
            }
        },
        async onSubmitAddMerchant() {
            this.from_loading = true;
           // this.modal.data.banktype_id = Number(this.modal.data.banktype_id);
           // this.modal.data.promptpay = this.modal.data.promptpay ? this.modal.data.promptpay : null;
           // console.log('add merchant='+this.$api.creditcard.add);
            const Result = await this.$callapi.callAPIHandler(this.axios.post(this.$api.creditcard.add, this.modal.data));
           console.log('add merchant status='+Result.data);
            if (Result.data) {
                this.$notify({
                    message: 'Add Merchant Success',
                    type: 'success'
                });
                this.getData();
            }
            this.from_loading = false;
            this.CloseModal();
        },
        async onSubmitEdit() {
            this.from_loading = true;
            this.modal.data.banktype_id = Number(this.modal.data.banktype_id);
            this.modal.data.promptpay = this.modal.data.promptpay ? this.modal.data.promptpay : null;
            const Result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.creditcard.edit, this.modal.data));
            if (Result.data) {
                this.$notify({
                    message: 'Edit AccountBank Success',
                    type: 'success'
                });
                this.getData();
            }
            this.from_loading = false;
            this.CloseModal();
        },
        ChangeModal(data) {
            this.modal.show = !this.modal.show && (data && data.type === 'delete') ? false : true;
            this.modal.type = data && data.type ? data.type : null;
            this.modal.title = data && data.type === 'add' ? 'Add Merchant' : data && data.type === 'edit' ? 'Edit Merchant' : '';
            if (data && data.type === 'edit') {
                this.modal.data = data.data;
                this.modal.data.banktype_id = data.data && data.data.type ? data.data.type.id : null;
                this.modal.data.use = data.data.use ? true : false;
            }
            else if (data && data.type === 'add') {
                delete this.modal.data.id;
            }
            else if (data && data.type === 'delete') {
                this.onDelete(data.data.id);
            }
            else {
                this.$notify({
                    message: 'Error not type',
                    type: 'danger'
                });
            }
        },
        UpdateData(data) {
            if (data) {
                if (data.type === 'typebank') {
                    this.modal.data.banktype_id = data.banktype_id;
                }
            }
        }
    },
    watch: {
        page(New) {
            this.getData();
        },
        perPage(New) {
            this.getData();
        }
    },
    components: { AddMerchant , Merchant}
}
</script>

<style scoped>

</style>
