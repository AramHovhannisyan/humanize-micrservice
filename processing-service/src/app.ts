import { config } from "./config/config";
import startConsumer from "./consumer";
import buildProducer from "./producer";
import { saveMsg, getCount } from "./sqlController";

const bootstrapQueue = async () => {
  const consumer = await startConsumer();
  const producer = await buildProducer();
  const producerTopic = config.kafka.topic_out;

  if (!consumer || !producer) {
    console.error("Can't Build Consumer Or Producer, Exiting...");
    process.exit();
  }

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`\n\n\n New Msg on PROCESSOR SERVICE partition: ${partition} Received: ${message}`);

      if (message && message.value) {
        console.log('message.value toString:', message.value.toString());
        
        const dataJson = JSON.parse(message.value.toString());
        if (!dataJson) {
          console.log(dataJson);
          
          console.error("Empty data received, Exiting...");
          process.exit();
        }

        const isMsgSaved = await saveMsg(dataJson);
        if (!isMsgSaved) {
          console.error("Can't save msg to DB, Exiting...");
          process.exit();
        }

        const todos = await getCount();
        if (!todos) {
          console.error("Can't get todo-s, Exiting...");
          process.exit();
        }

        const produced = await producer.send({
          topic: producerTopic,
          messages: [
            {
              value: JSON.stringify({
                count: todos,
              }),
            },
          ],
        });

        console.log(`Produced to ${produced[0].topicName}[${produced[0].partition}]`);

      }else {
        console.log('Check this weird message', message);
      }
    },
  });
};

bootstrapQueue();