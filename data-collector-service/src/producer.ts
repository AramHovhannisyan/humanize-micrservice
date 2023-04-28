import { config } from "./config/config";
import { dataToCollectType } from "./types";
import kafka from './config/kafkaSetup';

const topicName = config.kafka.topic;

const produceData = async (data: dataToCollectType) => {
  const producer = kafka.producer();
  
  await producer.connect();
  console.log('producer connected');

  const dataJson = JSON.stringify(data);

  const produced = await producer.send({
    topic: topicName,
    messages: [
      {
        value: dataJson,
      },
    ],
  });

  console.log(`Produced to ${produced[0].topicName}[${produced[0].partition}]`);

  return produced;
};

export default produceData;