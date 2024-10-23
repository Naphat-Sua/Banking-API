<template>
<h1></h1>
 <!-- <div>-->
<!--    <div class="row">-->
<!--      <div class="col-sm-12 col-md-12">-->
<!--        <h2>This Month</h2>-->
<!--        <DashboardSum :dataDash="dataDashBoard" />-->
<!--      </div>-->
<!--      <div class="col-sm-12 col-md-4">-->
<!--        <h2>Deposit This Year</h2>-->
<!--        <ChartCard :chartData="chartData" />-->
<!--      </div>-->
<!--      <div class="col-sm-12 col-md-4">-->
<!--        <h2>Withdraw This Year</h2>-->
<!--        <ChartCard :chartData="chartData_withdraw" />-->
<!--      </div>-->
<!--      <div class="col-sm-12 col-md-4">-->
<!--        <h2>Settlement This Year</h2>-->
<!--        <ChartCard :chartData="chartData_settlement" />-->
<!--      </div>-->
<!--    </div>-->
<!--  </div> -->
</template>

<script>
import DashboardSum from "@/components/CustomComponent/DashboardSum";
import ChartCard from "@/components/UIComponents/Cards/ChartCard";
export default {
  name: "Dashboard",
  components: {
    DashboardSum,
    ChartCard,
  },
  data() {
    return {
      dataDashBoard: [],
      chartData: {
        labels: [],
        series: [],
      },
      chartData_withdraw: {
        labels: [],
        series: [],
      },
      chartData_settlement: {
        labels: [],
        series: [],
      },
    };
  },
  methods: {
    callApi(queryStringYear, labels, index, url, fordata) {
      return new Promise((rest) => {
        this.$callapi
          .callAPIHandler(this.axios.get(url, { params: queryStringYear }))
          .then((Result) => {
            if (Result.data) {
              if (fordata == "deposit") {
                if (this.chartData.labels[index]) {
                  this.chartData.labels[index] = labels;
                  this.chartData.series[index] = Result.data.totalAmount;
                } else {
                  this.chartData.labels.push(labels);
                  this.chartData.series.push(Result.data.totalAmount);
                }
              } else if (fordata == "settlement") {
                if (this.chartData_settlement.labels[index]) {
                  this.chartData_settlement.labels[index] = labels;
                  this.chartData_settlement.series[index] =
                    Result.data.totalAmount;
                } else {
                  this.chartData_settlement.labels.push(labels);
                  this.chartData_settlement.series.push(
                    Result.data.totalAmount
                  );
                }
              } else {
                if (this.chartData_withdraw.labels[index]) {
                  this.chartData_withdraw.labels[index] = labels;
                  this.chartData_withdraw.series[index] =
                    Result.data.totalAmount;
                } else {
                  this.chartData_withdraw.labels.push(labels);
                  this.chartData_withdraw.series.push(Result.data.totalAmount);
                }
              }
              rest(true);
            } else {
              rest(false);
            }
          });
      });
    },
  },
  async mounted() {
    if (localStorage.getItem("dashborad_deposit")) {
      this.chartData = JSON.parse(localStorage.getItem("dashborad_deposit"));
    }

    if (localStorage.getItem("dashborad_withdraw")) {
      this.chartData_withdraw = JSON.parse(
        localStorage.getItem("dashborad_withdraw")
      );
    }

    if (localStorage.getItem("dashborad_settlement")) {
      this.chartData_settlement = JSON.parse(
        localStorage.getItem("dashborad_settlement")
      );
    }
    var date = new Date();

    const queryString = {};

    queryString.from_create = this.$moment(
      new Date(date.getFullYear(), date.getMonth(), 1)
    ).format("YYYY-MM-DD");

    queryString.to_create = this.$moment(
      new Date(date.getFullYear(), date.getMonth() + 1, 0)
    ).format("YYYY-MM-DD");

    this.$callapi
      .callAPIHandler(
        this.axios.get(this.$api.deposit.total, { params: queryString })
      )
      .then((Result) => {
        if (Result.data && Result.data.total_amount !== null) {
          this.dataDashBoard.push({
            title: Result.data.total_amount.toString(),
            smalltitle: "Deposit",
            icon: "fi flaticon-taxes",
            type: "danger",
          });

          this.dataDashBoard.push({
            title: Result.data.totalMdr.toString(),
            smalltitle: "Deposit MDR",
            icon: "fi flaticon-taxes",
            type: "danger",
          });

          this.dataDashBoard.push({
            title: Result.data.totalNetamount.toString(),
            smalltitle: "Net Deposit",
            icon: "fi flaticon-taxes",
            type: "danger",
          });
        }
      });

    this.$callapi
      .callAPIHandler(
        this.axios.get(this.$api.settlement.total, { params: queryString })
      )
      .then((Result) => {
        if (Result.data) {
          this.dataDashBoard.push({
            title: Result.data.totalAmount
              ? Result.data.totalAmount.toString()
              : "0",
            smalltitle: "Settlement",
            icon: "fi flaticon-taxes",
            type: "danger",
          });

          this.dataDashBoard.push({
            title: Result.data.totalMdr ? Result.data.totalMdr.toString() : "0",
            smalltitle: "Settlement MDR",
            icon: "fi flaticon-taxes",
            type: "danger",
          });

          this.dataDashBoard.push({
            title: Result.data.totalNetamount
              ? Result.data.totalNetamount.toString()
              : "0",
            smalltitle: "Net Settlement",
            icon: "fi flaticon-taxes",
            type: "danger",
          });
        }
      });

    this.$callapi
      .callAPIHandler(
        this.axios.get(this.$api.withdraw.total, { params: queryString })
      )
      .then((Result) => {
        if (Result.data && Result.data.total_amount !== null) {
          this.dataDashBoard.push({
            title: Result.data.total_amount.toString(),
            smalltitle: "Withdraw",
            icon: "fi flaticon-taxes",
            type: "danger",
          });

          this.dataDashBoard.push({
            title: Result.data.totalMdr.toString(),
            smalltitle: "Withdraw MDR",
            icon: "fi flaticon-taxes",
            type: "danger",
          });

          this.dataDashBoard.push({
            title: Result.data.totalNetamount.toString(),
            smalltitle: "Net Withdraw",
            icon: "fi flaticon-taxes",
            type: "danger",
          });
        }
      });

    for (let index = 0; index < 12; index++) {
      var queryStringYear = {};

      var labels = this.$moment(new Date(date.getFullYear(), index, 1)).format(
        "YYYY-MM"
      );

      queryStringYear.from_create = this.$moment(
        new Date(date.getFullYear(), index, 1)
      ).format("YYYY-MM-DD");

      queryStringYear.to_create = this.$moment(
        new Date(date.getFullYear(), index + 1, 0)
      ).format("YYYY-MM-DD");

      await this.callApi(
        queryStringYear,
        labels,
        index,
        this.$api.deposit.total,
        "deposit"
      );

      if (index == 11) {
        localStorage.setItem(
          "dashborad_deposit",
          JSON.stringify(this.chartData)
        );
      }
    }

    for (let index = 0; index < 12; index++) {
      var queryStringYear = {};

      var labels = this.$moment(new Date(date.getFullYear(), index, 1)).format(
        "YYYY-MM"
      );

      queryStringYear.from_create = this.$moment(
        new Date(date.getFullYear(), index, 1)
      ).format("YYYY-MM-DD");

      queryStringYear.to_create = this.$moment(
        new Date(date.getFullYear(), index + 1, 0)
      ).format("YYYY-MM-DD");

      await this.callApi(
        queryStringYear,
        labels,
        index,
        this.$api.withdraw.total,
        "withdraw"
      );

      if (index == 11) {
        localStorage.setItem(
          "dashborad_withdraw",
          JSON.stringify(this.chartData_withdraw)
        );
      }
    }

    for (let index = 0; index < 12; index++) {
      var queryStringYear = {};

      var labels = this.$moment(new Date(date.getFullYear(), index, 1)).format(
        "YYYY-MM"
      );

      queryStringYear.from_create = this.$moment(
        new Date(date.getFullYear(), index, 1)
      ).format("YYYY-MM-DD");

      queryStringYear.to_create = this.$moment(
        new Date(date.getFullYear(), index + 1, 0)
      ).format("YYYY-MM-DD");

      await this.callApi(
        queryStringYear,
        labels,
        index,
        this.$api.settlement.total,
        "settlement"
      );

      if (index == 11) {
        localStorage.setItem(
          "dashborad_settlement",
          JSON.stringify(this.chartData_settlement)
        );
      }
    }
  },
};
</script>

<style scoped>
</style>
