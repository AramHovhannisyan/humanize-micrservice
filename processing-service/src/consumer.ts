import { config } from "./config/config";
import kafka from './config/kafkaSetup';

const startConsumer = async () => {
  try {
    const consumerTopic = config.kafka.topic;
    const consumer = kafka.consumer({ groupId: config.kafka.groupId });
    await consumer.connect();
    await consumer.subscribe({ topic: consumerTopic });

    console.log('consumer is subscribed');

    return consumer;
  
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default startConsumer;
