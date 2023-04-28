import kafka from './config/kafkaSetup';

const buildProducer = async () => {
  try {
    const producer = kafka.producer();
    await producer.connect();
    console.log('producer is connected');

    return producer;
  
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default buildProducer;
