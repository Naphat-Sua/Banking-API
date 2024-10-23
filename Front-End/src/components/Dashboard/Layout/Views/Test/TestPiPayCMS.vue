<template>
    <div>
      <!-- Các trường dữ liệu để tạo request -->
      <!-- Ví dụ, bạn có thể sử dụng v-model để gán giá trị từ form vào data -->
      <input v-model="data.merNo" />
      <input v-model="data.transType" />
      <input v-model="data.amount" />
      <!-- ... các trường dữ liệu khác ... -->
  
      <!-- Nút để gọi hàm tạo request và gửi POST request -->
      <button @click="sendPostRequest">Gửi thanh toán</button>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        data: {
          merNo: "ceshi01",
          transType: "sales",
          amount: "80.99",
          currency: "840",
          tradeNo: "1644293072507",
          siteUrl: "www.yourshop.com",
          webInfo: "userAgent:Mozilla/5.0 (Windows NT 6.3; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",
          billAddrCountry: "KH",
          billAddrState: "Phnom Penh",
          billAddrCity: "7Makara",
          billAddress1: "#20, Veal Vong",
          billAddrPostCode: "120307",
          payIP: "8.8.8.8",
          shipAddrCountry: "KH",
          shipAddrState: "Phnom Penh Sen Sok",
          shipAddrCity: "Phnom Penh Sen Sok",
          shipAddress1: "#17, Street 598",
          shipAddrPostCode: "1204050",
          pan: "4000000000000000",
          callback: "http://www.yourcallback.com",
          successUrl: "http://www.yoursuccessurl.com",
          failUrl: "http://www.yourfailurl.com",
          agentNo: "",
          oderDate: "",
          PaymentMethod: "",
          description: "",
          digest: "", // Chuỗi digest sẽ được gán vào đây
        },
        key: "12345678", // Khóa bí mật
      };
    },
    methods: {
      async sendPostRequest() {
        try {
          // Bước 1: Tạo chuỗi "k1=v1&k2=v2&..." từ các tham số và giá trị
          const paramString = Object.keys(this.data)
            .sort()
            .map((key) => `${key}=${this.data[key]}`)
            .join("&");
  
          // Bước 2: Mã hóa chuỗi đã sắp xếp bằng thuật toán SHA256
          const toBeHashed = `${paramString}&key=${this.key}`;
          const sha256 = require("crypto").createHash("sha256");
          sha256.update(toBeHashed);
          const digest = sha256.digest("hex");
  
          // Cập nhật giá trị của digest vào data
          this.data.digest = digest;
  
          // Gửi POST request
          const url = "https://cmsapi-sit.pipay.com/gateway/checkout.do";
          const response = await axios.post(url, this.data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          // Xử lý kết quả từ response nếu cần
          console.log("Response data:", response.data);
        } catch (error) {
          console.error("Error sending POST request:", error);
          // Xử lý lỗi nếu có
        }
      },
    },
  };
  </script>
  