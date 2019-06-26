import { LogLevel } from './log-level.model';

export class LogEntryModel {
    level: LogLevel;
    timestamp: Date;
    source: string;
    message: string;
    exception: string;
}


