import kafka from "./config/kafkaSetup";
import { config } from "./config/config";
import saveMsg from './controllers/sqlController';

const topicName = config.kafka.topic;

const bootstrapConsumer = async () => {
  const consumer = kafka.consumer({ groupId: config.kafka.groupId });
  await consumer.connect();

  await consumer.subscribe({
    topic: topicName,
  });

  console.log('consumer is subscribed');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`\n\n\n New Msg on DATA MART SERVICE partition: ${partition} Received: ${message.value}`);

      if (message && message.value) {
        
        const isMsgSaved = await saveMsg(message);
        if (!isMsgSaved) {
          console.error("Can't save msg to DB, Exiting...");
          process.exit();
        }
        
      } else {
          console.log('Check this weird message', message);
      }
    },
  });

  console.log('Consumer Is Listening...');

  return '...';
    
};

export { bootstrapConsumer };