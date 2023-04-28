import seed from "./services/pgServise";

async function bootstrap() {
  try {

    await seed();
    
  } catch (error) {
    console.error(error);
  }
}

bootstrap();