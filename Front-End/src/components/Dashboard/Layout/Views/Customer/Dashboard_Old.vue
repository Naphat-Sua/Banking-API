<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <h2>This Month</h2>
        <DashboardSum dclass="col-sm-12 col-md-2dot5" :dataDash="dataDashBoard" :lastUpdate="last_update_balance"/>
      </div>
      <!-- <div v-if="datathism" class="col-sm-12 col-md-12 text-center">
        <h2>Deposit This Month</h2>
        <h2>{{datathism.totalAmount ? new Number(parseFloat(datathism.totalAmount).toFixed(2)).toLocaleString():'0.00'}}</h2>
      </div> -->
      <div class="col-sm-12 col-md-12">
        <hr>
        <ChartCard
          v-if="!loadchart && loadcharterror == null"
          :chartData="chartData"
          :chartOptions="option"
          chartType="line"
        ></ChartCard>
        <h3 v-else-if="loadcharterror != null" class="text-center">
          Error Load Data Chart {{ loadcharterror }}. Please try again.
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardSum from "@/components/CustomComponent/DashboardSum";
import ChartCard from "@/components/UIComponents/Cards/ChartCard";

export default {
  name: "CustomerDashboardPage",
  components: {
    DashboardSum,
    ChartCard,
  },
  data() {
    return {
      // datathism:null,
      loadcharterror: null,
      loadchart: true,
      chartData: {
        labels: [],
        datasets: [
          {
            fill: false,
            label: "Deposit",
            borderColor: "#2685C4",
            backgroundColor: "#2685C4",
            data: [],
          },
          {
            fill: false,
            label: "Withdraw",
            borderColor: "#f96332",
            backgroundColor: "#f96332",
            data: [],
          },
          {
            fill: false,
            label: "Settlement",
            borderColor: "#420420",
            backgroundColor: "#420420",
            data: [],
          },
          {
            fill: false,
            label: "MDR",
            borderColor: "#E7C90B",
            backgroundColor: "#E7C90B",
            data: [],
          },
        ],
      },
      last_update_balance: null,
      option: {
        responsive: true,
        title: {
          display: true,
        },
        legend: {
          display: true,
        },
        tooltips: {
          mode: "point",
        },
        intersect: true,
        hover: {
          mode: "point",
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Day Of Month",
              },
            },
          ],
          yAxes: [
            {
              // stacked: true,
              scaleLabel: {
                display: true,
                labelString: "Amount",
              },
            },
          ],
        },
      },
      dataDashBoard: [],
      // rawchartData: [
      //   {
      //     total_deposit: 23437.17,
      //     total_withdraw: 31341.38,
      //     total_settlement: 18032.11,
      //     total_mdr: 91963.35,
      //     days: "2020-07-22",
      //   },
      //   {
      //     total_deposit: 42252.87,
      //     total_withdraw: 47690.09,
      //     total_settlement: 27234.88,
      //     total_mdr: 42374.37,
      //     days: "2019-12-26",
      //   },
      //   {
      //     total_deposit: 54402.79,
      //     total_withdraw: 51324.16,
      //     total_settlement: 96225.94,
      //     total_mdr: 52864.59,
      //     days: "2019-11-08",
      //   },
      //   {
      //     total_deposit: 17840.45,
      //     total_withdraw: 67097.3,
      //     total_settlement: 40820.21,
      //     total_mdr: 82970.89,
      //     days: "2020-03-02",
      //   },
      //   {
      //     total_deposit: 4233.79,
      //     total_withdraw: 80571.73,
      //     total_settlement: 52243.76,
      //     total_mdr: 62873.49,
      //     days: "2020-03-14",
      //   },
      //   {
      //     total_deposit: 61413.52,
      //     total_withdraw: 86968.52,
      //     total_settlement: 98122.31,
      //     total_mdr: 47106.57,
      //     days: "2020-03-27",
      //   },
      //   {
      //     total_deposit: 85759.21,
      //     total_withdraw: 87950.3,
      //     total_settlement: 93223.51,
      //     total_mdr: 95349.03,
      //     days: "2020-04-17",
      //   },
      //   {
      //     total_deposit: 727.11,
      //     total_withdraw: 48082.26,
      //     total_settlement: 76140.43,
      //     total_mdr: 22574.16,
      //     days: "2020-03-10",
      //   },
      //   {
      //     total_deposit: 84162.69,
      //     total_withdraw: 87660.7,
      //     total_settlement: 43224.98,
      //     total_mdr: 37174.1,
      //     days: "2020-02-03",
      //   },
      //   {
      //     total_deposit: 59664.08,
      //     total_withdraw: 63848.62,
      //     total_settlement: 21860.73,
      //     total_mdr: 60565.82,
      //     days: "2020-10-15",
      //   },
      // ],
    };
  },
  methods: {},
  async mounted() {

    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var queryString = {
      from_create: this.$moment(new Date(y, m, 1)).format('YYYY-MM-DD'),
      to_create: this.$moment(new Date(y, m + 1, 0)).format('YYYY-MM-DD')
    }

    // this.$callapi.callAPIHandler(this.axios.get(this.$api.deposit.total, {params: queryString})).then(Result=>{
    //   if(Result.data){
    //     this.datathism = Result.data
    //   }
    // })

    var rawdata = await this.$callapi
      .callAPIHandler(this.axios.get(this.$api.dashboard.totalboxmonth))
      .then((Result) => {
        return Result.data;
      });

    this.last_update_balance = rawdata.updatedAt

    this.dataDashBoard.push({
      title: !isNaN(Number(rawdata.total_deposit)) ? Number(rawdata.total_deposit).toFixed(2) : "0.00",
      smalltitle: "Total Deposit",
      icon: "fi flaticon-budget",
      type: "danger",
    });

    this.dataDashBoard.push({
      title: !isNaN(Number(rawdata.total_withdraw)) ? Number(rawdata.total_withdraw).toFixed(2) : "0.00",
      smalltitle: "Total Withdraw",
      icon: "fi flaticon-withdrawal",
      type: "danger",
    });

    this.dataDashBoard.push({
      title: !isNaN(Number(rawdata.total_mdr)) ? Number(rawdata.total_mdr).toFixed(2) : "0.00",
      smalltitle: "Total MDR",
      icon: "fi flaticon-taxes",
      type: "danger",
    });

    this.dataDashBoard.push({
      title: !isNaN(Number(rawdata.total_fee)) ? Number(rawdata.total_fee).toFixed(2) : "0.00",
      smalltitle: "Total Fee",
      icon: "fi flaticon-deposit-1",
      type: "danger",
    });

    this.dataDashBoard.push({
      title: !isNaN(Number(rawdata.balance)) ? Number(rawdata.balance).toFixed(2) : "0.00",
      smalltitle: "Balance",
      icon: "fi flaticon-deposit-1",
      type: "danger",
    });

    var rawchartData = await this.$callapi
      .callAPIHandler(this.axios.get(this.$api.dashboard.chart))
      .then((Result) => {
        return Result.data;
      });
    if (rawchartData) {
      rawchartData.forEach((item, index) => {
        this.chartData.labels.push(item.days);
        this.chartData.datasets[0].data.push(item.total_deposit);
        this.chartData.datasets[1].data.push(item.total_withdraw);
        this.chartData.datasets[2].data.push(item.total_settlement);
        this.chartData.datasets[3].data.push(item.total_mdr);
        if (rawchartData.length - 1 == index) {
          this.loadchart = false;
        }
      });
    } else {
      this.loadchart = false;
      this.loadcharterror = "Time Out";
    }
  },
};
</script>

<style scoped>
</style>
