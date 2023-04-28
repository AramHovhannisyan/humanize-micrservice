import { Kafka } from "kafkajs";
import { config } from "../config/config";

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: [config.kafka.server],
  // ssl: true
});

export default kafka;