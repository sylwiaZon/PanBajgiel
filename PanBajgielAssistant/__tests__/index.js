const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "8",
    deviceName: "Android Emulator",
    app: "/Users/pyszczekk/Desktop/PanBajgiel/PanBajgielCustomer/__tests__/app.apk",
    automationName: "UiAutomator2",
    uiautomator2ServerLaunchTimeout: 20000,
    uiautomator2ServerInstallTimeout: 20000,
	adbExecTimeout: 20000,
	appWaitForLaunch: false
  }
};

async function main () {
  const client = await wdio.remote(opts);

await client.$$("~TransactionScreen");
await client.$$("~PricesScreen");
await client.$$("~SettingsScreen");
await client.$$("~MainStatistics");
await client.$$("~ShopStatistics");
await client.$$("~mak");
await client.$$("~sezam");
await client.$$("~sol");
await client.$$("~ser");
await client.$$("~posypka");
await client.$$("~wieloziarnisty");

  await client.deleteSession();
 
}

main();