import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from "./logger/error.handling";
import { WinstonModule } from "nest-winston";
import {winstonConfig} from "./logger/winston-logger";
async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig)
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter())
    app.enableCors({
      origin: "*",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials:true 
    });
    const config = new DocumentBuilder()
      .setTitle("Logistika")
      // .setDescription("maqtash shart emas bilaman zo'r chiqan")
      .setVersion("Komronmirzo")
      .addBearerAuth(
        {
          type: "http",
          scheme: "Bearer",
          bearerFormat: "JWT",
          name: "JWT",
          description: "Enter JWT token",
          in: "header",
        },
        "parol"
      )
      .build()
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api/docs", app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });

    await app.listen(PORT, () => {
      console.log("\n\n + ====================================================================== +");
      console.log(`| |                                                                      | | `);
      console.log(`| | 🚀             Server started at: http://localhost:${PORT}           🚀 | | `);
      console.log(`| |                                                                      | | `);
      console.log(`| | 📚  Swagger API documentation at: http://localhost:${PORT}/api/docs  📚 | |`);
      console.log(`| |                                                                      | | `);
      console.log(" + ====================================================================== +");
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
}

start();
