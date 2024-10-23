<template>
  <div>
    <card>
      <div slot="header">
        <h4>Manager</h4>
      </div>
      <div class="row" style="padding: 15px">
        <fg-input label="Rows" v-model="perPage" class="col-sm-2" type="number"></fg-input>
        <p-button type="info" @click="ChangeModal({type: 'add'})" icon class="col-sm-1 ml-auto"><i
          class="nc-icon nc-simple-add"></i></p-button>
      </div>
      <Manager :data.sync="data" :load_data="load_data" @update="ChangeModal" @delete="onDelete"
               @updateban="update_ban"/>
      <div class="row">
        <div class="ml-auto mr-auto">
          <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
        </div>
      </div>
    </card>
    <modal :show.sync="modal.show" @close="CloseModal">
      <h4 slot="header" class="title title-up">{{ modal.title }}</h4>
      <AddManager :data.sync="modal.form"/>
      <div slot="footer">
        <p-button @click="onSubmit" type="success">Submit</p-button>
        <p-button @click="CloseModal" type="danger">Cancel</p-button>
      </div>
    </modal>
  </div>
</template>

<script>
import Manager from "../../../CustomComponent/Users/Users";
import AddManager from "../../../CustomComponent/Users/AddUsers";

export default {
  name: "AdminManagerPage",
  components: {
    Manager,
    AddManager
  },
  mounted() {
    this.getData()
  },
  data() {
    return {
      totalRows: 1000,
      perPage: 20,
      page: 1,
      data: [],
      load_data: false,
      modal: {
        title: '',
        type: '',
        show: false,
        form: {
          id: '',
          username: '',
          password: '',
          name: '',
          phone: '',
          email: '',
          ban: false
        }
      }
    }
  },
  methods: {
    async getData() {
      this.load_data = true
      const queryString = {
        rows: this.perPage,
        page: this.page
      }
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.manager.get, {params: queryString}))
      if (Result.data) {
        this.totalRows = Result.data.count
        this.data = Result.data.data
      }
      this.load_data = false
    },
    async update_ban(data) {
      const result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.manager.edit, data))
      if (result.data) {
        this.$notify({
          message: `${data.ban ? 'Ban' : 'Unban'} manager success`,
          type: 'success'
        })
      }
    },
    onSubmit() {
      if (this.modal.type === 'add') {
        this.onSubmitAdd()
      }
      if (this.modal.type === 'edit') {
        this.onSubmitEdit()
      }
    },
    async onSubmitAdd() {
      const Result = await this.$callapi.callAPIHandler(this.axios.post(this.$api.manager.add, this.modal.form))
      if (Result.data) {
        this.$notify({
          message: 'Add Manage success',
          type: 'success'
        })
        this.CloseModal()
        this.getData()
      }
    },
    async onSubmitEdit() {
      const Result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.manager.edit, this.modal.form))
      if (Result.data) {
        this.$notify({
          message: 'Edit Manage success',
          type: 'success'
        })
        this.getData()
      }
      this.CloseModal()
    },
    async onDelete(id) {
      const Result = await this.$callapi.callAPIHandler(this.axios.delete(this.$api.manager.delete + `/${id}`))
      if (Result.data === '') {
        this.$notify({
          message: 'Delete Manage success',
          type: 'success'
        })
        this.getData()
      }
    },
    ChangeModal(data) {
      this.modal.show = !this.modal.show
      this.modal.type = data.type
      this.modal.title = data.type === 'add' ? 'Add Users' : data.type === 'edit' ? 'Edit Users' : ''
      if (data && data.type === 'add') {
        delete this.modal.form.id
      } else if (data && data.type === 'edit') {
        this.modal.form = {
          ...data.data,
          password: '',
          ban: data.data.ban ? true : false
        }
      } else {
        this.modal.form = {
          id: '',
          username: '',
          password: '',
          name: '',
          phone: '',
          email: '',
          ban: false
        }
      }
    },
    CloseModal() {
      this.modal.show = false
      this.modal.type = ''
      this.modal.form = {
        id: '',
        username: '',
        password: '',
        name: '',
        phone: '',
        email: '',
        ban: false
      }
    },
  },
  watch: {
    page(New) {
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>
