import { config } from "./config/config";
import createTopicsIfNotExists from "./create-topics";
import requestData from "./request-data";
import produceData from './producer';

async function bootstrap() {
  try {

    await createTopicsIfNotExists();
    
    setInterval(async () => {

      const newData = await requestData(config.data.url);
  
      if (!newData) {
        console.error('Problem With requesting data');
      }

      await produceData(newData);
    }, 10000);
    
  } catch (error) {
    console.log(error);
  }
}

bootstrap();