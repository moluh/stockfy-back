import { exec } from "child_process";
import dayjs from "dayjs";
import cron from "node-cron";

cron.schedule("10 0 * * *", () => {
  console.log("Ejecutando backup");

  const user = process.env.SQL_USERNAME;
  const pass = process.env.SQL_PASSWORD;
  const db = process.env.SQL_DATABASE;
  const dir = process.env.BACKUPS_DIR;
  const date = dayjs().format("YYYY-MM-DD");
  const command = ` mysqldump -u ${user} -p${pass} ${db} > ${dir}/${date}.stockfy.dump.sql`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

});
