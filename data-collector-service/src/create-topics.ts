import { config } from "./config/config";
import kafka from "./config/kafkaSetup";

async function createTopicsIfNotExists() {
  try {
    const topicName = config.kafka.topic;
    const admin = kafka.admin();
  
    await admin.connect();
    console.log('connected');

    const topics = await admin.listTopics();

    if (!topics.includes(topicName)) {
      const topicCreated = await admin.createTopics({
        topics: [{
          topic: topicName,
          numPartitions: 2,
        }],
      });

      if (topicCreated)  console.log(`${topicName}: topic created`);
      
    }

    console.log(`topic ${topicName} ready to work`);

    await admin.disconnect();
  } catch (error) {
    console.error(error);
  }
}

export default createTopicsIfNotExists;