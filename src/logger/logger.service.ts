import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as SlackHook from 'winston-slack-webhook-transport';
import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';
const { combine, timestamp, label, printf } = winston.format;
config();

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;
  private readonly logFormat = printf(
    ({ level, message, label, timestamp, functionName, id }) => {
      return `${timestamp} [${label}] [${functionName}] [${id}] ${level}: ${message}`;
    },
  );
  private readonly slackFormatter = (info: any) => {
    const { level, message, timestamp, label, functionName, id } = info;

    return {
      text: `[${level}] ${message}`,
      attachments: [
        {
          text: `Function: ${functionName}, ID: ${id}`,
        },
      ],
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `[${level}] ${message}`,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Function:*\n${functionName}`,
            },
            {
              type: 'mrkdwn',
              text: `*ID:*\n${id}`,
            },
            {
              type: 'mrkdwn',
              text: `*Label:*\n${label}`,
            },
            {
              type: 'mrkdwn',
              text: `*Timestamp:*\n${timestamp}`,
            },
          ],
        },
      ],
    };
  };

  constructor() {
    this.logger = winston.createLogger({
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        label({ label: 'Toy' }),
        this.logFormat,
      ),
      transports: [
        new winstonDaily({
          level: 'info',
          datePattern: 'YYYY-MM-DD',
          dirname: './logs',
          filename: `%DATE%.log`,
          maxFiles: 30,
          zippedArchive: true,
        }),
        new winstonDaily({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: './logs',
          filename: `%DATE%.error.log`,
          maxFiles: 30,
          zippedArchive: true,
        }),
        new SlackHook({
          level: 'error',
          webhookUrl: process.env.SLACK_WEB_HOOK_URL as string,
          formatter: this.slackFormatter,
        }),
      ],
    });
  }

  info(message: string, metadata?: any) {
    const {
      functionName,
      id,
    }: {
      functionName: string;
      id: number;
    } = metadata;
    this.logger.info(message, { functionName, id });
  }

  async error(message: string, metadata?: any) {
    console.time('toy');
    const {
      functionName,
      id,
    }: {
      functionName: string;
      id: number;
    } = metadata;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PW,
      },
    });

    transporter.sendMail({
      from: process.env.GMAIL_ID,
      to: process.env.GMAIL_ID,
      subject: `ERROR ON ${functionName} Function! 👻`,
      html: `<h2>ERROR ON ${functionName} Function! 👻</h2>`,
    });

    this.logger.error(message, { functionName, id });
    console.timeEnd('toy');
  }
}
