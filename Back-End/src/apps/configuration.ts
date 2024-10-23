export default () => ({
    env: process.env.ENV,
    env_mcpayment: process.env.MCPAYMENT_ENV,
    domain: process.env.DOMAIN,
    baseURL: process.env.BASEURL,
    baseURLBanking: process.env.BASEURL_BANKING,
    autoWithdraw: process.env.AUTO_WITHDRAW,
    redirectURL: process.env.REDIRECTURL,
    port: parseInt(process.env.PORT, 10),
    redirect_mcpayment: process.env.REDIRECTURL_MCPAYMENT,
    timeout_order: {
        deposit: process.env.TIMEOUTORDER_DEPOSIT,
        withdraw: process.env.TIMEOUTORDER_WITHDRAW
    },
    database: {
        type: process.env.TYPEDB,
        host: process.env.DBHOST,
        port: parseInt(process.env.DBPORT, 10),
        name: process.env.DBNAME,
        username: process.env.DBUSER,
        password: process.env.DBPASS,
        sync: process.env.DBSYNC,
        logger: process.env.DBLOGGER
    },
    mcpayment_db: {
        type: process.env.MCPAYMENT_TYPEDB,
        host: process.env.MCPAYMENT_DBHOST,
        port: parseInt(process.env.MCPAYMENT_DBPORT, 10),
        name: process.env.MCPAYMENT_DBNAME,
        username: process.env.MCPAYMENT_DBUSER,
        password: process.env.MCPAYMENT_DBPASS,
        sync: process.env.MCPAYMENT_DBSYNC,
        logger: process.env.MCPAYMENT_DBLOGGER
    },
    mongodb_logs: {
        type: process.env.LOGGER_TYPEDB,
        host: process.env.LOGGER_DBHOST,
        port: parseInt(process.env.LOGGER_DBPORT, 10),
        name: process.env.LOGGER_DBNAME,
        username: process.env.LOGGER__DBUSER,
        password: process.env.LOGGER__DBPASS
    },
    mongodb: process.env.MONGODB,
    email: {
        host: process.env.HOSTEMAIL,
        port: parseInt(process.env.PORTEMAIL, 10),
        username: process.env.USEREMAIL,
        password: process.env.PASSEMAIL
    },
    nexmo: {
        apiKey: process.env.NEXMOKEY,
        apiSecret: process.env.NEXMOSECRET
    },
    //Mastercard
    mastercardGatewayURL:process.env.MASTERCARD_GATEWAY_URL,
    mastercardApiKey: process.env.MASTERCARD_API_PASSWORD,
    mastercardMerchantID: process.env.MASTERCARD_MERCHANT_ID,
    mastercardMerchantName: process.env.MASTERCARD_MERCHANT_NAME,
    mastercardReturnURL: process.env.MASTERCARD_RETURN_URL,
    mastercardMerchantURL: process.env.MASTERCARD_MERCHANT_URL,
    //PiPay
    pipayMID: process.env.PIPAY_MERCHANT_ID,
    pipaySID: process.env.PIPAY_STORE_ID,
    pipayDID: process.env.PIPAY_DEVICE_ID,
    pipayURL: process.env.PIPAY_URL,
    pipayConfirmURL: process.env.PIPAY_CONFIRM_URL,
    pipayCancelURL: process.env.PIPAY_CANCEL_URL,
    pipayHomePageURL: process.env.PIPAY_MERCHANT_HOME_PAGE,
    //DirePay
    direPayProxy: process.env.DIREPAY_PROXY,
    direPayPort: process.env.DIREPAY_PORT,
    direPayCallBack: process.env.DIREPAY_CALLBACK_URL,
    proxyipkey: process.env.WEBSHAREIO,
    discordkey: process.env.DISCORDKEY,
    whitelist_ip: process.env.WHITELIST_IP
})
